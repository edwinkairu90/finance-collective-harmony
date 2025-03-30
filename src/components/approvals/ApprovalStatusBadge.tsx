
import { Badge } from "@/components/ui/badge";

interface ApprovalStatusBadgeProps {
  status: "pending" | "approved" | "rejected";
}

export const ApprovalStatusBadge = ({ status }: ApprovalStatusBadgeProps) => {
  return (
    <Badge
      className={
        status === "approved"
          ? "bg-green-100 text-green-800 hover:bg-green-100 text-xs px-3 py-0.5"
          : status === "rejected"
          ? "bg-red-100 text-red-800 hover:bg-red-100 text-xs px-3 py-0.5"
          : "bg-amber-100 text-amber-800 hover:bg-amber-100 text-xs px-3 py-0.5"
      }
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};
