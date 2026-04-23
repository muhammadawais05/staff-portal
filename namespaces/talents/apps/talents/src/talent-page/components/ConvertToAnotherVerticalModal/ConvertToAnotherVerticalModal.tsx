import { Button, Container, Typography } from '@toptal/picasso'
import React, { useMemo, useRef, useState } from 'react'
import { Modal } from '@staff-portal/modals-service'
import { Maybe } from '@staff-portal/graphql/staff'
import { getRoleTypeText } from '@staff-portal/facilities'
import { TalentVerticalFragment } from '@staff-portal/talents'

import ConvertToAnotherVerticalForm, {
  ConvertToAnotherVerticalFormMethods
} from '../ConvertToAnotherVerticalForm'

export interface Props {
  talentId: string
  fullName: string
  type: string
  verticals: TalentVerticalFragment[]
  hideModal: () => void
  screeningRoleSteps?: Maybe<{
    nodes: { id: string; status: string; step: { id: string; title: string } }[]
  }>
}

const ConvertToAnotherVerticalModal = ({
  talentId,
  fullName,
  type,
  verticals,
  hideModal,
  screeningRoleSteps
}: Props) => {
  const [loading, setLoading] = useState(false)
  const convertTalentFormRef = useRef<ConvertToAnotherVerticalFormMethods>()
  const form = useMemo(
    () => (
      <ConvertToAnotherVerticalForm
        ref={convertTalentFormRef}
        talentId={talentId}
        type={type}
        verticals={verticals}
        screeningRoleSteps={screeningRoleSteps}
      />
    ),
    [talentId, type, verticals, screeningRoleSteps]
  )

  const handleSubmit = async () => {
    const submitResult = convertTalentFormRef.current?.submit()

    if (!submitResult) {
      return
    }

    setLoading(true)
    const result = await submitResult

    if (result?.data?.convertTalent?.success) {
      hideModal()

      return
    }

    setLoading(false)
  }

  return (
    <Modal open onClose={hideModal}>
      <Modal.Title>
        Convert {getRoleTypeText(type)} {fullName}
      </Modal.Title>
      <Modal.Content>
        <Container bottom='medium'>
          <Typography size='medium'>
            Do you really want to convert this profile? Profile must be reviewed
            after conversion!
          </Typography>
        </Container>
        {form}
      </Modal.Content>
      <Modal.Actions>
        <Button
          variant='secondary'
          disabled={loading}
          onClick={() => hideModal()}
        >
          Cancel
        </Button>
        <Button variant='negative' loading={loading} onClick={handleSubmit}>
          Convert
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ConvertToAnotherVerticalModal
