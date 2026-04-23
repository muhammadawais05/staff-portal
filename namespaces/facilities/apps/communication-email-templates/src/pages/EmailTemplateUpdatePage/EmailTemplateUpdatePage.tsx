import React from 'react'
import ContentWrapper from '@staff-portal/page-wrapper'
import { SkeletonLoader } from '@toptal/picasso'

import EmailTemplateUpdateForm from '../../components/EmailTemplateUpdateForm'
import { useGetTemplateIdParam } from '../../hooks/use-get-template-id-param'
import { useGetTemplateData } from '../../hooks/use-get-template-data'

const UpdateEmailTemplate = () => {
  const { templateId } = useGetTemplateIdParam()
  const { data, loading } = useGetTemplateData({ templateId })

  return (
    <ContentWrapper
      title={data?.node?.name}
      titleLoading={loading}
      browserTitle={data?.node?.name}
    >
      {data?.node ? (
        <EmailTemplateUpdateForm emailTemplate={data?.node} />
      ) : (
        <SkeletonLoader.Typography rows={12} />
      )}
    </ContentWrapper>
  )
}

export default UpdateEmailTemplate
