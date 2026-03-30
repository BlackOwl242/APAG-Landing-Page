export interface AdmissionProgram {
  code: string;
  title: string;
  isSpecialization: boolean;
}

export interface Program {
  id: string;
  code: string;
  title: string;
  quota: number;
  isSpecialization?: boolean;
  parentMajor?: string;
  combinations: string[];
}

export interface Campus {
  label: string;
  name: string;
  totalQuota: number;
  programs: Program[];
}
