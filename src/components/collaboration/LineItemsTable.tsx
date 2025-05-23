
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Save, X, Trash } from "lucide-react";
import { LineItem, BudgetRequestData } from "../../types/collaboration";
import { useToast } from "@/components/ui/use-toast";

// Category options for dropdown
const categories = [
  "Training", 
  "Events", 
  "Software", 
  "Marketing", 
  "Compensation", 
  "Infrastructure", 
  "Testing", 
  "Security", 
  "Documentation", 
  "Professional Services", 
  "Administration", 
  "Advertising", 
  "Creative", 
  "Branding"
];

interface LineItemsTableProps {
  selectedDepartment: BudgetRequestData | null;
  setSelectedDepartment: (department: BudgetRequestData | null) => void;
  budgetRequests: BudgetRequestData[];
}

export const LineItemsTable: React.FC<LineItemsTableProps> = ({
  selectedDepartment,
  setSelectedDepartment,
  budgetRequests,
}) => {
  const { toast } = useToast();
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [isAddingNewItem, setIsAddingNewItem] = useState(false);
  const [editedLineItems, setEditedLineItems] = useState<LineItem[]>(selectedDepartment?.lineItems || []);
  const [newItem, setNewItem] = useState<Omit<LineItem, 'id'>>({
    description: '',
    amount: 0,
    category: categories[0],
  });

  // Update editedLineItems when selectedDepartment changes
  React.useEffect(() => {
    if (selectedDepartment) {
      setEditedLineItems(selectedDepartment.lineItems);
    }
  }, [selectedDepartment]);

  const startEditingItem = (itemId: string) => {
    setEditingItemId(itemId);
  };

  const cancelEditing = () => {
    setEditingItemId(null);
    if (selectedDepartment) {
      setEditedLineItems(selectedDepartment.lineItems);
    }
  };

  const startAddingItem = () => {
    setIsAddingNewItem(true);
    setNewItem({
      description: '',
      amount: 0,
      category: categories[0],
    });
  };

  const cancelAddingItem = () => {
    setIsAddingNewItem(false);
  };

  const handleItemChange = (id: string, field: keyof LineItem, value: string | number) => {
    setEditedLineItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleNewItemChange = (field: keyof Omit<LineItem, 'id'>, value: string | number) => {
    setNewItem(prev => ({ ...prev, [field]: value }));
  };

  const saveEditedItem = () => {
    if (selectedDepartment && editingItemId) {
      // Update the budget request with edited line items
      const updatedRequests = budgetRequests.map(req => 
        req.id === selectedDepartment.id 
          ? { 
              ...req, 
              lineItems: editedLineItems,
              totalAmount: editedLineItems.reduce((sum, item) => sum + item.amount, 0)
            } 
          : req
      );
      
      // Find the updated department to update the selectedDepartment state
      const updatedDepartment = updatedRequests.find(req => req.id === selectedDepartment.id);
      if (updatedDepartment) {
        setSelectedDepartment(updatedDepartment);
      }
      
      setEditingItemId(null);
      toast({
        title: "Item Updated",
        description: "The line item has been updated successfully.",
      });
    }
  };

  const saveNewItem = () => {
    if (selectedDepartment) {
      const newId = `new-${Date.now()}`;
      const newLineItem: LineItem = {
        id: newId,
        ...newItem
      };
      
      const updatedLineItems = [...editedLineItems, newLineItem];
      
      // Update the budget request with the new line item
      const updatedRequests = budgetRequests.map(req => 
        req.id === selectedDepartment.id 
          ? { 
              ...req, 
              lineItems: updatedLineItems,
              totalAmount: updatedLineItems.reduce((sum, item) => sum + item.amount, 0)
            } 
          : req
      );
      
      // Find the updated department to update the selectedDepartment state
      const updatedDepartment = updatedRequests.find(req => req.id === selectedDepartment.id);
      if (updatedDepartment) {
        setSelectedDepartment(updatedDepartment);
        setEditedLineItems(updatedDepartment.lineItems);
      }
      
      setIsAddingNewItem(false);
      setNewItem({
        description: '',
        amount: 0,
        category: categories[0],
      });
      
      toast({
        title: "Item Added",
        description: "A new line item has been added to the budget request.",
      });
    }
  };

  const deleteLineItem = (itemId: string) => {
    if (selectedDepartment) {
      const updatedLineItems = editedLineItems.filter(item => item.id !== itemId);
      
      // Update the budget request with the filtered line items
      const updatedRequests = budgetRequests.map(req => 
        req.id === selectedDepartment.id 
          ? { 
              ...req, 
              lineItems: updatedLineItems,
              totalAmount: updatedLineItems.reduce((sum, item) => sum + item.amount, 0)
            } 
          : req
      );
      
      // Find the updated department to update the selectedDepartment state
      const updatedDepartment = updatedRequests.find(req => req.id === selectedDepartment.id);
      if (updatedDepartment) {
        setSelectedDepartment(updatedDepartment);
        setEditedLineItems(updatedLineItems);
      }
      
      toast({
        title: "Item Deleted",
        description: "The line item has been removed from the budget request.",
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-lg">Line Items</h3>
        <Button 
          onClick={startAddingItem} 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" /> Add Item
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {editedLineItems.map((item) => (
            <TableRow key={item.id}>
              {editingItemId === item.id ? (
                <>
                  <TableCell>
                    <Input 
                      value={item.description} 
                      onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <select 
                      className="w-full p-2 border rounded-md"
                      value={item.category}
                      onChange={(e) => handleItemChange(item.id, 'category', e.target.value)}
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </TableCell>
                  <TableCell className="text-right">
                    <Input 
                      type="number"
                      value={item.amount} 
                      onChange={(e) => handleItemChange(item.id, 'amount', Number(e.target.value))}
                      className="text-right"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={saveEditedItem}
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={cancelEditing}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="text-right">${item.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => startEditingItem(item.id)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => deleteLineItem(item.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
          
          {isAddingNewItem && (
            <TableRow>
              <TableCell>
                <Input 
                  value={newItem.description} 
                  onChange={(e) => handleNewItemChange('description', e.target.value)}
                  placeholder="Enter description"
                />
              </TableCell>
              <TableCell>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={newItem.category}
                  onChange={(e) => handleNewItemChange('category', e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </TableCell>
              <TableCell className="text-right">
                <Input 
                  type="number"
                  value={newItem.amount} 
                  onChange={(e) => handleNewItemChange('amount', Number(e.target.value))}
                  className="text-right"
                  placeholder="0"
                />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={saveNewItem}
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={cancelAddingItem}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="bg-muted p-4 rounded-md mt-4">
        <div className="flex justify-between items-center">
          <span className="font-medium">Total Budget Amount</span>
          <span className="font-bold">${selectedDepartment?.totalAmount.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};
