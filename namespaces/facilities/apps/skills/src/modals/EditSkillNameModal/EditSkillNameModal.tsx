import React, { useMemo } from 'react'
import { Modal } from '@staff-portal/modals-service'
import { Button } from '@toptal/picasso'
import { Form, arrayMutators } from '@toptal/picasso-forms'
import { ModalSkeleton } from '@staff-portal/ui'
import { isNotNullish } from '@staff-portal/utils'

import { VerticalWithSkillCategoriesFragment } from '../../data/get-verticals-with-categories'
import { SkillNamesListItemFragment } from '../../data/get-skill-names-list'
import { EditSkillNameConfirmation, FormFields } from './components'
import { EditSkillNameForm } from './types'
import {
  toSkillCategoriesOptions,
  toSkillPageSlugOptions,
  getInitialValues
} from './utils'
import { useGetSkillsList, useModalWithConfirmation } from './hooks'

export interface Props {
  skillName: SkillNamesListItemFragment
  verticalsWithCategories: VerticalWithSkillCategoriesFragment[]
  skillPageSlugs: string[]
  hideModal: () => void
}

const EditSkillNameModal = ({
  skillName: { id: skillNameId, name: sourceSkillName, skillPageSlug, skills },
  verticalsWithCategories,
  skillPageSlugs,
  hideModal
}: Props) => {
  const skillIds = skills.map(skill => skill.id)
  const { data: skillsData, loading } = useGetSkillsList(skillIds)
  const { confirmationRequired, goBack, handleSubmit } =
    useModalWithConfirmation(sourceSkillName, hideModal)

  const initialValues = useMemo(
    () =>
      getInitialValues({
        skillNameId,
        skillsData,
        newName: sourceSkillName,
        skillPageSlug
      }),
    [skillNameId, skillsData, sourceSkillName, skillPageSlug]
  )

  const modalTitle = confirmationRequired ? 'Merge Skill' : 'Edit Skill'

  if (loading) {
    return (
      <Modal
        open
        onClose={confirmationRequired ? goBack : hideModal}
        size='large'
      >
        <ModalSkeleton
          title={modalTitle}
          data-testid='EditSkillNameModal-skeleton'
        />
      </Modal>
    )
  }

  const skillCategoriesOptionsByVertical = toSkillCategoriesOptions(
    verticalsWithCategories
  )
  const skillPageSlugsOptions = toSkillPageSlugOptions(skillPageSlugs)

  const actionTitle = confirmationRequired ? 'Merge Skill' : 'Save Skill'

  return (
    <Modal
      withForm
      open
      onClose={confirmationRequired ? goBack : hideModal}
      size='large'
    >
      <Form<EditSkillNameForm>
        onSubmit={handleSubmit}
        initialValues={initialValues}
        mutators={{ ...arrayMutators }}
      >
        <Modal.Title>{modalTitle}</Modal.Title>
        <Modal.Content>
          {!confirmationRequired ? (
            <FormFields
              skills={skillsData.filter(isNotNullish)}
              skillCategoriesOptionsByVertical={
                skillCategoriesOptionsByVertical
              }
              skillSlugsOptions={skillPageSlugsOptions}
              verticalsWithCategories={verticalsWithCategories}
            />
          ) : (
            <EditSkillNameConfirmation sourceSkillName={sourceSkillName} />
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
            data-testid='EditSkillNameModal-submitButton'
          >
            {actionTitle}
          </Form.SubmitButton>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default EditSkillNameModal
