import React from 'react'
import { Modal } from '@staff-portal/modals-service'
import { Button } from '@toptal/picasso'
import { DetailedList } from '@staff-portal/ui'
import { NO_VALUE } from '@staff-portal/config'

import { CompanyOverviewFragment } from '../../../../../../data'
import { useGetLegalStaTermsModalItems } from '../../utils'

export type Props = {
  legalName?: string
  hideModal: () => void
} & Pick<CompanyOverviewFragment, 'activeStaContract'>

const LegalStaTermsModal = ({
  activeStaContract,
  legalName,
  hideModal
}: Props) => {
  const modalItems = useGetLegalStaTermsModalItems({ activeStaContract })

  return (
    <Modal open onClose={hideModal} data-testid='legal-sta-terms-modal'>
      <Modal.Title>STA Terms for {legalName}</Modal.Title>
      <Modal.Content>
        {/* eslint-disable-next-line @toptal/davinci/no-deprecated-props */}
        <DetailedList
          defaultValue={NO_VALUE}
          labelColumnWidth={9}
          items={modalItems}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button variant='secondary' onClick={hideModal}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default LegalStaTermsModal
