
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CashflowQuarterData } from "../data/cashflowData";
import { getAllCashflowItems, getItemValue, calculateGrowth, calculateCashflowTotals } from "../utils/cashflowCalculations";

interface CashflowTableProps {
  quarters: CashflowQuarterData[];
}

export const CashflowTable: React.FC<CashflowTableProps> = ({ quarters }) => {
  const { operatingItems, investingItems, financingItems } = getAllCashflowItems(quarters);
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[20%]">Line Item</TableHead>
          {quarters.map((quarter, idx) => (
            <TableHead key={idx} className="text-right">
              {quarter.title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      
      <TableBody>
        {/* Operating Activities */}
        <TableRow className="bg-muted/30">
          <TableCell colSpan={5} className="font-semibold">Cash Flow from Operating Activities</TableCell>
        </TableRow>
        
        {operatingItems.map((item, index) => (
          <TableRow key={`operating-${index}`}>
            <TableCell className="pl-8">{item}</TableCell>
            {quarters.map((quarter, qIdx) => {
              const value = getItemValue(quarter, item, 'operating');
              const prevValue = qIdx < quarters.length - 1 ? 
                getItemValue(quarters[qIdx + 1], item, 'operating') : null;
              const growth = calculateGrowth(value, prevValue);
              
              return (
                <TableCell key={`q-${qIdx}`} className="text-right">
                  <div>${value.toLocaleString()}</div>
                  {growth !== null && qIdx < quarters.length - 1 && (
                    <div className={`text-xs ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                    </div>
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
        
        {/* Total Operating Cash Flow */}
        <TableRow className="font-medium">
          <TableCell>Net Cash from Operating Activities</TableCell>
          {quarters.map((quarter, idx) => {
            const { totalOperating } = calculateCashflowTotals(quarter);
            const prevQuarter = idx < quarters.length - 1 ? quarters[idx + 1] : null;
            const prevTotal = prevQuarter ? calculateCashflowTotals(prevQuarter).totalOperating : null;
            const growth = calculateGrowth(totalOperating, prevTotal);
            
            return (
              <TableCell key={`total-op-${idx}`} className={`text-right ${totalOperating >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                <div>${totalOperating.toLocaleString()}</div>
                {growth !== null && idx < quarters.length - 1 && (
                  <div className={`text-xs ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                  </div>
                )}
              </TableCell>
            );
          })}
        </TableRow>
        
        {/* Investing Activities */}
        <TableRow className="bg-muted/30">
          <TableCell colSpan={5} className="font-semibold">Cash Flow from Investing Activities</TableCell>
        </TableRow>
        
        {investingItems.map((item, index) => (
          <TableRow key={`investing-${index}`}>
            <TableCell className="pl-8">{item}</TableCell>
            {quarters.map((quarter, qIdx) => {
              const value = getItemValue(quarter, item, 'investing');
              const prevValue = qIdx < quarters.length - 1 ? 
                getItemValue(quarters[qIdx + 1], item, 'investing') : null;
              const growth = calculateGrowth(value, prevValue);
              
              return (
                <TableCell key={`q-${qIdx}`} className="text-right">
                  <div>${value.toLocaleString()}</div>
                  {growth !== null && qIdx < quarters.length - 1 && item.includes("Purchase") && (
                    <div className={`text-xs ${growth <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                    </div>
                  )}
                  {growth !== null && qIdx < quarters.length - 1 && item.includes("Sale") && (
                    <div className={`text-xs ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                    </div>
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
        
        {/* Total Investing Cash Flow */}
        <TableRow className="font-medium">
          <TableCell>Net Cash from Investing Activities</TableCell>
          {quarters.map((quarter, idx) => {
            const { totalInvesting } = calculateCashflowTotals(quarter);
            const prevQuarter = idx < quarters.length - 1 ? quarters[idx + 1] : null;
            const prevTotal = prevQuarter ? calculateCashflowTotals(prevQuarter).totalInvesting : null;
            const growth = calculateGrowth(totalInvesting, prevTotal);
            
            return (
              <TableCell key={`total-inv-${idx}`} className={`text-right ${totalInvesting >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                <div>${totalInvesting.toLocaleString()}</div>
                {growth !== null && idx < quarters.length - 1 && totalInvesting < 0 && (
                  <div className={`text-xs ${growth <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                  </div>
                )}
                {growth !== null && idx < quarters.length - 1 && totalInvesting >= 0 && (
                  <div className={`text-xs ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                  </div>
                )}
              </TableCell>
            );
          })}
        </TableRow>
        
        {/* Financing Activities */}
        <TableRow className="bg-muted/30">
          <TableCell colSpan={5} className="font-semibold">Cash Flow from Financing Activities</TableCell>
        </TableRow>
        
        {financingItems.map((item, index) => (
          <TableRow key={`financing-${index}`}>
            <TableCell className="pl-8">{item}</TableCell>
            {quarters.map((quarter, qIdx) => {
              const value = getItemValue(quarter, item, 'financing');
              const prevValue = qIdx < quarters.length - 1 ? 
                getItemValue(quarters[qIdx + 1], item, 'financing') : null;
              const growth = calculateGrowth(value, prevValue);
              
              return (
                <TableCell key={`q-${qIdx}`} className="text-right">
                  <div>${value.toLocaleString()}</div>
                  {growth !== null && qIdx < quarters.length - 1 && (
                    <div className={`text-xs ${item.includes("Proceeds") ? (growth >= 0 ? 'text-green-600' : 'text-red-600') : (growth <= 0 ? 'text-green-600' : 'text-red-600')}`}>
                      {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                    </div>
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
        
        {/* Total Financing Cash Flow */}
        <TableRow className="font-medium">
          <TableCell>Net Cash from Financing Activities</TableCell>
          {quarters.map((quarter, idx) => {
            const { totalFinancing } = calculateCashflowTotals(quarter);
            const prevQuarter = idx < quarters.length - 1 ? quarters[idx + 1] : null;
            const prevTotal = prevQuarter ? calculateCashflowTotals(prevQuarter).totalFinancing : null;
            const growth = calculateGrowth(totalFinancing, prevTotal);
            
            return (
              <TableCell key={`total-fin-${idx}`} className={`text-right ${totalFinancing >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                <div>${totalFinancing.toLocaleString()}</div>
                {growth !== null && idx < quarters.length - 1 && (
                  <div className={`text-xs ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                  </div>
                )}
              </TableCell>
            );
          })}
        </TableRow>
        
        {/* Net Cash Flow */}
        <TableRow className="font-bold bg-muted/50">
          <TableCell>Net Increase/(Decrease) in Cash</TableCell>
          {quarters.map((quarter, idx) => {
            const { netCashflow } = calculateCashflowTotals(quarter);
            const prevQuarter = idx < quarters.length - 1 ? quarters[idx + 1] : null;
            const prevTotal = prevQuarter ? calculateCashflowTotals(prevQuarter).netCashflow : null;
            const growth = calculateGrowth(netCashflow, prevTotal);
            
            return (
              <TableCell key={`net-${idx}`} className={`text-right ${netCashflow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                <div>${netCashflow.toLocaleString()}</div>
                {growth !== null && idx < quarters.length - 1 && (
                  <div className={`text-xs ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                  </div>
                )}
              </TableCell>
            );
          })}
        </TableRow>
      </TableBody>
    </Table>
  );
};
