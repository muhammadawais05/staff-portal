import React, { useMemo } from 'react'
import { Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useQuery, useGetNode } from '@staff-portal/data-layer-service'
import {
  BasicInfo,
  Preview,
  emptyFormState,
  getPreviewData,
  getProfilePitch,
  getTalentCardContent,
  PreviewTalentCardLoader
} from '@staff-portal/talents-card-builder'

import { GetProfileDataDocument } from '../../data/get-profile-data/get-profile-data.staff.gql.types'
import { GetTalentPitchDocument } from '../../data/get-talent-pitch/get-talent-pitch.staff.gql.types'

interface Props {
  talentId: string
  jobId?: string
  withFormWrapper?: boolean
}

const PreviewTalentCard = ({
  talentId,
  jobId,
  withFormWrapper = true
}: Props) => {
  const attributes = { talentId, jobId }

  const { data: pitchData, loading: pitchLoading } = useQuery(
    GetTalentPitchDocument,
    {
      variables: { attributes },
      throwOnError: true
    }
  )

  const { data: profileData, loading: profileLoading } = useGetNode(
    GetProfileDataDocument
  )({ talentId }, { throwOnError: true })

  const content = useMemo(() => {
    if (!profileData) {
      return null
    }

    return getTalentCardContent(profileData)
  }, [profileData])

  if (profileLoading || pitchLoading) {
    return <PreviewTalentCardLoader />
  }

  if (!profileData || !pitchData || !content) {
    return null
  }

  const highlights =
    getProfilePitch(profileData, pitchData.newEngagementWizard?.talentPitch) ??
    emptyFormState.highlights

  const renderPreview = () => {
    const previewComponent = (
      <Preview
        sortable={false}
        roleType={profileData.type}
        fullName={profileData.fullName}
        values={getPreviewData({
          content,
          state: { highlights }
        })}
      />
    )

    if (withFormWrapper) {
      return (
        <Form data-testid='preview-talent-card-form' onSubmit={() => {}}>
          {previewComponent}
        </Form>
      )
    }

    return previewComponent
  }

  return (
    <Container
      bordered
      rounded
      top='small'
      bottom='small'
      padded='medium'
      data-testid='preview-talent-card'
    >
      <BasicInfo
        photo={profileData.photo?.default}
        fullName={profileData.fullName ?? '???'}
        location={profileData.profileV2.city}
      />

      {renderPreview()}
    </Container>
  )
}

export default PreviewTalentCard
