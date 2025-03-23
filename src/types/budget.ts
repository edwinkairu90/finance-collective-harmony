
export interface CostCenter {
  id: string;
  name: string;
  description: string;
  budget: number;
  departmentId: string;
}

export interface Department {
  id: string;
  name: string;
  budget: number;
  costCenters: CostCenter[];
}
