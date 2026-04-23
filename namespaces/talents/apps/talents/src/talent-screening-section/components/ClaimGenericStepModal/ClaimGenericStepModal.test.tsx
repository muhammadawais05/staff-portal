import React, { ReactNode, ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useQuery } from '@staff-portal/data-layer-service'
import { RoleStepMainActions } from '@staff-portal/graphql/staff'
import { ModalSuspender } from '@staff-portal/modals-service'

import ClaimGenericStepModalContent from './components/ClaimGenericStepModalContent/ClaimGenericStepModalContent'
import ClaimGenericStepModal from './ClaimGenericStepModal'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  Modal: ({ children }: { children: ReactNode }) => <>{children}</>,
  ModalSuspender: jest.fn()
}))
jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  useQuery: jest.fn()
}))
jest.mock(
  './components/ClaimGenericStepModalContent/ClaimGenericStepModalContent',
  () => ({
    __esModule: true,
    default: jest.fn()
  })
)

const useQueryMock = useQuery as jest.Mock
const ModalSuspenderMock = ModalSuspender as unknown as jest.Mock
const ClaimGenericStepModalContentMock =
  ClaimGenericStepModalContent as jest.Mock

const renderComponent = (
  props?: Partial<
    Pick<
      ComponentProps<typeof ClaimGenericStepModal>,
      'hideModal' | 'onSuccess'
    >
  >
) => {
  const hideModal = props?.hideModal ?? jest.fn()
  const onSuccess = props?.onSuccess ?? jest.fn()

  return render(
    <TestWrapper>
      <ClaimGenericStepModal
        talentId='talent-id'
        roleStepId='role-id'
        hideModal={hideModal}
        onSuccess={onSuccess}
      />
    </TestWrapper>
  )
}

describe('ClaimGenericStepModal', () => {
  beforeEach(() => {
    ModalSuspenderMock.mockReturnValue(null)
    ClaimGenericStepModalContentMock.mockReturnValue(null)
  })

  describe('when `useQuery` returns data', () => {
    it('renders modal content', () => {
      const hideModal = jest.fn()
      const onSuccess = jest.fn()

      useQueryMock.mockReturnValue({
        data: {
          node: {
            id: '123',
            mainAction: {
              actionName: RoleStepMainActions.CLAIM_ROLE_STEP
            },
            step: {
              id: '234',
              title: 'Work Hours Details'
            },
            talent: {
              id: '345',
              fullName: 'Andrei Mocanu',
              talentPartner: null
            }
          }
        },
        initialLoading: false
      })

      renderComponent({ hideModal, onSuccess })

      expect(ModalSuspenderMock).not.toHaveBeenCalled()
      expect(ClaimGenericStepModalContentMock).toHaveBeenCalledWith(
        expect.objectContaining({
          hideModal,
          onSuccess,
          actionName: RoleStepMainActions.CLAIM_ROLE_STEP,
          roleStepId: 'role-id',
          stepTitle: 'Work Hours Details',
          talentId: 'talent-id',
          message:
            'Are you sure you want to claim the Work Hours Details step for Andrei Mocanu?'
        }),
        {}
      )
    })
  })

  describe('when `useQuery` returns no data', () => {
    it('renders nothing', () => {
      useQueryMock.mockReturnValue({
        data: undefined,
        initialLoading: false
      })

      renderComponent()

      expect(ModalSuspenderMock).not.toHaveBeenCalled()
      expect(ClaimGenericStepModalContentMock).not.toHaveBeenCalled()
    })
  })

  describe('when `useQuery` returns `initialLoading` equals `true`', () => {
    it('renders modal skeleton', () => {
      useQueryMock.mockReturnValue({
        data: undefined,
        initialLoading: true
      })

      renderComponent()

      expect(ModalSuspenderMock).toHaveBeenCalledTimes(1)
      expect(ClaimGenericStepModalContentMock).not.toHaveBeenCalled()
    })
  })
})
