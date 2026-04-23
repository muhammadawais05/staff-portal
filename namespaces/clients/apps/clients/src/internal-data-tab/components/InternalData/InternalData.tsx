import React from 'react'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'

import Quiz from '../../../components/Quiz'
import Comments from '../../../components/Comments'
import Investigations from '../../../components/Investigations'
import ReviewAttempts from '../../../components/ReviewAttempts'
import SystemInformation from '../../../components/SystemInformation'

type Props = {
  companyId: string
}

const InternalData = ({ companyId }: Props) => {
  return (
    <>
      <WidgetErrorBoundary emptyOnError>
        <Quiz companyId={companyId} />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <Comments companyId={companyId} />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <SystemInformation companyId={companyId} />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <Investigations companyId={companyId} />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <ReviewAttempts clientId={companyId} />
      </WidgetErrorBoundary>
    </>
  )
}

export default InternalData
