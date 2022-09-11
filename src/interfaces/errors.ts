export interface Error {
  errors: Errors[];
}

export interface Errors {
  location?: string;
  msg?: string;
  param?: string;
  value?: string;
}

export interface AuthError {
  ok: boolean;
  msg: string;
}
