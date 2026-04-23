import { FC } from 'react'
import * as Sentry from '@sentry/react'

export const wrapWithPerformanceProfiler = (App: FC) => Sentry.withProfiler(App)

export default wrapWithPerformanceProfiler
