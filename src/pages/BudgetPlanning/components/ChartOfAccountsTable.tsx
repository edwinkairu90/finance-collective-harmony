
import React, { useState } from "react";
import { CostCenter, Department } from "@/types/budget";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash, Plus, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// GL Account structure resembling the screenshot
interface GLAccount {
  code: string;
  name: string;
  type: 'header' | 'account' | 'subcategory';
  parent?: string;
  actuals: number;
  forecast: number;
}

const defaultGLAccounts: GLAccount[] = [
  { code: 'Total', name: 'Total', type: 'header', actuals: 557511, forecast: 561969 },
  { code: 'S&B', name: 'Salaries & Benefits', type: 'subcategory', actuals: 436607, forecast: 445813 },
  { code: '60000', name: 'Salaries', type: 'account', parent: 'S&B', actuals: 261964, forecast: 268479 },
  { code: '60500', name: 'Bonus', type: 'account', parent: 'S&B', actuals: 61853, forecast: 65150 },
  { code: '60700', name: 'Payroll Taxes', type: 'account', parent: 'S&B', actuals: 25469, forecast: 25204 },
  { code: '60900', name: '401K Match', type: 'account', parent: 'S&B', actuals: 14554, forecast: 15917 },
  { code: '60990', name: 'Group Medical Insurance', type: 'account', parent: 'S&B', actuals: 72768, forecast: 71063 },
  { code: 'T&E', name: 'Travel & Entertainment', type: 'subcategory', actuals: 38439, forecast: 41499 },
  { code: '70000', name: 'Air Travel', type: 'account', parent: 'T&E', actuals: 12500, forecast: 13800 },
  { code: '70100', name: 'Hotels', type: 'account', parent: 'T&E', actuals: 15600, forecast: 16400 },
  { code: '70200', name: 'Meals & Entertainment', type: 'account', parent: 'T&E', actuals: 10339, forecast: 11299 },
  { code: 'IT', name: 'IT & Software', type: 'subcategory', actuals: 45800, forecast: 47200 },
  { code: '80000', name: 'Software Subscriptions', type: 'account', parent: 'IT', actuals: 28700, forecast: 29500 },
  { code: '80100', name: 'Hardware', type: 'account', parent: 'IT', actuals: 17100, forecast: 17700 },
  { code: 'Mktg', name: 'Marketing', type: 'subcategory', actuals: 36665, forecast: 27457 },
  { code: '90000', name: 'Advertising', type: 'account', parent: 'Mktg', actuals: 22500, forecast: 16000 },
  { code: '90100', name: 'Events', type: 'account', parent: 'Mktg', actuals: 14165, forecast: 11457 },
];

interface ChartOfAccountsTableProps {
  costCenters: CostCenter[];
  onStartEditing: (costCenterId: string) => void;
  onDelete: (costCenterId: string) => void;
  departments?: Department[];
  onChangeDepartment?: (costCenterId: string, newDepartmentId: string) => void;
  onChangeCategory?: (costCenterId: string, newCategory: string) => void;
  onUpdateCostCenterField?: (costCenterId: string, field: keyof CostCenter, value: string | number) => void;
}

