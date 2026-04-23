import React from 'react'
import ContentWrapper from '@staff-portal/page-wrapper'

import { EmailTemplateHelpContent } from '../../components'

const PAGE_TITLE = 'Email Templates Available Variables'

const EmailTemplateHelp = () => {
  return (
    <ContentWrapper title={PAGE_TITLE} browserTitle={PAGE_TITLE}>
      <EmailTemplateHelpContent />
    </ContentWrapper>
  )
}

export default EmailTemplateHelp
