import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { UpdateClientClientPartnerPayload } from '@staff-portal/graphql/staff'

import { getUpdateClientPartnerMessage } from '../../utils'
import ClientPartnerNotificationModal from '.'

jest.mock('../../utils')

const getUpdateClientPartnerMessageMock =
  getUpdateClientPartnerMessage as jest.Mock

const renderComponent = (data?: UpdateClientClientPartnerPayload) =>
  render(
    <ClientPartnerNotificationModal
      hideModal={() => {}}
      assignee={'Assignee'}
      data={data}
    />
  )

describe('UpdateClientPartnerNotification', () => {
  beforeEach(() => {
    getUpdateClientPartnerMessageMock.mockReturnValue('message')
  })

  describe('when there is no missed data', () => {
    it('returns success message and updated info', () => {
      const updatedClients = Array(5)
      const updatedOpportunities = Array(5)
      const data = {
        missedClients: [
          {
            id: 'client1',
            webResource: { url: 'client1-url', text: 'client1' }
          }
        ],
        missedOpportunities: [
          {
            id: 'opportunity1',
            webResource: { url: 'opportunity1-url', text: 'opportunity1' }
          }
        ],
        updatedClients,
        updatedOpportunities
      }

      renderComponent(data as UpdateClientClientPartnerPayload)

      expect(
        screen.getByTestId('update-client-partner-notification-modal-title')
      ).toHaveTextContent('The client partner was successfully updated.')
      expect(
        screen.getByTestId('update-client-partner-notification-modal-details')
      ).toHaveTextContent(
        'message The client partner was not updated for the following entities: client1, opportunity1'
      )
      expect(getUpdateClientPartnerMessageMock).toHaveBeenCalledWith({
        assignee: 'Assignee',
        companies: updatedClients.length,
        opportunities: updatedOpportunities.length,
        updated: true
      })
    })
  })

  describe('when there is missed data', () => {
    it('returns success message, updated info and missed data', () => {
      const webResource = {
        text: 'fullName',
        url: 'https://cool.web.com'
      }
      const data = {
        missedClients: [
          { webResource, id: '121' },
          { webResource, id: '122' },
          { webResource, id: '123' },
          { webResource, id: '124' }
        ],
        missedOpportunities: undefined,
        updatedClients: undefined,
        updatedOpportunities: undefined
      }

      renderComponent(data as UpdateClientClientPartnerPayload)

      expect(
        screen.getByTestId('update-client-partner-notification-modal-title')
      ).toBeInTheDocument()
      expect(
        screen.getByTestId('update-client-partner-notification-modal-details')
      ).toHaveTextContent(
        ` The client partner was not updated for the following entities: ${webResource.text}`
      )
      expect(
        screen.getByTestId('update-client-partner-notification-modal-details')
          .children[0]
      ).toHaveAttribute('href', webResource.url)
    })
  })
})
