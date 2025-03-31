
import React, { useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, Pencil, Trash } from "lucide-react";

interface Product {
  id: string;
  name: string;
}

interface ProductSelectorProps {
  products: Product[];
  selectedProductId: string;
  onSelectProduct: (productId: string) => void;
  onRenameProduct: (productId: string, newName: string) => void;
  onDeleteProduct: (productId: string) => void;
}

export const ProductSelector: React.FC<ProductSelectorProps> = ({
  products,
  selectedProductId,
  onSelectProduct,
  onRenameProduct,
  onDeleteProduct
}) => {
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [selectedProductForAction, setSelectedProductForAction] = useState<string>("");
  
  const selectedProduct = products.find(p => p.id === selectedProductId);
  
  const handleOpenRenameDialog = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setNewProductName(product.name);
      setSelectedProductForAction(productId);
      setIsRenameDialogOpen(true);
    }
  };
  
  const handleRename = () => {
    if (newProductName.trim() && selectedProductForAction) {
      onRenameProduct(selectedProductForAction, newProductName.trim());
      setIsRenameDialogOpen(false);
    }
  };
  
  const handleDelete = (productId: string) => {
    onDeleteProduct(productId);
  };

  return (
    <div className="mb-4 space-y-2">
      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <Select value={selectedProductId} onValueChange={onSelectProduct}>
            <SelectTrigger className="bg-white dark:bg-slate-900">
              <SelectValue>
                <div className="flex items-center">
                  <Package className="h-4 w-4 mr-2 text-slate-600 dark:text-slate-400" />
                  {selectedProduct?.name || "Select a product"}
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {products.map(product => (
                <SelectItem 
                  key={product.id} 
                  value={product.id}
                  className="flex items-center"
                >
                  <div className="flex items-center">
                    <Package className="h-4 w-4 mr-2 text-slate-600 dark:text-slate-400" />
                    {product.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {selectedProduct && (
          <div className="flex space-x-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => handleOpenRenameDialog(selectedProductId)}
            >
              <Pencil className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => handleDelete(selectedProductId)}
              disabled={products.length <= 1}
            >
              <Trash className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            </Button>
          </div>
        )}
      </div>
      
      {/* Rename Dialog */}
      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rename Product</DialogTitle>
            <DialogDescription>
              Enter a new name for this product.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
              placeholder="Product name"
              className="w-full"
            />
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsRenameDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleRename}
              disabled={!newProductName.trim()}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
