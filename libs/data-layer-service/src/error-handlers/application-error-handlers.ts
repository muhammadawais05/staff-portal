import { createApplicationErrorHandlers } from './create-application-error-handlers'

export const applicationErrorHandlers = (applicationOptions: {
  appName: string
  packageVersion: string
}) => createApplicationErrorHandlers(applicationOptions)
