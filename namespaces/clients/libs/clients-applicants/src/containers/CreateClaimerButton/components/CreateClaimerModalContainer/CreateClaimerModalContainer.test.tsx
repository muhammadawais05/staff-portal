import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { Modal, ModalSuspender } from '@staff-portal/modals-service'
import { Button } from '@toptal/picasso'
import { assertIsNotNullish, noop } from '@staff-portal/utils'

import { useGetCreateClaimerDetails } from '../../data'
import CreateClaimerModalContainer from './CreateClaimerModalContainer'
import { getQuestionText, useClaimCompany } from '../../services'
import CreateClaimerModalContent from '../CreateClaimerModalContent/CreateClaimerModalContent'

jest.mock('../../data', () => ({
  ...jest.requireActual('../../data'),
  useGetCreateClaimerDetails: jest.fn()
}))
jest.mock('@staff-portal/current-user', () => ({
  useGetCurrentUser: jest.fn()
}))
jest.mock('../../services', () => ({
  getCallRequestText: jest.fn(),
  getQuestionText: jest.fn(),
  useClaimCompany: jest.fn()
}))
jest.mock('../CreateClaimerModalContent/CreateClaimerModalContent', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Button: jest.fn()
}))
jest.mock('@staff-portal/utils', () => ({
  ...jest.requireActual('@staff-portal/utils'),
  assertIsNotNullish: jest.fn()
}))
jest.mock('@staff-portal/modals-service', () => ({
  Modal: jest.fn(),
  ModalSuspender: jest.fn()
}))

const mockedUseGetCurrentUser = useGetCurrentUser as jest.Mock
const mockedModal = Modal as unknown as jest.Mock & {
  Content: jest.Mock
  Actions: jest.Mock
  Title: jest.Mock
}
const mockedModalSuspender = ModalSuspender as unknown as jest.Mock
const mockedButton = Button as unknown as jest.Mock
const mockedAssertIsNotNullish = assertIsNotNullish as jest.Mock
const mockedUseGetCreateClaimerDetails = useGetCreateClaimerDetails as jest.Mock
const mockedCreateClaimerModalContent = CreateClaimerModalContent as jest.Mock
const mockedUseClaimCompany = useClaimCompany as jest.Mock
const mockedGetQuestionText = getQuestionText as jest.Mock

const renderComponent = (
  props: ComponentProps<typeof CreateClaimerModalContainer>
) => render(<CreateClaimerModalContainer {...props} />)

describe('CreateClaimerModalContainer', () => {
  const clientId = 'clientId'
  const hideModal = () => null
  const timeZoneName = 'timeZoneName'
  const question = 'question'

  beforeEach(() => {
    mockedUseGetCurrentUser.mockReturnValueOnce({
      timeZone: {
        name: timeZoneName
      }
    })
    mockedButton.mockReturnValueOnce(null).mockReturnValueOnce(null)
    mockedCreateClaimerModalContent.mockReturnValueOnce(null)
    mockedGetQuestionText.mockReturnValueOnce(question)
    mockedModal.Content = jest.fn(({ children }) => children)
    mockedModal.Actions = jest.fn(({ children }) => children)
    mockedModal.Title = jest.fn(() => null)
  })

  describe('when loading', () => {
    it('should render ModalSuspender only', () => {
      mockedUseGetCreateClaimerDetails.mockReturnValueOnce({
        loading: true
      })
      mockedUseClaimCompany.mockReturnValueOnce({
        handleSubmit: () => null,
        loading: false
      })
      mockedModalSuspender.mockReturnValueOnce(null)

      renderComponent({
        clientId,
        hideModal
      })

      expect(mockedModalSuspender).toHaveBeenCalledTimes(1)
      expect(mockedCreateClaimerModalContent).toHaveBeenCalledTimes(0)
      expect(mockedAssertIsNotNullish).toHaveBeenCalledTimes(0)
    })
  })

  describe('when company is undefined', () => {
    it('should throw an error', () => {
      jest.spyOn(console, 'error').mockImplementation(noop)
      mockedUseGetCreateClaimerDetails.mockReturnValueOnce({
        company: null,
        loading: false
      })
      mockedUseClaimCompany.mockReturnValueOnce({
        handleSubmit: () => null,
        loading: false
      })
      mockedModalSuspender.mockReturnValueOnce(null)
      mockedAssertIsNotNullish.mockImplementationOnce(() => {
        throw new Error()
      })

      expect(() =>
        renderComponent({
          clientId,
          hideModal
        })
      ).toThrow()

      jest.spyOn(console, 'error').mockReset()
    })
  })

  describe('when company is defined and pendingCallbackRequest is available', () => {
    it('should render modal content', () => {
      const company = {}
      const handleSubmit = () => null
      const getDetailsLoading = {}

      mockedUseGetCreateClaimerDetails.mockReturnValueOnce({
        company,
        loading: false
      })
      mockedUseClaimCompany.mockReturnValueOnce({
        handleSubmit,
        loading: getDetailsLoading
      })
      mockedModalSuspender.mockReturnValueOnce(null)
      mockedAssertIsNotNullish.mockReturnValueOnce(null)

      renderComponent({
        clientId,
        hideModal
      })

      expect(mockedModalSuspender).toHaveBeenCalledTimes(0)
      expect(mockedAssertIsNotNullish).toHaveBeenCalledTimes(1)
      expect(mockedAssertIsNotNullish).toHaveBeenCalledWith(company)
      expect(mockedCreateClaimerModalContent).toHaveBeenCalledTimes(1)
      expect(mockedCreateClaimerModalContent).toHaveBeenCalledWith(
        {
          company,
          timeZoneName
        },
        {}
      )
      expect(mockedButton).toHaveBeenCalledTimes(2)
      expect(mockedButton).toHaveBeenNthCalledWith(
        1,
        {
          children: 'Cancel',
          disabled: getDetailsLoading,
          onClick: hideModal,
          variant: 'secondary'
        },
        {}
      )
      expect(mockedButton).toHaveBeenNthCalledWith(
        2,
        {
          children: ['Claim Company', undefined],
          'data-testid': 'submit-claim-company',
          loading: getDetailsLoading,
          onClick: expect.any(Function),
          variant: 'positive'
        },
        {}
      )
    })
  })
})
