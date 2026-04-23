import React from 'react'
import { ModalSuspender } from '@staff-portal/modals-service'
import { render } from '@toptal/picasso/test-utils'

import ClaimClientEnterpriseForm from '../ClaimClientEnterpriseForm'
import ClaimClientEnterpriseModalContent from '.'
import { useGetClientContacts } from '../../data/get-client-contacts'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  ModalSuspender: jest.fn()
}))
jest.mock('../ClaimClientEnterpriseForm')
jest.mock('../../data/get-client-contacts', () => ({
  useGetClientContacts: jest.fn()
}))

const mockedModalSuspender = ModalSuspender as unknown as jest.Mock
const mockedClaimClientEnterpriseForm = ClaimClientEnterpriseForm as jest.Mock
const useGetClientContactsMock = useGetClientContacts as jest.Mock

const clientId = 'clientId'
const hideModal = jest.fn()

const renderComponent = () =>
  render(
    <ClaimClientEnterpriseModalContent
      clientId={clientId}
      hideModal={hideModal}
    />
  )

describe('ClaimClientEnterpriseModalContent', () => {
  beforeEach(() => {
    mockedClaimClientEnterpriseForm.mockReturnValue(null)
    mockedModalSuspender.mockReturnValue(null)
  })

  describe('when data is loading', () => {
    it('calls modal suspender', () => {
      useGetClientContactsMock.mockReturnValue({ data: {}, loading: true })

      renderComponent()

      expect(mockedModalSuspender).toHaveBeenCalledTimes(1)
    })
  })

  describe('when data is not loading', () => {
    it('calls claim enterprise form', () => {
      const data = 'data'

      useGetClientContactsMock.mockReturnValue({ data, loading: false })

      renderComponent()

      expect(mockedModalSuspender).not.toHaveBeenCalled()
      expect(mockedClaimClientEnterpriseForm).toHaveBeenCalledTimes(1)
      expect(mockedClaimClientEnterpriseForm).toHaveBeenCalledWith(
        {
          data,
          hideModal,
          clientId
        },
        {}
      )
    })
  })
})
