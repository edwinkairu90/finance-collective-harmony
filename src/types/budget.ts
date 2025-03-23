
export interface CostCenter {
  id: string;
  name: string;
  description: string;
  budget: number;
  previousActual?: number;
  departmentId: string;
}

export interface Department {
  id: string;
  name: string;
  budget: number;
  costCenters: CostCenter[];
}
