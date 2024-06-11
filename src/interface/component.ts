interface OptionType {
  label:string
  value:number | string
}
export interface componentContentType {
  inputType?: string;
  radioType?: string;
  variateName: string;
  defaultValue: any;
  width: string;
  size: string;
  label: string;
  labelWidth: number;
  labelPosition: string;
  border?: boolean;
  textColor?: string;
  fill?: string;
  prop?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  verifyMsg?: string;
  isCustomVerify?: boolean;
  customVerify?: string;
  options?: OptionType[];
  [key: string]: any;
};
export interface PropsType {
  componentContent: componentContentType;
}
