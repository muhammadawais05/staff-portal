import { FormCancelButton } from '@staff-portal/forms'
import { TalentPitchInput } from '@staff-portal/graphql/staff'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import {
  getBuildTalentPitchInput,
  PitcherState,
  revalidate,
  TalentCardBuilder,
  TalentPitchFragment,
  TalentProfileFragment,
  useGetTalentCardBuilderOptions
} from '@staff-portal/talents-card-builder'
import { Form, FormSpy } from '@toptal/picasso-forms'
import React, { useCallback, useState } from 'react'

interface Props {
  talentProfile: TalentProfileFragment
  talentPitch?: TalentPitchFragment | null
  hideModal: () => void
  onComplete: (pitchData: TalentPitchInput) => void
}

const TalentCardBuilderModalContent = ({
  talentProfile,
  talentPitch,
  hideModal,
  onComplete
}: Props) => {
  const [inEdit, setInEdit] = useState(false)

  const { initialCard, roleId, cardValidationContext, onValidate } =
    useGetTalentCardBuilderOptions({ talentProfile, talentPitch })

  const handleCardPreviewToggle = useCallback(
    (enabled: boolean) => {
      setInEdit(!enabled)
    },
    [setInEdit]
  )

  const handleSubmit = useCallback(
    async (values: PitcherState) => {
      const pitchData = getBuildTalentPitchInput({
        highlights: values.highlights
      })

      onComplete(pitchData)
      hideModal()
    },
    [hideModal, onComplete]
  )

  return (
    <ModalForm<PitcherState>
      title='Talent Card Builder'
      initialValues={initialCard}
      validate={onValidate}
      mutators={{ revalidate }}
      onSubmit={handleSubmit}
    >
      <Modal.Content>
        <TalentCardBuilder
          inEdit={inEdit}
          roleId={roleId}
          talentProfile={talentProfile}
          onCardPreviewToggle={handleCardPreviewToggle}
          cardValidationContext={cardValidationContext}
          talentTimeZone={talentProfile.timeZone?.name}
        />
      </Modal.Content>

      <Modal.Actions>
        <FormCancelButton onClick={hideModal} />

        <FormSpy subscription={{ hasValidationErrors: true }}>
          {({ hasValidationErrors }) => (
            <Form.SubmitButton
              disabled={hasValidationErrors}
              variant='positive'
            >
              Finish
            </Form.SubmitButton>
          )}
        </FormSpy>
      </Modal.Actions>
    </ModalForm>
  )
}

export default TalentCardBuilderModalContent
