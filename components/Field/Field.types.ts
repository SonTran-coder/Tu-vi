export interface FormFieldProps {
  name: string;
  placeholder?: string;
  type?: "text" | "select" | "checkbox" | "password" | "datepicker";
  options?: { value: string; label: string }[];
  className?: string;
  label?: string;
  labelStyle?: string;
  defaultValue?: string;
}
