export enum enumToastify {
  error = 'error',
  success = 'success'
}

export interface CustomSelectProps {
  value?: number | string;
  title: string;
}

export interface MessageDef {
  from: string;
  to: string;
  content: string;
  createdAt?: Date;
  status?: Number;
}
