import React from 'react'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { createMemoryHistory } from 'history'
import { Router } from '@staff-portal/navigation'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import {
  useGetCompanyRepresentative,
  RepresentativeForm
} from '@staff-portal/client-representatives'
import { RoleAvatarEditor } from '@staff-portal/role-profile'
import { isOperationHidden } from '@staff-portal/operations'

import EditCompanyRepresentative from './EditRepresentative'
import { useGetEditCompanyRepresentativeParams } from './hooks/use-get-edit-company-representative-params'

const mockNavigate = jest.fn()

jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  useNavigate: () => mockNavigate
}))
jest.mock('@staff-portal/operations', () => ({
  ...jest.requireActual('@staff-portal/operations'),
  isOperationHidden: jest.fn()
}))

jest.mock('./hooks/use-get-edit-company-representative-params')
jest.mock('@staff-portal/client-representatives', () => ({
  useGetCompanyRepresentative: jest.fn(),
  RepresentativeForm: jest.fn()
}))

jest.mock('@staff-portal/role-profile', () => ({
  ...jest.requireActual('@staff-portal/role-profile'),
  RoleAvatarEditor: jest.fn()
}))

const mockUseGetEditCompanyRepresentativeParams =
  useGetEditCompanyRepresentativeParams as jest.Mock
const mockUseGetCompanyRepresentative = useGetCompanyRepresentative as jest.Mock
const RoleAvatarEditorMock = RoleAvatarEditor as jest.Mock
const RepresentativeFormMock = RepresentativeForm as jest.Mock
const isOperationHiddenMock = isOperationHidden as jest.Mock

const renderComponent = () => {
  const history = createMemoryHistory({ initialEntries: ['testpath'] })

  render(
    <Router history={history}>
      <TestWrapperWithMocks>
        <EditCompanyRepresentative />
      </TestWrapperWithMocks>
    </Router>
  )
}

const MOCK_REPRESENTATIVE_ID = 'mock_representative_id'
const MOCK_UPDATE_PROFILE_PHOTO = Symbol()
const MOCK_REPRESENTATIVE = {
  fullName: 'Otto Meier',
  id: MOCK_REPRESENTATIVE_ID,
  webResource: {
    text: 'linktext',
    url: 'https://the.representative.url'
  },
  operations: {
    updateRolePhoto: MOCK_UPDATE_PROFILE_PHOTO
  }
} as const

describe('EditCompanyRepresentative', () => {
  beforeEach(() => {
    mockUseGetEditCompanyRepresentativeParams.mockReturnValue({
      representativeId: MOCK_REPRESENTATIVE_ID
    })

    RoleAvatarEditorMock.mockReturnValue(null)
    RepresentativeFormMock.mockReturnValue(null)

    mockUseGetCompanyRepresentative.mockReturnValue({
      representative: MOCK_REPRESENTATIVE
    })
  })

  it('fetches representative with encoded ID passed in URL', () => {
    renderComponent()

    expect(mockUseGetCompanyRepresentative).toHaveBeenCalledWith({
      representativeId: MOCK_REPRESENTATIVE_ID
    })
  })

  describe('onClose', () => {
    beforeEach(() => {
      RepresentativeFormMock.mockImplementation(
        ({ onClose }: { onClose: () => void }) => (
          <button onClick={onClose}>test-onClose</button>
        )
      )
    })

    it("navigates to return path when it's there", () => {
      mockUseGetEditCompanyRepresentativeParams.mockReturnValue({
        returnPath: '/back/to/client'
      })
      renderComponent()
      fireEvent.click(screen.getByText('test-onClose'))

      expect(mockNavigate).toHaveBeenCalledTimes(1)
      expect(mockNavigate).toHaveBeenCalledWith('/back/to/client')
    })

    it('navigates back to representative page when there is no return path', () => {
      mockUseGetEditCompanyRepresentativeParams.mockReturnValue({})
      renderComponent()
      fireEvent.click(screen.getByText('test-onClose'))

      expect(mockNavigate).toHaveBeenCalledTimes(1)
      expect(mockNavigate).toHaveBeenCalledWith(
        'https://the.representative.url'
      )
    })
  })

  it('renders correct title', () => {
    renderComponent()

    expect(screen.getByTestId('content-title')).toHaveTextContent(
      'Profile of Otto Meier'
    )
  })

  it('links representative name', () => {
    renderComponent()

    expect(screen.getByText('Otto Meier').closest('a')).toHaveAttribute(
      'href',
      'https://the.representative.url'
    )
  })

  describe('when user has permissions to see the update profile photo', () => {
    it('renders avatar editor', () => {
      isOperationHiddenMock.mockReturnValue(false)

      renderComponent()

      expect(screen.getByText('Profile Image')).toBeInTheDocument()
      expect(isOperationHiddenMock).toHaveBeenCalledWith(
        MOCK_UPDATE_PROFILE_PHOTO
      )
      expect(RoleAvatarEditorMock).toHaveBeenCalledWith(
        {
          roleId: MOCK_REPRESENTATIVE_ID,
          roleType: 'COMPANY_REPRESENTATIVE'
        },
        {}
      )
    })
  })

  describe('when user does not have permissions to see the update profile photo', () => {
    it('does not render avatar editor', () => {
      isOperationHiddenMock.mockReturnValue(true)

      renderComponent()

      expect(isOperationHiddenMock).toHaveBeenCalledWith(
        MOCK_UPDATE_PROFILE_PHOTO
      )
      expect(screen.queryByText('Profile Image')).not.toBeInTheDocument()
      expect(RoleAvatarEditorMock).not.toHaveBeenCalled()
    })
  })

  it('passes representative to RepresentativeForm', () => {
    renderComponent()

    const expectedProps = {
      clientIdOrRepresentative: MOCK_REPRESENTATIVE
    }

    expect(RepresentativeFormMock).toHaveBeenCalledWith(
      expect.objectContaining(expectedProps),
      expect.anything()
    )
  })
})
