
import * as React from "react";

// Define the context props
export type SidebarContextProps = {
  state: "expanded" | "collapsed";
  isMobile: boolean;
  openMobile: boolean;
  toggleSidebar: () => void;
  expandSidebar: () => void;
  collapseSidebar: () => void;
  setOpenMobile: (open: boolean) => void;
};

// Define the provider props
export type SidebarProviderProps = {
  children: React.ReactNode;
  defaultState?: "expanded" | "collapsed";
  persistKey?: string;
  width?: string;
  iconWidth?: string;
  mobileWidth?: string;
};

// Create context
export const SidebarContext = React.createContext<SidebarContextProps>({
  state: "expanded",
  isMobile: false,
  openMobile: false,
  toggleSidebar: () => {},
  expandSidebar: () => {},
  collapseSidebar: () => {},
  setOpenMobile: () => {},
});

// Hook to use the sidebar context
export const useSidebar = () => React.useContext(SidebarContext);

// Sidebar Provider Component
export const SidebarProvider = ({
  children,
  defaultState = "expanded",
  persistKey = "sidebar-state",
  width = "18rem",
  iconWidth = "5.5rem",
  mobileWidth = "80%",
}: SidebarProviderProps) => {
  const [state, setState] = React.useState<"expanded" | "collapsed">(
    defaultState
  );
  const [openMobile, setOpenMobile] = React.useState(false);

  // Persist state to local storage
  React.useEffect(() => {
    if (persistKey) {
      const storedState = localStorage.getItem(persistKey) as
        | "expanded"
        | "collapsed"
        | undefined;
      if (storedState) {
        setState(storedState);
      }
    }
  }, [persistKey]);

  React.useEffect(() => {
    if (persistKey) {
      localStorage.setItem(persistKey, state);
    }
  }, [state, persistKey]);

  // Check if is mobile
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Toggle sidebar function
  const toggleSidebar = () => {
    setState((prevState) => (prevState === "expanded" ? "collapsed" : "expanded"));
  };

  // Expand sidebar function
  const expandSidebar = () => {
    setState("expanded");
  };

  // Collapse sidebar function
  const collapseSidebar = () => {
    setState("collapsed");
  };

  return (
    <SidebarContext.Provider
      value={{
        state,
        isMobile,
        openMobile,
        toggleSidebar,
        expandSidebar,
        collapseSidebar,
        setOpenMobile,
      }}
    >
      <style>
        {`
          :root {
            --sidebar-width: ${width};
            --sidebar-width-icon: ${iconWidth};
          }

          @media (max-width: 768px) {
            :root {
              --sidebar-width: ${mobileWidth};
            }
          }
        `}
      </style>
      {children}
    </SidebarContext.Provider>
  );
};

SidebarProvider.displayName = "SidebarProvider";

