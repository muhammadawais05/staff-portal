import React from 'react'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'

import CompanyFinancialInformation from '../../../components/CompanyFinancialInformation'
import SocialMedia from '../../../components/SocialMedia'
import InDepthCompanyResearch from '../InDepthCompanyResearch'

type Props = {
  companyId: string
}

const WebAndSocial = ({ companyId }: Props) => {
  return (
    <>
      <WidgetErrorBoundary emptyOnError>
        <InDepthCompanyResearch companyId={companyId} />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <CompanyFinancialInformation companyId={companyId} />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <SocialMedia companyId={companyId} />
      </WidgetErrorBoundary>
    </>
  )
}

export default WebAndSocial
