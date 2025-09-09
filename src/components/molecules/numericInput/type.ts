export interface NumericInputProps {
  value?: number;
  min?: number; // Alt limit default 1 olacakkkk
  initialValue?: number;
  onChange: (value: number) => void;
}
