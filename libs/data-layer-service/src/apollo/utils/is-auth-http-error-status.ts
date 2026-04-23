import { HttpErrorStatusCode } from '../enums'

export const isAuthHttpErrorStatusCode = (status?: number): boolean =>
  status === HttpErrorStatusCode.UNAUTHORIZED
