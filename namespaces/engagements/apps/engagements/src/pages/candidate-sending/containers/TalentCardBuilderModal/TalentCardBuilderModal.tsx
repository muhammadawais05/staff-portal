import {
  concatMessages,
  useGetNode,
  useQuery
} from '@staff-portal/data-layer-service'
import {
  NewEngagementWizardAttributes,
  TalentPitchInput
} from '@staff-portal/graphql/staff'
import { Modal, ModalSuspender } from '@staff-portal/modals-service'
import { isOperationEnabled } from '@staff-portal/operations'
import { lazy } from '@staff-portal/utils'
import { Alert } from '@toptal/picasso'
import React, { useMemo } from 'react'

import { GetBuildTalentPitchOperationDocument } from '../../data/get-build-talent-pitch-operation/get-build-talent-pitch-operation.staff.gql.types'
import { GetProfileDataDocument } from '../../data/get-profile-data/get-profile-data.staff.gql.types'
import { GetTalentPitchDocument } from '../../data/get-talent-pitch/get-talent-pitch.staff.gql.types'
import { useNewEngagementWizardQuery } from '../../hooks'

const TalentCardBuilderModalContent = lazy(
  () => import('../TalentCardBuilderModalContent/TalentCardBuilderModalContent')
)

interface Props {
  talentId: string
  attributes: NewEngagementWizardAttributes
  hideModal: () => {}
  onComplete: (pitchData: TalentPitchInput) => void
}

const TalentCardBuilderModal = ({
  attributes,
  talentId,
  hideModal,
  onComplete
}: Props) => {
  const {
    data: buildTalentPitchData,
    loading: buildTalentPitchOperationLoading,
    error: buildTalentPitchError
  } = useQuery(GetBuildTalentPitchOperationDocument)

  const { data: pitchData, loading: pitchLoading } =
    useNewEngagementWizardQuery(GetTalentPitchDocument, {
      variables: { attributes },
      throwOnError: true
    })

  const { data: profileData, loading: profileLoading } = useGetNode(
    GetProfileDataDocument
  )(
    {
      talentId
    },
    { throwOnError: true }
  )

  const loading =
    pitchLoading || profileLoading || buildTalentPitchOperationLoading

  const content = useMemo(() => {
    const operation = buildTalentPitchData?.operations.buildTalentPitch

    if (!isOperationEnabled(operation)) {
      const errorMessage =
        concatMessages(operation?.messages) ?? buildTalentPitchError?.message

      return (
        <>
          <Modal.Title>Talent Card Builder</Modal.Title>
          <Modal.Content>
            <Alert>{errorMessage}</Alert>
          </Modal.Content>
        </>
      )
    }

    if (!pitchData?.newEngagementWizard || !profileData) {
      return null
    }

    return (
      <TalentCardBuilderModalContent
        talentPitch={pitchData?.newEngagementWizard?.talentPitch}
        talentProfile={profileData}
        hideModal={hideModal}
        onComplete={onComplete}
      />
    )
  }, [
    buildTalentPitchData?.operations.buildTalentPitch,
    buildTalentPitchError?.message,
    hideModal,
    onComplete,
    pitchData?.newEngagementWizard,
    profileData
  ])

  return (
    <Modal size='large' open onClose={hideModal}>
      {loading ? <ModalSuspender /> : content}
    </Modal>
  )
}

export default TalentCardBuilderModal
