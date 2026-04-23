import React from 'react'
import { Section, Container } from '@toptal/picasso'
import { useQuery } from '@staff-portal/data-layer-service'
import { PatchClientProfileInput } from '@staff-portal/graphql/staff'
import {
  ContainerLoader,
  TextSectionSkeleton,
  MultilineTextViewer
} from '@staff-portal/ui'
import { isOperationEnabled } from '@staff-portal/operations'
import {
  EditableTextarea,
  EditableField,
  getAdjustSingleStringValue
} from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import {
  GetClientAboutAndOperationDocument,
  SetClientAboutDocument
} from './data'
import {
  extractAboutValue,
  getClientAboutHook,
  extractAboutDisplayData
} from './utils'
import AboutViewer from './AboutViewer'

export interface Props {
  companyId: string
}

const AboutSection = ({ companyId }: Props) => {
  const { data, loading, initialLoading } = useQuery(
    GetClientAboutAndOperationDocument,
    {
      variables: {
        clientId: companyId
      }
    }
  )

  const about = extractAboutValue(data)
  const extractedAboutData = extractAboutDisplayData(data)

  const handleOnChange = useEditableFieldChangeHandler({
    mutationDocument: SetClientAboutDocument,
    initialValues: { about },
    requiredValues: { clientId: companyId },
    mutationResultOptions: {
      mutationResult: 'patchClientProfile'
    }
  })

  return (
    <ContainerLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={<TextSectionSkeleton title='About' />}
    >
      <Container top='medium'>
        <Section
          data-testid='about-section'
          title='About'
          variant='withHeaderBar'
        >
          <EditableField<Pick<PatchClientProfileInput, 'about'>>
            name='about'
            value={about}
            adjustValues={getAdjustSingleStringValue('about')}
            queryValue={getClientAboutHook(companyId)}
            onChange={handleOnChange}
            disabled={
              !isOperationEnabled(data?.node?.operations?.patchClientProfile)
            }
            multiline
            fullWidthEditor
            viewer={
              <MultilineTextViewer
                value={extractedAboutData.internalAbout}
                data-testid='about-viewer-internal-source-text'
              />
            }
            editor={props => (
              <EditableTextarea
                {...props}
                placeholder='Tell us a bit about your company...'
              />
            )}
          />
          <Container top={'small'}>
            <AboutViewer {...extractedAboutData} />
          </Container>
        </Section>
      </Container>
    </ContainerLoader>
  )
}

export default AboutSection
