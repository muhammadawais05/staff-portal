import React, { useMemo } from 'react'
import { GridItemField } from '@staff-portal/ui'
import { Form } from '@toptal/picasso-forms'
import { useNotifications, toTitleCase } from '@toptal/picasso/utils'

import { TOKEN_FIELD } from '../../config'
import { useGetEmailTemplateTokens } from './data/use-get-email-template-tokens'

const EmailTemplateTokenSelect = () => {
  const { showError } = useNotifications()

  const { emailTemplateTokens, loading } = useGetEmailTemplateTokens({
    onError: () =>
      showError(
        'An error occurred, unable to fetch searchable roles filter options.'
      )
  })

  const options = useMemo(() => {
    if (!emailTemplateTokens) {
      return []
    }
    const emptyOption = { text: '', value: '' }
    const uniqueTokens = Array.from(
      new Set([emptyOption, ...emailTemplateTokens])
    )

    return uniqueTokens.map(({ value }) => ({
      text: toTitleCase(value?.replace(/_/g, ' ')) as string,
      value: value as string
    }))
  }, [emailTemplateTokens])

  return (
    <GridItemField label='Token' labelFor={TOKEN_FIELD} size='medium'>
      <Form.Select
        id={TOKEN_FIELD}
        name={TOKEN_FIELD}
        loading={loading}
        options={options}
        width='full'
        limit={999}
      />
    </GridItemField>
  )
}

export default EmailTemplateTokenSelect
