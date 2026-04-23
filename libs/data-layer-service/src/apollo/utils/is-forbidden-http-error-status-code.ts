import { HttpErrorStatusCode } from '../enums'

export const isForbiddenHttpErrorStatusCode = (status?: number): boolean =>
  status === HttpErrorStatusCode.FORBIDDEN
