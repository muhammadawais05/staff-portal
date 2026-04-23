import React, { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { Operation } from '@staff-portal/operations'
import { Button } from '@toptal/picasso'
import { ActionLoader } from '@staff-portal/ui'
import { useQuery } from '@staff-portal/data-layer-service'
import { useModal } from '@staff-portal/modals-service'

import InviteNewStaffButton from './InviteNewStaffButton'

jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  useQuery: jest.fn()
}))
jest.mock('@staff-portal/modals-service', () => ({
  useModal: jest.fn()
}))
jest.mock('@staff-portal/operations', () => ({
  Operation: jest.fn()
}))
jest.mock('@toptal/picasso', () => ({
  Button: jest.fn()
}))
jest.mock('@staff-portal/editable', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('@staff-portal/forms', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('@staff-portal/ui', () => ({
  ActionLoader: jest.fn()
}))
jest.mock('../InviteNewStaffModal/InviteNewStaffModal', () => ({
  __esModule: true,
  default: () => null
}))

const useModalMock = useModal as jest.Mock
const ActionLoaderMock = ActionLoader as jest.Mock
const ButtonMock = Button as unknown as jest.Mock
const OperationMock = Operation as jest.Mock
const useQueryMock = useQuery as jest.Mock
const showModal = jest.fn()

describe('InviteNewStaffButton', () => {
  beforeEach(() => {
    useModalMock.mockReturnValue({ showModal })
  })

  describe('when `useQuery` hook returns `loading` equals `true`', () => {
    it('renders loader', () => {
      useQueryMock.mockReturnValue({ loading: true })
      ActionLoaderMock.mockReturnValue(null)

      render(<InviteNewStaffButton />)

      expect(ActionLoaderMock).toHaveBeenCalledTimes(1)
      expect(OperationMock).toHaveBeenCalledTimes(0)
    })
  })

  describe('when `useQuery` hook returns `loading` equals `false` & there is no `data`', () => {
    it('renders nothing', () => {
      useQueryMock.mockReturnValue({ loading: false })

      render(<InviteNewStaffButton />)

      expect(ActionLoaderMock).toHaveBeenCalledTimes(0)
      expect(OperationMock).toHaveBeenCalledTimes(0)
    })
  })

  describe('when `useQuery` hook returns `data`', () => {
    it('calls query and renders button with expected props passed', () => {
      const data = { operations: { inviteStaff: {} } }

      ButtonMock.mockImplementation(({ children }) => <>{children}</>)
      OperationMock.mockImplementation(
        ({ render: renderChildren }: { render: () => ReactElement }) =>
          renderChildren()
      )
      useQueryMock.mockReturnValue({ loading: false, data })

      render(<InviteNewStaffButton />)

      expect(ActionLoaderMock).toHaveBeenCalledTimes(0)
      expect(OperationMock).toHaveBeenCalledTimes(1)
      expect(OperationMock).toHaveBeenCalledWith(
        expect.objectContaining({
          operation: data.operations.inviteStaff
        }),
        {}
      )

      expect(ButtonMock).toHaveBeenCalledTimes(1)
      expect(ButtonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          onClick: showModal,
          children: 'Invite New Staff'
        }),
        {}
      )
    })
  })
})
