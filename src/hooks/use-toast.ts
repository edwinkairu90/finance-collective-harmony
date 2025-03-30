import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 1000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: string
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: string
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case actionTypes.REMOVE_TOAST:
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: actionTypes.REMOVE_TOAST,
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer_init_state = {
  toasts: [],
}

export const ToastContext = React.createContext<{
  state: State
  dispatch: React.Dispatch<Action>
}>({
  state: reducer_init_state,
  dispatch: () => reducer_init_state,
})

export default function reducer_init() {
  return reducer_init_state
}

export const useToast = () => {
  const { state, dispatch } = React.useContext(ToastContext)

  return {
    ...state,
    toast: (props: Omit<ToasterToast, "id">) => {
      const id = genId()

      const update = (props: ToasterToast) =>
        dispatch({
          type: actionTypes.UPDATE_TOAST,
          toast: { ...props, id },
        })
      const dismiss = () =>
        dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id })

      dispatch({
        type: actionTypes.ADD_TOAST,
        toast: {
          ...props,
          id,
          open: true,
          onOpenChange: (open) => {
            if (!open) dismiss()
          },
        },
      })

      return {
        id: id,
        dismiss,
        update,
      }
    },
    dismiss: (toastId?: string) =>
      dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
    update: (id: string, props: Partial<ToasterToast>) =>
      dispatch({ type: actionTypes.UPDATE_TOAST, toast: { ...props, id } }),
  }
}

export const toast = {
  custom: (props: Omit<ToasterToast, "id">) => {
    const id = genId()
    const toasters = document.querySelectorAll("[role=region][aria-label*=Notifications]")
    const container = toasters[0]

    if (!container) {
      console.error("Toast container not found. Make sure to render the Toaster component.")
      return { id, dismiss: () => {}, update: () => {} }
    }

    const customEvent = new CustomEvent("toast", {
      detail: {
        ...props,
        id,
        open: true,
        onOpenChange: (open: boolean) => {
          if (!open) {
            const dismissEvent = new CustomEvent("toast-dismiss", { detail: { id } })
            document.dispatchEvent(dismissEvent)
          }
        }
      }
    })

    document.dispatchEvent(customEvent)

    return {
      id,
      dismiss: () => {
        const dismissEvent = new CustomEvent("toast-dismiss", { detail: { id } })
        document.dispatchEvent(dismissEvent)
      },
      update: (props: Partial<ToasterToast>) => {
        const updateEvent = new CustomEvent("toast-update", { detail: { ...props, id } })
        document.dispatchEvent(updateEvent)
      }
    }
  },
  success: (props: Omit<ToasterToast, "id" | "variant">) => {
    return toast.custom({ ...props, variant: "success" })
  },
  error: (props: Omit<ToasterToast, "id" | "variant">) => {
    return toast.custom({ ...props, variant: "destructive" })
  },
  warning: (props: Omit<ToasterToast, "id" | "variant">) => {
    return toast.custom({ ...props, variant: "warning" })
  },
  info: (props: Omit<ToasterToast, "id" | "variant">) => {
    return toast.custom({ ...props, variant: "default" })
  }
}