export const ChartOfAccountsTable = ({
  costCenters,
  onStartEditing,
  onDelete,
  departments = [],
  onChangeDepartment,
  onChangeCategory,
  onUpdateCostCenterField,
}: ChartOfAccountsTableProps) => {
  const [glAccounts, setGlAccounts] = useState<GLAccount[]>(defaultGLAccounts);
  const [editableFields, setEditableFields] = useState<Record<string, boolean>>({});
  const [explanationColumns, setExplanationColumns] = useState<string[]>([]);
  const [explanations, setExplanations] = useState<Record<string, Record<string, string>>>({});
  const [newColumnName, setNewColumnName] = useState("");
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [isAddingAccount, setIsAddingAccount] = useState(false);
  const [newAccount, setNewAccount] = useState<Partial<GLAccount>>({ code: '', name: '', type: 'account', parent: '', actuals: 0, forecast: 0 });

  const toggleEditable = (accountCode: string, field: string) => {
    setEditableFields(prev => ({
      ...prev,
      [`${accountCode}-${field}`]: !prev[`${accountCode}-${field}`]
    }));
  };

  const handleAccountUpdate = (accountCode: string, field: keyof GLAccount, value: string | number) => {
    setGlAccounts(prev => 
      prev.map(account => 
        account.code === accountCode 
          ? { ...account, [field]: field === 'actuals' || field === 'forecast' ? Number(value) : value }
          : account
      )
    );
  };

  const handleExplanationChange = (accountCode: string, columnName: string, value: string) => {
    setExplanations(prev => ({
      ...prev,
      [accountCode]: {
        ...(prev[accountCode] || {}),
        [columnName]: value
      }
    }));
  };

  const handleAddColumn = () => {
    if (newColumnName && !explanationColumns.includes(newColumnName)) {
      setExplanationColumns(prev => [...prev, newColumnName]);
      setNewColumnName("");
      setIsAddingColumn(false);
    }
  };

  const handleAddAccount = () => {
    if (newAccount.code && newAccount.name) {
      setGlAccounts(prev => [...prev, newAccount as GLAccount]);
      setNewAccount({ code: '', name: '', type: 'account', parent: '', actuals: 0, forecast: 0 });
      setIsAddingAccount(false);
    }
  };

  const calculateVariance = (forecast: number, actuals: number) => {
    return forecast - actuals;
  };

  const calculateVariancePercent = (forecast: number, actuals: number) => {
    if (actuals === 0) return 0;
    return ((forecast - actuals) / actuals) * 100;
  };

  const getRowClassName = (account: GLAccount) => {
    if (account.type === 'header') return "bg-muted/50 font-bold";
    if (account.type === 'subcategory') return "bg-muted/30 font-semibold";
    return "";
  };

  const getVarianceClass = (variance: number) => {
    if (variance > 0) return "bg-green-100 text-green-800";
    if (variance < 0) return "bg-red-100 text-red-800";
    return "";
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Chart of Accounts</h3>
        <div className="flex gap-2">
          <Button 
            onClick={() => setIsAddingAccount(true)} 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" /> Add GL Account
          </Button>
          <Button 
            onClick={() => setIsAddingColumn(true)} 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" /> Add Explanation Column
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <FileText className="h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      {isAddingAccount && (
        <div className="bg-muted p-4 rounded-md mb-4">
          <h4 className="font-medium mb-2">Add New GL Account</h4>
          <div className="grid grid-cols-6 gap-2 mb-2">
            <Input
              placeholder="GL Code (e.g. 61000)"
              value={newAccount.code}
              onChange={(e) => setNewAccount({...newAccount, code: e.target.value})}
              className="col-span-1"
            />
            <Input
              placeholder="Account Name"
              value={newAccount.name}
              onChange={(e) => setNewAccount({...newAccount, name: e.target.value})}
              className="col-span-2"
            />
            <select 
              value={newAccount.type}
              onChange={(e) => setNewAccount({...newAccount, type: e.target.value as 'header' | 'account' | 'subcategory'})}
              className="col-span-1 p-2 border rounded-md"
            >
              <option value="header">Header</option>
              <option value="subcategory">Subcategory</option>
              <option value="account">Account</option>
            </select>
            <Input
              placeholder="Parent (if applicable)"
              value={newAccount.parent || ''}
              onChange={(e) => setNewAccount({...newAccount, parent: e.target.value})}
              className="col-span-2"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <Input
              type="number"
              placeholder="Actuals"
              value={newAccount.actuals || ''}
              onChange={(e) => setNewAccount({...newAccount, actuals: Number(e.target.value)})}
            />
            <Input
              type="number"
              placeholder="Forecast"
              value={newAccount.forecast || ''}
              onChange={(e) => setNewAccount({...newAccount, forecast: Number(e.target.value)})}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button size="sm" onClick={handleAddAccount}>Add</Button>
            <Button size="sm" variant="outline" onClick={() => setIsAddingAccount(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {isAddingColumn && (
        <div className="bg-muted p-4 rounded-md mb-4">
          <div className="flex items-center gap-2">
            <Input
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              placeholder="New column name (e.g., 'Explanation' or 'Comments')"
              className="flex-1"
            />
            <Button size="sm" onClick={handleAddColumn}>Add</Button>
            <Button size="sm" variant="outline" onClick={() => setIsAddingColumn(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <Table className="border border-gray-200">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[15%] border">GL Account</TableHead>
              <TableHead className="w-[20%] border">Description</TableHead>
              <TableHead className="border text-right">Actuals</TableHead>
              <TableHead className="border text-right">Forecast</TableHead>
              <TableHead className="border text-right">Var</TableHead>
              <TableHead className="border text-right">Var %</TableHead>
              {explanationColumns.map((column) => (
                <TableHead key={column} className="border">
                  {column}
                </TableHead>
              ))}
              <TableHead className="w-[10%] border text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {glAccounts.map((account) => {
              const variance = calculateVariance(account.forecast, account.actuals);
              const variancePercent = calculateVariancePercent(account.forecast, account.actuals);
              
              return (
                <TableRow key={account.code} className={getRowClassName(account)}>
                  <TableCell className="border font-medium" style={{paddingLeft: account.type === 'account' ? '2rem' : '0.5rem'}}>
                    {account.type === 'account' ? `${account.code} - ${account.name}` : account.name}
                  </TableCell>
                  <TableCell className="border">
                    {editableFields[`${account.code}-description`] ? (
                      <Input 
                        value={account.name} 
                        onChange={(e) => handleAccountUpdate(account.code, 'name', e.target.value)}
                        onBlur={() => toggleEditable(account.code, 'description')}
                        autoFocus
                      />
                    ) : (
                      <div 
                        className={`cursor-pointer p-2 ${account.type !== 'header' ? 'hover:bg-gray-100' : ''} rounded`}
                        onClick={() => account.type !== 'header' && toggleEditable(account.code, 'description')}
                      >
                        {account.type === 'header' ? '' : account.name}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="border text-right">
                    {editableFields[`${account.code}-actuals`] ? (
                      <Input 
                        type="number"
                        value={account.actuals} 
                        onChange={(e) => handleAccountUpdate(account.code, 'actuals', Number(e.target.value))}
                        onBlur={() => toggleEditable(account.code, 'actuals')}
                        className="text-right"
                        autoFocus
                      />
                    ) : (
                      <div 
                        className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                        onClick={() => toggleEditable(account.code, 'actuals')}
                      >
                        {account.actuals.toLocaleString()}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="border text-right">
                    {editableFields[`${account.code}-forecast`] ? (
                      <Input 
                        type="number"
                        value={account.forecast} 
                        onChange={(e) => handleAccountUpdate(account.code, 'forecast', Number(e.target.value))}
                        onBlur={() => toggleEditable(account.code, 'forecast')}
                        className="text-right"
                        autoFocus
                      />
                    ) : (
                      <div 
                        className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                        onClick={() => toggleEditable(account.code, 'forecast')}
                      >
                        {account.forecast.toLocaleString()}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className={`border text-right ${getVarianceClass(variance)}`}>
                    {variance >= 0 ? variance.toLocaleString() : `(${Math.abs(variance).toLocaleString()})`}
                  </TableCell>
                  <TableCell className={`border text-right ${getVarianceClass(variance)}`}>
                    {variancePercent >= 0 ? 
                      `${variancePercent.toFixed(1)}%` : 
                      `(${Math.abs(variancePercent).toFixed(1)}%)`}
                  </TableCell>
                  {explanationColumns.map((column) => (
                    <TableCell key={column} className="border">
                      <Textarea
                        value={explanations[account.code]?.[column] || ''}
                        onChange={(e) => handleExplanationChange(account.code, column, e.target.value)}
                        placeholder={`Add ${column.toLowerCase()}`}
                        className="min-h-[40px] resize-none text-sm"
                      />
                    </TableCell>
                  ))}
                  <TableCell className="border text-right">
                    {account.type !== 'header' && (
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => toggleEditable(account.code, 'description')}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => {
                            setGlAccounts(prev => prev.filter(a => a.code !== account.code));
                          }}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
