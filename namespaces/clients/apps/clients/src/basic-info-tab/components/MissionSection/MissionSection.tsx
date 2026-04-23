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

import { extractMission, getClientMissionHook } from './utils'
import {
  GetClientMissionAndOperationDocument,
  SetClientMissionDocument
} from './data'
export interface Props {
  companyId: string
}

const MissionSection = ({ companyId }: Props) => {
  const { data, loading, initialLoading } = useQuery(
    GetClientMissionAndOperationDocument,
    {
      variables: {
        clientId: companyId
      }
    }
  )

  const value = extractMission(data)

  const handleOnChange = useEditableFieldChangeHandler({
    mutationDocument: SetClientMissionDocument,
    initialValues: { mission: value },
    requiredValues: { clientId: companyId },
    mutationResultOptions: {
      mutationResult: 'patchClientProfile'
    }
  })

  return (
    <ContainerLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={<TextSectionSkeleton title='Mission' />}
    >
      <Container top='medium'>
        <Section
          data-testid='mission-section'
          title='Mission'
          variant='withHeaderBar'
        >
          <EditableField<Pick<PatchClientProfileInput, 'mission'>>
            name='mission'
            value={value}
            adjustValues={getAdjustSingleStringValue('mission')}
            queryValue={getClientMissionHook(companyId)}
            onChange={handleOnChange}
            disabled={
              !isOperationEnabled(data?.node?.operations?.patchClientProfile)
            }
            multiline
            fullWidthEditor
            viewer={<MultilineTextViewer value={value} />}
            editor={props => <EditableTextarea {...props} />}
          />
        </Section>
      </Container>
    </ContainerLoader>
  )
}

export default MissionSection
