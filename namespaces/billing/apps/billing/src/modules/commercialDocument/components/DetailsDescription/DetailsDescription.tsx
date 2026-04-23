import React from 'react'
import { useTranslation } from 'react-i18next'
import { Section, Typography } from '@toptal/picasso'
import { Maybe } from '@staff-portal/graphql/staff'
import MultilineComment from '@staff-portal/billing/src/components/MultilineComment'

const displayName = 'DetailsDescription'

interface Props {
  description?: Maybe<string>
  documentNote?: Maybe<string>
}

export const DetailsDescription = ({ description, documentNote }: Props) => {
  const { t: translate } = useTranslation('commercialDocument')

  if (!description && !documentNote) {
    return null
  }

  return (
    <>
      {description && (
        <Section
          data-testid={`${displayName}-description`}
          title={translate('detailsDescription.description.title')}
        >
          <Typography size='medium' data-testid={`${displayName}-description`}>
            {description}
          </Typography>
        </Section>
      )}
      {documentNote && (
        <Section
          data-testid={`${displayName}-documentNote`}
          title={translate('detailsDescription.documentNote.title')}
        >
          <Typography size='medium'>
            <MultilineComment>{documentNote}</MultilineComment>
          </Typography>
        </Section>
      )}
    </>
  )
}

DetailsDescription.displayName = displayName

export default DetailsDescription
