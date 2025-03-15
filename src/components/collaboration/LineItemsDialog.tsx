import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Pencil, Save, X, Trash, Send, MessageSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { LineItem, BudgetRequestData } from "../../types/collaboration";
import { CommentThread } from "../comments/CommentThread";

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

interface LineItemsDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedDepartment: BudgetRequestData | null;
  setSelectedDepartment: (department: BudgetRequestData | null) => void;
  budgetRequests: BudgetRequestData[];
}

export const LineItemsDialog: React.FC<LineItemsDialogProps> = ({
  isOpen,
  setIsOpen,
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
  const [comment, setComment] = useState("");
  const [showCommentThread, setShowCommentThread] = useState(false);

  // Current user data - would come from authentication in a real app
  const currentUser = {
    name: "Casey Kim",
    avatar: "",
    department: "Finance"
  };

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

  const handleAddComment = () => {
    if (comment.trim()) {
      toast({
        title: "Comment Added",
        description: "Your comment has been added to the budget request.",
      });
      setComment("");
    }
  };

  const toggleCommentThread = () => {
    setShowCommentThread(prev => !prev);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{selectedDepartment?.department} Budget Line Items</DialogTitle>
          <DialogDescription>
            Detailed breakdown of the ${selectedDepartment?.totalAmount.toLocaleString()} budget request for {selectedDepartment?.period}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Assigned to</p>
                <div className="flex items-center gap-2 mt-1">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{selectedDepartment?.assignedTo.avatar}</AvatarFallback>
                  </Avatar>
                  <span>{selectedDepartment?.assignedTo.name}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge className={
                  selectedDepartment?.status === "completed" 
                    ? "bg-green-500 mt-1" 
                    : selectedDepartment?.status === "in-progress" 
                      ? "bg-amber-500 mt-1" 
                      : "mt-1"
                }>
                  {selectedDepartment?.status === "completed" 
                    ? "Completed" 
                    : selectedDepartment?.status === "in-progress" 
                      ? "In Progress" 
                      : "Not Started"}
                </Badge>
              </div>
            </div>

            <Separator />

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
            </div>

            <div className="bg-muted p-4 rounded-md">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Budget Amount</span>
                <span className="font-bold">${selectedDepartment?.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Comments</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={toggleCommentThread}
                  className="flex items-center gap-1"
                >
                  <MessageSquare className="h-4 w-4" />
                  {showCommentThread ? "Hide All Comments" : "Show All Comments"}
                </Button>
              </div>
              
              {showCommentThread ? (
                <CommentThread 
                  entityId={selectedDepartment?.id || ""}
                  entityType="budget-request"
                  entityTitle={`${selectedDepartment?.department} Budget Request`}
                  className="border rounded-md"
                />
              ) : (
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{currentUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <Textarea 
                      placeholder="Add a comment about this budget request..." 
                      className="min-h-[100px] flex-1"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleAddComment}
                      disabled={!comment.trim()}
                      className="flex items-center gap-1"
                    >
                      <Send className="h-4 w-4" />
                      Submit Comment
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="flex justify-between sm:justify-between space-x-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
          <Button variant="default">Request Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
