import React from 'react'
import { ActivityType } from '@staff-portal/graphql/staff'

import AddActivityModalContent from '../AddActivityModalContent'

type Props = {
  subjectId: string
  hideModal: () => void
}

const AddActivityModalTalentContent = ({ subjectId, hideModal }: Props) => (
  <AddActivityModalContent
    subjectId={subjectId}
    hideModal={hideModal}
    type={ActivityType.TALENT_RELATED}
  />
)

export default AddActivityModalTalentContent
