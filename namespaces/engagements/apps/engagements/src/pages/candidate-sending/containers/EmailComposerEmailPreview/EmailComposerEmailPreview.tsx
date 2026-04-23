import React, { useEffect } from 'react'
import { useMutation } from '@staff-portal/data-layer-service'
import { UnsafeAdvancedHtmlFormatter } from '@staff-portal/string'
import { Loader } from '@toptal/picasso'
import { useFormState } from '@toptal/picasso-forms'

import { GenerateEmailPreviewDocument } from '../../data/generate-email-preview/generate-email-preview.staff.gql.types'
import { useCandidateSendingContext } from '../../hooks'

const EmailComposerEmailPreview = () => {
  const { submitting } = useFormState({ subscription: { submitting: true } })
  const { stepsAttributes } = useCandidateSendingContext()

  const [generateEmailPreview, { loading, data }] = useMutation(
    GenerateEmailPreviewDocument
  )

  useEffect(() => {
    // prevent generating email when submitting
    if (!submitting) {
      generateEmailPreview({
        variables: { attributes: stepsAttributes }
      })
    }
  }, [generateEmailPreview, stepsAttributes, submitting])

  if (loading) {
    return <Loader data-testid='email-preview-loader' />
  }

  if (!data?.generateEmailPreview?.emailPreviewHtml) {
    return null
  }

  return (
    <UnsafeAdvancedHtmlFormatter
      data-testid='email-composer-email-preview'
      html={data.generateEmailPreview.emailPreviewHtml}
    />
  )
}

export default EmailComposerEmailPreview
