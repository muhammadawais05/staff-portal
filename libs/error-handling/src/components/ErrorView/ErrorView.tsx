import React, { FunctionComponent } from 'react'

import ErrorViewApplication from '../ErrorViewApplication'
import ErrorViewForbidden from '../ErrorViewForbidden'
import ErrorViewDefault from '../ErrorViewDefault'
import ErrorViewUnableToLoad from '../ErrorViewUnableToLoad'
import ErrorViewNotFound from '../ErrorViewNotFound'

interface Props {
  errorType?: ErrorType
}

export enum ErrorType {
  APPLICATION,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  DEFAULT,
  NOT_FOUND
}

const viewByType: Record<ErrorType, FunctionComponent> = {
  [ErrorType.APPLICATION]: ErrorViewApplication,
  [ErrorType.FORBIDDEN]: ErrorViewForbidden,
  [ErrorType.INTERNAL_SERVER_ERROR]: ErrorViewUnableToLoad,
  [ErrorType.NOT_FOUND]: ErrorViewNotFound,
  [ErrorType.DEFAULT]: ErrorViewDefault
}

const ErrorView = ({
  errorType = ErrorType.DEFAULT
}: Props) => {
  const Component = viewByType[errorType] || ErrorViewDefault

  return <Component />
}

export default ErrorView
