import React, { Fragment } from 'react'
import { UpdateClientClientPartnerPayload } from '@staff-portal/graphql/staff'
import { Modal } from '@staff-portal/modals-service'
import { Typography, Button } from '@toptal/picasso'
import { LinkWrapper } from '@staff-portal/ui'

import { getUpdateClientPartnerMessage } from '../../utils'

interface Props {
  hideModal: () => void
  data?: UpdateClientClientPartnerPayload
  assignee?: string
}

const ClientPartnerUpdateDetailsModal = ({
  hideModal,
  assignee,
  data
}: Props) => {
  if (!data || !assignee) {
    return null
  }

  const {
    missedClients,
    missedOpportunities,
    updatedClients,
    updatedOpportunities
  } = data

  const missedData = [...(missedClients || []), ...(missedOpportunities || [])]

  return (
    <Modal open onClose={hideModal}>
      <Modal.Title data-testid='update-client-partner-notification-modal-title'>
        The client partner was successfully updated.
      </Modal.Title>
      <Modal.Content>
        <Typography data-testid='update-client-partner-notification-modal-details'>
          {getUpdateClientPartnerMessage({
            assignee,
            companies: updatedClients?.length,
            opportunities: updatedOpportunities?.length,
            updated: true
          })}
          {missedData.length > 0 &&
            ' The client partner was not updated for the following entities: '}
          {missedData.map(({ webResource, id }, index) => (
            <Fragment key={id}>
              <LinkWrapper
                wrapWhen={Boolean(webResource.url)}
                href={webResource?.url || undefined}
              >
                {webResource.text}
              </LinkWrapper>
              {index < missedData.length - 1 && ', '}
            </Fragment>
          ))}
        </Typography>
      </Modal.Content>
      <Modal.Actions>
        <Button variant='secondary' onClick={hideModal}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ClientPartnerUpdateDetailsModal
