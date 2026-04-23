import React from 'react'
import { Section } from '@toptal/picasso'
import {
  ContainerLoader,
  MultilineTextViewer,
  TextSectionSkeleton
} from '@staff-portal/ui'
import { UpdateCompanyRepresentativeProfileInput } from '@staff-portal/graphql/staff'
import {
  EditableField,
  EditableTextarea,
  getAdjustSingleStringValue
} from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import { isOperationEnabled } from '@staff-portal/operations'
import {
  RepresentativeFragment,
  UpdateCompanyRepresentativeProfileDocument
} from '@staff-portal/client-representatives'

import { getRepresentativeAboutHook } from './hooks'

type Props = {
  representative?: RepresentativeFragment
  loading: boolean
  initialLoading: boolean
}

const AboutSection = ({ loading, initialLoading, representative }: Props) => {
  const { id, about, operations } = representative ?? {}
  const handleChange = useEditableFieldChangeHandler({
    mutationDocument: UpdateCompanyRepresentativeProfileDocument,
    initialValues: { about: about },
    requiredValues: { companyRepresentativeId: id || '' }
  })

  return (
    <ContainerLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={
        <TextSectionSkeleton title='About' data-testid='about-section-loader' />
      }
    >
      <Section
        title='About'
        variant='withHeaderBar'
        data-testid='about-section'
      >
        <EditableField<Pick<UpdateCompanyRepresentativeProfileInput, 'about'>>
          value={about || ''}
          queryValue={getRepresentativeAboutHook(id)}
          adjustValues={getAdjustSingleStringValue('about')}
          name='about'
          multiline
          fullWidthEditor
          onChange={handleChange}
          disabled={
            !isOperationEnabled(operations?.updateCompanyRepresentativeProfile)
          }
          editor={props => <EditableTextarea {...props} />}
          viewer={<MultilineTextViewer value={about} />}
        />
      </Section>
    </ContainerLoader>
  )
}

export default AboutSection
