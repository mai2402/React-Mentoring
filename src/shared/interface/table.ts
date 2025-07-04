



export interface CustomTableProps<T> {
   data: T[];

   columns:  {
        key: keyof T | string;
        label: string;
        render?: (item: T) => React.ReactNode;}[];

  actions?: (item: T) => {
    label: string;
    icon: string;
    action: () => void;}[];

}