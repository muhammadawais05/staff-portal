import React, { useMemo } from 'react'
import { Modal } from '@staff-portal/modals-service'
import { Button } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'

import { CloneSkillNameConfirmation } from './components'
import { SkillNamesListItemFragment } from '../../data/get-skill-names-list'
import { CloneSkillNameForm } from './types'
import { useModalWithConfirmation } from './hooks'
import { SkillNameAutocomplete } from '../../components'

export interface Props {
  skillName: SkillNamesListItemFragment
  hideModal: () => void
}

const CloneSkillNameModal = ({
  skillName: { id: skillNameId, name: sourceSkillName },
  hideModal
}: Props) => {
  const { confirmationRequired, goBack, handleSubmit } =
    useModalWithConfirmation(sourceSkillName, hideModal)

  const initialValues = useMemo<CloneSkillNameForm>(() => {
    return { newName: sourceSkillName, skillNameId }
  }, [sourceSkillName, skillNameId])

  const actionTitle = useMemo(() => {
    return confirmationRequired ? 'Merge Skill' : 'Clone Skill'
  }, [confirmationRequired])

  return (
    <Modal
      withForm
      open
      onClose={confirmationRequired ? goBack : hideModal}
      size='small'
    >
      <Form<CloneSkillNameForm>
        onSubmit={handleSubmit}
        initialValues={initialValues}
      >
        <Modal.Title>{actionTitle}</Modal.Title>
        <Modal.Content>
          {!confirmationRequired ? (
            <SkillNameAutocomplete
              name='newName'
              label='New Name'
              hint={`If a new name matches an existing skill, the skills will be merged.
              You can use autocomplete to find existing checked skills`}
            />
          ) : (
            <CloneSkillNameConfirmation sourceSkillName={sourceSkillName} />
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button
            variant='secondary'
            onClick={confirmationRequired ? goBack : hideModal}
          >
            Cancel
          </Button>
          <Form.SubmitButton
            variant='positive'
            data-testid='CloneSkillNameModal-submitButton'
          >
            {actionTitle}
          </Form.SubmitButton>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default CloneSkillNameModal
