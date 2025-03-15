
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BalanceSheetQuarterData } from "../data/balanceSheetData";
import { 
  getAllBalanceSheetItems, 
  getItemValue, 
  calculateGrowth, 
  calculateBalanceSheetTotals 
} from "../utils/balanceSheetCalculations";

interface BalanceSheetTableProps {
  quarters: BalanceSheetQuarterData[];
}

export const BalanceSheetTable: React.FC<BalanceSheetTableProps> = ({ quarters }) => {
  const { 
    currentAssets, 
    nonCurrentAssets, 
    currentLiabilities, 
    nonCurrentLiabilities, 
    equityItems 
  } = getAllBalanceSheetItems(quarters);
  
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
        {/* Assets Section */}
        <TableRow className="bg-muted/30">
          <TableCell colSpan={5} className="font-semibold">Assets</TableCell>
        </TableRow>
        
        <TableRow>
          <TableCell className="pl-4 font-medium">Current Assets</TableCell>
          {quarters.map((quarter, idx) => (
            <TableCell key={idx}></TableCell>
          ))}
        </TableRow>
        
        {currentAssets.map((item, index) => (
          <TableRow key={`current-asset-${index}`}>
            <TableCell className="pl-8">{item}</TableCell>
            {quarters.map((quarter, qIdx) => {
              const value = getItemValue(quarter, item, 'assets.current');
              const prevValue = qIdx < quarters.length - 1 ? 
                getItemValue(quarters[qIdx + 1], item, 'assets.current') : null;
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
        
        <TableRow className="font-medium">
          <TableCell className="pl-4">Total Current Assets</TableCell>
          {quarters.map((quarter, idx) => {
            const { totalCurrentAssets } = calculateBalanceSheetTotals(quarter);
            const prevQuarter = idx < quarters.length - 1 ? quarters[idx + 1] : null;
            const prevTotal = prevQuarter ? calculateBalanceSheetTotals(prevQuarter).totalCurrentAssets : null;
            const growth = calculateGrowth(totalCurrentAssets, prevTotal);
            
            return (
              <TableCell key={`total-ca-${idx}`} className="text-right">
                <div>${totalCurrentAssets.toLocaleString()}</div>
                {growth !== null && idx < quarters.length - 1 && (
                  <div className={`text-xs ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                  </div>
                )}
              </TableCell>
            );
          })}
        </TableRow>
        
        <TableRow>
          <TableCell className="pl-4 font-medium">Non-Current Assets</TableCell>
          {quarters.map((quarter, idx) => (
            <TableCell key={idx}></TableCell>
          ))}
        </TableRow>
        
        {nonCurrentAssets.map((item, index) => (
          <TableRow key={`non-current-asset-${index}`}>
            <TableCell className="pl-8">{item}</TableCell>
            {quarters.map((quarter, qIdx) => {
              const value = getItemValue(quarter, item, 'assets.nonCurrent');
              const prevValue = qIdx < quarters.length - 1 ? 
                getItemValue(quarters[qIdx + 1], item, 'assets.nonCurrent') : null;
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
        
        <TableRow className="font-medium">
          <TableCell className="pl-4">Total Non-Current Assets</TableCell>
          {quarters.map((quarter, idx) => {
            const { totalNonCurrentAssets } = calculateBalanceSheetTotals(quarter);
            const prevQuarter = idx < quarters.length - 1 ? quarters[idx + 1] : null;
            const prevTotal = prevQuarter ? calculateBalanceSheetTotals(prevQuarter).totalNonCurrentAssets : null;
            const growth = calculateGrowth(totalNonCurrentAssets, prevTotal);
            
            return (
              <TableCell key={`total-nca-${idx}`} className="text-right">
                <div>${totalNonCurrentAssets.toLocaleString()}</div>
                {growth !== null && idx < quarters.length - 1 && (
                  <div className={`text-xs ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                  </div>
                )}
              </TableCell>
            );
          })}
        </TableRow>
        
        <TableRow className="font-bold bg-muted/50">
          <TableCell>Total Assets</TableCell>
          {quarters.map((quarter, idx) => {
            const { totalAssets } = calculateBalanceSheetTotals(quarter);
            const prevQuarter = idx < quarters.length - 1 ? quarters[idx + 1] : null;
            const prevTotal = prevQuarter ? calculateBalanceSheetTotals(prevQuarter).totalAssets : null;
            const growth = calculateGrowth(totalAssets, prevTotal);
            
            return (
              <TableCell key={`total-assets-${idx}`} className="text-right">
                <div>${totalAssets.toLocaleString()}</div>
                {growth !== null && idx < quarters.length - 1 && (
                  <div className={`text-xs ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                  </div>
                )}
              </TableCell>
            );
          })}
        </TableRow>
        
        {/* Liabilities Section */}
        <TableRow className="bg-muted/30">
          <TableCell colSpan={5} className="font-semibold">Liabilities</TableCell>
        </TableRow>
        
        <TableRow>
          <TableCell className="pl-4 font-medium">Current Liabilities</TableCell>
          {quarters.map((quarter, idx) => (
            <TableCell key={idx}></TableCell>
          ))}
        </TableRow>
        
        {currentLiabilities.map((item, index) => (
          <TableRow key={`current-liability-${index}`}>
            <TableCell className="pl-8">{item}</TableCell>
            {quarters.map((quarter, qIdx) => {
              const value = getItemValue(quarter, item, 'liabilities.current');
              const prevValue = qIdx < quarters.length - 1 ? 
                getItemValue(quarters[qIdx + 1], item, 'liabilities.current') : null;
              const growth = calculateGrowth(value, prevValue);
              
              return (
                <TableCell key={`q-${qIdx}`} className="text-right">
                  <div>${value.toLocaleString()}</div>
                  {growth !== null && qIdx < quarters.length - 1 && (
                    <div className={`text-xs ${growth <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                    </div>
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
        
        <TableRow className="font-medium">
          <TableCell className="pl-4">Total Current Liabilities</TableCell>
          {quarters.map((quarter, idx) => {
            const { totalCurrentLiabilities } = calculateBalanceSheetTotals(quarter);
            const prevQuarter = idx < quarters.length - 1 ? quarters[idx + 1] : null;
            const prevTotal = prevQuarter ? calculateBalanceSheetTotals(prevQuarter).totalCurrentLiabilities : null;
            const growth = calculateGrowth(totalCurrentLiabilities, prevTotal);
            
            return (
              <TableCell key={`total-cl-${idx}`} className="text-right">
                <div>${totalCurrentLiabilities.toLocaleString()}</div>
                {growth !== null && idx < quarters.length - 1 && (
                  <div className={`text-xs ${growth <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                  </div>
                )}
              </TableCell>
            );
          })}
        </TableRow>
        
        <TableRow>
          <TableCell className="pl-4 font-medium">Non-Current Liabilities</TableCell>
          {quarters.map((quarter, idx) => (
            <TableCell key={idx}></TableCell>
          ))}
        </TableRow>
        
        {nonCurrentLiabilities.map((item, index) => (
          <TableRow key={`non-current-liability-${index}`}>
            <TableCell className="pl-8">{item}</TableCell>
            {quarters.map((quarter, qIdx) => {
              const value = getItemValue(quarter, item, 'liabilities.nonCurrent');
              const prevValue = qIdx < quarters.length - 1 ? 
                getItemValue(quarters[qIdx + 1], item, 'liabilities.nonCurrent') : null;
              const growth = calculateGrowth(value, prevValue);
              
              return (
                <TableCell key={`q-${qIdx}`} className="text-right">
                  <div>${value.toLocaleString()}</div>
                  {growth !== null && qIdx < quarters.length - 1 && (
                    <div className={`text-xs ${growth <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                    </div>
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
        
        <TableRow className="font-medium">
          <TableCell className="pl-4">Total Non-Current Liabilities</TableCell>
          {quarters.map((quarter, idx) => {
            const { totalNonCurrentLiabilities } = calculateBalanceSheetTotals(quarter);
            const prevQuarter = idx < quarters.length - 1 ? quarters[idx + 1] : null;
            const prevTotal = prevQuarter ? calculateBalanceSheetTotals(prevQuarter).totalNonCurrentLiabilities : null;
            const growth = calculateGrowth(totalNonCurrentLiabilities, prevTotal);
            
            return (
              <TableCell key={`total-ncl-${idx}`} className="text-right">
                <div>${totalNonCurrentLiabilities.toLocaleString()}</div>
                {growth !== null && idx < quarters.length - 1 && (
                  <div className={`text-xs ${growth <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                  </div>
                )}
              </TableCell>
            );
          })}
        </TableRow>
        
        <TableRow className="font-medium">
          <TableCell>Total Liabilities</TableCell>
          {quarters.map((quarter, idx) => {
            const { totalLiabilities } = calculateBalanceSheetTotals(quarter);
            const prevQuarter = idx < quarters.length - 1 ? quarters[idx + 1] : null;
            const prevTotal = prevQuarter ? calculateBalanceSheetTotals(prevQuarter).totalLiabilities : null;
            const growth = calculateGrowth(totalLiabilities, prevTotal);
            
            return (
              <TableCell key={`total-liab-${idx}`} className="text-right">
                <div>${totalLiabilities.toLocaleString()}</div>
                {growth !== null && idx < quarters.length - 1 && (
                  <div className={`text-xs ${growth <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                  </div>
                )}
              </TableCell>
            );
          })}
        </TableRow>
        
        {/* Equity Section */}
        <TableRow className="bg-muted/30">
          <TableCell colSpan={5} className="font-semibold">Equity</TableCell>
        </TableRow>
        
        {equityItems.map((item, index) => (
          <TableRow key={`equity-${index}`}>
            <TableCell className="pl-8">{item}</TableCell>
            {quarters.map((quarter, qIdx) => {
              const value = getItemValue(quarter, item, 'equity');
              const prevValue = qIdx < quarters.length - 1 ? 
                getItemValue(quarters[qIdx + 1], item, 'equity') : null;
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
        
        <TableRow className="font-medium">
          <TableCell>Total Equity</TableCell>
          {quarters.map((quarter, idx) => {
            const { totalEquity } = calculateBalanceSheetTotals(quarter);
            const prevQuarter = idx < quarters.length - 1 ? quarters[idx + 1] : null;
            const prevTotal = prevQuarter ? calculateBalanceSheetTotals(prevQuarter).totalEquity : null;
            const growth = calculateGrowth(totalEquity, prevTotal);
            
            return (
              <TableCell key={`total-eq-${idx}`} className="text-right">
                <div>${totalEquity.toLocaleString()}</div>
                {growth !== null && idx < quarters.length - 1 && (
                  <div className={`text-xs ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                  </div>
                )}
              </TableCell>
            );
          })}
        </TableRow>
        
        {/* Total Liabilities and Equity */}
        <TableRow className="font-bold bg-muted/50">
          <TableCell>Total Liabilities and Equity</TableCell>
          {quarters.map((quarter, idx) => {
            const { totalLiabilitiesAndEquity } = calculateBalanceSheetTotals(quarter);
            const prevQuarter = idx < quarters.length - 1 ? quarters[idx + 1] : null;
            const prevTotal = prevQuarter ? calculateBalanceSheetTotals(prevQuarter).totalLiabilitiesAndEquity : null;
            const growth = calculateGrowth(totalLiabilitiesAndEquity, prevTotal);
            
            return (
              <TableCell key={`total-le-${idx}`} className="text-right">
                <div>${totalLiabilitiesAndEquity.toLocaleString()}</div>
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
