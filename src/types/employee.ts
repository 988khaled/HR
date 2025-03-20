export interface BaseEmployee {
  id: number;
  name: string;
  department: string;
}

export interface Employee extends BaseEmployee {
  email: string;
  phone: string;
  position: string;
  joinDate: string;
  status: 'active' | 'inactive';
  salary: number;
  dues: number;
  obligations: number;
}

export interface PayrollEmployee extends BaseEmployee {
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: string;
} 