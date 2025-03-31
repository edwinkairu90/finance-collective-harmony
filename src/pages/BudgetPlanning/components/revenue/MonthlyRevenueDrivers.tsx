
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Package } from "lucide-react";
import { MonthlyRevenueTable } from "./MonthlyRevenueTable";
import { ProductSelector } from "./ProductSelector";
import { MonthlyRevenueData, SegmentData, ProductRevenue } from "./types/revenueTypes";
import { transformLegacyData, createEmptyProduct } from "./utils/dataTransformer";
import { useToast } from "@/hooks/use-toast";

interface MonthlyRevenueDriversProps {
  initialData: any[]; // Using any for backwards compatibility
  onDataUpdate: (data: MonthlyRevenueData[]) => void;
}

export const MonthlyRevenueDrivers: React.FC<MonthlyRevenueDriversProps> = ({ 
  initialData, 
  onDataUpdate 
}) => {
  // Transform legacy data to new format if needed
  const transformedInitialData = Array.isArray(initialData[0]?.products) 
    ? initialData 
    : transformLegacyData(initialData);
  
  const [monthlyRevenueDrivers, setMonthlyRevenueDrivers] = useState<MonthlyRevenueData[]>(transformedInitialData);
  const [selectedProductId, setSelectedProductId] = useState<string>(
    transformedInitialData[0]?.products[0]?.id || "default-product"
  );
  const { toast } = useToast();

  // When internal state changes, notify parent component
  useEffect(() => {
    onDataUpdate(monthlyRevenueDrivers);
  }, [monthlyRevenueDrivers, onDataUpdate]);

  // When prop changes, update internal state (with transformation if needed)
  useEffect(() => {
    const transformedData = Array.isArray(initialData[0]?.products) 
      ? initialData 
      : transformLegacyData(initialData);
    setMonthlyRevenueDrivers(transformedData);
  }, [initialData]);

  const handleAddProduct = () => {
    const productId = `product-${Date.now()}`;
    const productName = `New Product ${monthlyRevenueDrivers[0].products.length + 1}`;
    
    // Create a new product and add it to all months
    setMonthlyRevenueDrivers(prevData => {
      return prevData.map(monthData => ({
        ...monthData,
        products: [
          ...monthData.products,
          createEmptyProduct(productId, productName)
        ]
      }));
    });
    
    // Select the new product
    setSelectedProductId(productId);
    
    toast({
      title: "Product added",
      description: `Added new product: ${productName}`,
    });
  };

  const handleRenameProduct = (productId: string, newName: string) => {
    setMonthlyRevenueDrivers(prevData => {
      return prevData.map(monthData => ({
        ...monthData,
        products: monthData.products.map(product => 
          product.id === productId ? { ...product, name: newName } : product
        )
      }));
    });
    
    toast({
      title: "Product renamed",
      description: `Updated product name to: ${newName}`,
    });
  };

  const handleDeleteProduct = (productId: string) => {
    // Get product name for toast message
    const productName = monthlyRevenueDrivers[0].products.find(p => p.id === productId)?.name || "";
    
    // Don't allow deleting the last product
    if (monthlyRevenueDrivers[0].products.length <= 1) {
      toast({
        title: "Cannot delete product",
        description: "You must have at least one product.",
        variant: "destructive"
      });
      return;
    }
    
    // Remove the product from all months
    setMonthlyRevenueDrivers(prevData => {
      const updatedData = prevData.map(monthData => ({
        ...monthData,
        products: monthData.products.filter(product => product.id !== productId)
      }));
      
      // Update selected product if the current one was deleted
      if (productId === selectedProductId) {
        setSelectedProductId(updatedData[0].products[0].id);
      }
      
      return updatedData;
    });
    
    toast({
      title: "Product deleted",
      description: `Removed product: ${productName}`,
    });
  };

  const handleUpdateData = (
    month: string,
    productId: string,
    segment: "enterprise" | "midMarket" | "smb",
    field: keyof SegmentData,
    value: number
  ) => {
    // Update the current month's data
    setMonthlyRevenueDrivers((prev) => {
      const updatedData = [...prev];
      
      // Find the current month's index
      const currentMonthIndex = updatedData.findIndex(item => item.month === month);
      if (currentMonthIndex === -1) return prev;
      
      // Create a copy of the current month data
      const currentMonthData = { ...updatedData[currentMonthIndex] };
      
      // Find the product index
      const productIndex = currentMonthData.products.findIndex(p => p.id === productId);
      if (productIndex === -1) return prev;
      
      // Update the specific field for the segment
      currentMonthData.products[productIndex] = {
        ...currentMonthData.products[productIndex],
        [segment]: {
          ...currentMonthData.products[productIndex][segment],
          [field]: value
        }
      };
      
      // If the field is newClients, we need to update the following month's existing clients
      if (field === "newClients" && currentMonthIndex < updatedData.length - 1) {
        // Calculate the total clients for current month
        const totalClientsCurrentMonth = 
          currentMonthData.products[productIndex][segment].clients + 
          currentMonthData.products[productIndex][segment].newClients;
        
        // Update the next month's existing clients
        const nextMonthData = { ...updatedData[currentMonthIndex + 1] };
        const nextMonthProductIndex = nextMonthData.products.findIndex(p => p.id === productId);
        
        if (nextMonthProductIndex !== -1) {
          nextMonthData.products[nextMonthProductIndex] = {
            ...nextMonthData.products[nextMonthProductIndex],
            [segment]: {
              ...nextMonthData.products[nextMonthProductIndex][segment],
              clients: totalClientsCurrentMonth
            }
          };
          
          // Update the next month in the data array
          updatedData[currentMonthIndex + 1] = nextMonthData;
        }
      }
      
      // Update the current month in the data array
      updatedData[currentMonthIndex] = currentMonthData;
      
      return updatedData;
    });

    toast({
      title: "Data updated",
      description: `Updated ${field} for ${segment} in ${month}`,
    });
  };

  // Get all product names and IDs for the selector
  const products = monthlyRevenueDrivers.length > 0 
    ? monthlyRevenueDrivers[0].products.map(p => ({ id: p.id, name: p.name }))
    : [];

  return (
    <Card className="border-slate-200 dark:border-slate-700">
      <CardHeader className="pb-2 bg-slate-50 dark:bg-slate-900/50 rounded-t-lg">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base text-slate-800 dark:text-slate-200">
            Monthly Revenue Breakdown
          </CardTitle>
          <Button 
            onClick={handleAddProduct} 
            size="sm" 
            variant="outline"
            className="text-xs"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            Add Product
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ProductSelector 
          products={products}
          selectedProductId={selectedProductId}
          onSelectProduct={setSelectedProductId}
          onRenameProduct={handleRenameProduct}
          onDeleteProduct={handleDeleteProduct}
        />
        
        <MonthlyRevenueTable 
          monthlyRevenueDrivers={monthlyRevenueDrivers} 
          selectedProductId={selectedProductId}
          onUpdateData={handleUpdateData}
        />
      </CardContent>
    </Card>
  );
};
