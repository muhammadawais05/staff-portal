import React from 'react'
import { Dropdown, Menu, Button, More16 } from '@toptal/picasso'
// TODO: replace import, once it's removed https://toptal-core.atlassian.net/browse/SPB-2949
// eslint-disable-next-line no-restricted-imports
import { useModal } from '@toptal/picasso/utils'
import { isOperationEnabled } from '@staff-portal/operations'
import { Talent } from '@staff-portal/talents-screening-specialists'

import ReactivateModal from '../ReactivateModal'
import * as S from './styles'

export interface Props {
  talent: Talent
}

const TalentTableRowActions = ({ talent }: Props) => {
  const operations = talent.currentSpecialistAssignment?.operations
  const {
    showModal: showReactivateModal,
    hideModal: hideReactivateModal,
    isOpen: isReactivateModalOpen
  } = useModal()

  if (
    !operations ||
    !isOperationEnabled(operations.reactivateSpecialistAssignment)
  ) {
    return null
  }

  return (
    <>
      <Dropdown
        content={
          <Menu data-testid='item-actions-menu'>
            <Menu.Item onClick={showReactivateModal}>
              Update to active
            </Menu.Item>
          </Menu>
        }
      >
        <Button.Circular
          variant='transparent'
          icon={<More16 />}
          aria-label='More'
          css={S.button}
        />
      </Dropdown>

      {isReactivateModalOpen && (
        <ReactivateModal talent={talent} hideModal={hideReactivateModal} />
      )}
    </>
  )
}

export default TalentTableRowActions
