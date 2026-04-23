export interface ApplicationOptions {
  appName: string
  packageVersion: string
}

export type Maybe<T> = T | null

export type UserError = {
  code: string
  key: string
  message: string
}

// "Type" was added to avoid name conflict
export type MutationResultType = {
  errors: UserError[]
  notice?: Maybe<string>
  success: boolean
}

export enum GraphQLErrorCode {
  TOS_UNACCEPTED = 'TOS_UNACCEPTED',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  UNAUTHORIZED = 'UNAUTHORIZED',
  EMPTY = 'EMPTY',
  THIRD_PARTY_SERVICE_ERROR = 'THIRD_PARTY_SERVICE_ERROR',
  UPLOAD_LIMIT_EXCEEDED = 'UPLOAD_LIMIT_EXCEEDED'
}
