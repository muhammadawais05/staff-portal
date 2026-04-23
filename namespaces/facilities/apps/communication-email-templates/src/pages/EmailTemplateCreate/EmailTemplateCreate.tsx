import React from 'react'
import ContentWrapper from '@staff-portal/page-wrapper'
import { SkeletonLoader } from '@toptal/picasso'

import EmailTemplateCreateForm from '../../components/EmailTemplateCreateForm'
import { useGetTemplateData } from '../../hooks/use-get-template-data'
import { useGetTemplateIdSearchParam } from '../../hooks/use-get-template-id-search-param'

const COPY_TITLE = 'Copy Email Template'
const NEW_TITLE = 'New Email Template'

const EmailTemplateCreate = () => {
  const { templateId } = useGetTemplateIdSearchParam()
  const { data, loading } = useGetTemplateData({ templateId })

  const emailTemplate = data?.node
  const isCopy = !loading && data
  const pageTitle = isCopy ? COPY_TITLE : NEW_TITLE

  return (
    <ContentWrapper title={pageTitle} browserTitle={pageTitle}>
      {loading ? (
        <SkeletonLoader.Typography rows={12} />
      ) : (
        <EmailTemplateCreateForm emailTemplate={emailTemplate} />
      )}
    </ContentWrapper>
  )
}

export default EmailTemplateCreate
