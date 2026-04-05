export interface AdmissionFormData {
  fullName: string;
  highSchool: string;
  province: string;
  phone: string;
  email: string;
  programCode: string;
  question: string;
}

export interface FormState {
  success: boolean;
  message: string;
  errors?: Partial<Record<keyof AdmissionFormData, string>>;
}

export const INITIAL_FORM_STATE: FormState = {
  success: false,
  message: "",
};
