
import React, { useState, useRef, useEffect } from "react";
import { TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/format";

interface EditableCellProps {
  value: number;
  isEditing: boolean;
  onStartEdit: () => void;
  onSave: (newValue: number) => void;
  formatting?: "currency" | "number";
  className?: string;
}

export const EditableCell: React.FC<EditableCellProps> = ({
  value,
  isEditing,
  onStartEdit,
  onSave,
  formatting = "number",
  className = ""
}) => {
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleBlur = () => {
    onSave(editValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSave(editValue);
    } else if (e.key === "Escape") {
      setEditValue(value);
      onSave(value);
    }
  };

  return (
    <TableCell
      className={`text-center ${className} ${!isEditing ? "cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800" : ""}`}
      onClick={() => !isEditing && onStartEdit()}
    >
      {isEditing ? (
        <Input
          ref={inputRef}
          type="number"
          value={editValue}
          onChange={(e) => setEditValue(Number(e.target.value))}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="text-center h-8"
        />
      ) : (
        formatting === "currency" ? formatCurrency(value) : value
      )}
    </TableCell>
  );
};
