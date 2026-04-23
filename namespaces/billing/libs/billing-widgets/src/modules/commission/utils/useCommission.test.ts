import { act, renderHook } from '@testing-library/react-hooks'
import { SyntheticEvent } from 'react'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'
import { ModalKey } from '@staff-portal/billing/src/@types/types'

import { useCommission } from '.'

jest.mock('@staff-portal/billing/src/_lib/customHooks/useModals')

const mockReferrerAction = (value: string) =>
  ({
    currentTarget: { dataset: { value } }
  } as unknown as SyntheticEvent<HTMLInputElement>)

const mockHandleOnOpenModal = jest.fn()

;(useModals as jest.Mock).mockReturnValue({
  handleOnOpenModal: mockHandleOnOpenModal
})

const clientId = 'VjEtQ2xpZW50LTQ5MTAyMw'

describe('useCommission', () => {
  describe('#handleOnActionClick', () => {
    describe('when the action is `referrer`', () => {
      beforeEach(() => {
        const { result } = renderHook(() => useCommission(clientId))

        act(() =>
          result.current.handleOnActionClick(
            mockReferrerAction(ModalKey.changeRoleReferrer)
          )
        )
      })

      it('triggers the Change Referrer modal', () => {
        expect(mockHandleOnOpenModal).toHaveBeenCalledWith(
          ModalKey.changeRoleReferrer,
          {
            nodeId: '491023',
            nodeType: 'client'
          }
        )
      })
    })

    describe('when the action is `claimer`', () => {
      beforeEach(() => {
        const { result } = renderHook(() => useCommission(clientId))

        act(() =>
          result.current.handleOnActionClick(
            mockReferrerAction(ModalKey.clientClaimerUpdate)
          )
        )
      })

      it('triggers the Update Claimer modal', () => {
        expect(mockHandleOnOpenModal).toHaveBeenCalledWith(
          ModalKey.clientClaimerUpdate,
          {
            nodeId: '491023',
            nodeType: 'client'
          }
        )
      })
    })
  })
})
