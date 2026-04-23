import React from 'react'
import { Menu } from '@toptal/picasso'
import { render } from '@toptal/picasso/test-utils'
import { MenuLink } from '@staff-portal/ui'
import { useModal } from '@staff-portal/modals-service'
import { TaskCardLayout } from '@staff-portal/tasks'
import { Operation } from '@staff-portal/operations'
import { InviteToLoginModalItem } from '@staff-portal/client-representatives'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import {
  useMarkAsBadLeadModal,
  useDeleteApplicationModal,
  PauseClientItem,
  ResumeCompanyItem,
  RepauseCompanyItem,
  BlackFlagClientItem
} from '@staff-portal/clients'

import { TaskCardCompanyFragment } from '../../data/company-task-card-fragment/company-task-card-fragment.staff.gql.types'
import QuestionAndAnswersModal from '../QuestionAndAnswersModal'
import CompanyTaskCardMoreActions from '.'

jest.mock('../QuestionAndAnswersModal')
jest.mock('@staff-portal/operations', () => ({
  ...jest.requireActual('@staff-portal/operations'),
  Operation: jest.fn()
}))
jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))
jest.mock('@staff-portal/tasks', () => ({
  ...jest.requireActual('@staff-portal/tasks'),
  __esModule: true,
  TaskCardLayout: {
    MoreButton: jest.fn()
  }
}))
jest.mock('@staff-portal/clients', () => ({
  PauseClientItem: jest.fn(),
  ResumeCompanyItem: jest.fn(),
  RepauseCompanyItem: jest.fn(),
  BlackFlagClientItem: jest.fn(),
  useMarkAsBadLeadModal: jest.fn(),
  useDeleteApplicationModal: jest.fn()
}))
jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Menu: {
    Item: jest.fn()
  }
}))
jest.mock('@staff-portal/client-representatives', () => ({
  ...jest.requireActual('@staff-portal/client-representatives'),
  InviteToLoginModalItem: jest.fn()
}))

const useModalMock = useModal as jest.Mock
const InviteToLoginModalItemMock = InviteToLoginModalItem as jest.Mock
const useMarkAsBadLeadModalMock = useMarkAsBadLeadModal as jest.Mock
const useDeleteApplicationModalMock = useDeleteApplicationModal as jest.Mock
const PauseClientItemMock = PauseClientItem as jest.Mock
const ResumeCompanyItemMock = ResumeCompanyItem as jest.Mock
const RepauseCompanyItemMock = RepauseCompanyItem as jest.Mock
const BlackFlagClientItemMock = BlackFlagClientItem as jest.Mock
const TaskCardLayoutMoreButton = TaskCardLayout.MoreButton as jest.Mock
const OperationMock = Operation as unknown as jest.Mock
const MenuItemMock = Menu.Item as jest.Mock
const showModalMock = jest.fn()
const showMarkAsBadLeadModalMock = jest.fn()
const showDeleteApplicationModalMock = jest.fn()

const clientIdMock = encodeEntityId('123', 'Client')

const clientMock = {
  id: clientIdMock,
  fullName: Symbol(),
  operations: {
    markClientAsBadLead: Symbol(),
    resumeClient: Symbol(),
    pauseClient: Symbol(),
    repauseClient: Symbol(),
    updateProfileClient: Symbol(),
    blackFlagClient: Symbol(),
    rejectClient: Symbol()
  },
  updateProfileUrl: Symbol(),
  contact: {
    operations: {
      inviteToLoginCompanyRepresentative: Symbol()
    }
  }
} as unknown as TaskCardCompanyFragment

const renderComponent = (company: TaskCardCompanyFragment) => {
  render(<CompanyTaskCardMoreActions company={company} />)
}

describe('CompanyTaskCardMoreActions', () => {
  beforeEach(() => {
    InviteToLoginModalItemMock.mockReturnValue(null)
    PauseClientItemMock.mockReturnValue(null)
    ResumeCompanyItemMock.mockReturnValue(null)
    RepauseCompanyItemMock.mockReturnValue(null)
    BlackFlagClientItemMock.mockReturnValue(null)
    MenuItemMock.mockReturnValue(null)

    useModalMock.mockReturnValue({
      showModal: showModalMock
    })
    useMarkAsBadLeadModalMock.mockReturnValue({
      showModal: showMarkAsBadLeadModalMock
    })
    useDeleteApplicationModalMock.mockReturnValue({
      showModal: showDeleteApplicationModalMock
    })

    OperationMock.mockImplementation(({ children }) => children)
    TaskCardLayoutMoreButton.mockImplementation(({ children }) => (
      <>{children}</>
    ))
  })

  it('default render', () => {
    renderComponent(clientMock)

    expect(useModalMock).toHaveBeenNthCalledWith(1, QuestionAndAnswersModal, {
      companyId: clientIdMock
    })

    expect(useMarkAsBadLeadModalMock).toHaveBeenCalledWith({
      clientId: clientIdMock
    })

    expect(useDeleteApplicationModalMock).toHaveBeenCalledWith({
      clientId: clientIdMock
    })

    expect(MenuItemMock).toHaveBeenNthCalledWith(
      1,
      { onClick: showModalMock, children: 'Q&A' },
      {}
    )

    expect(ResumeCompanyItemMock).toHaveBeenCalledWith(
      {
        componentType: 'menu-item',
        companyId: clientIdMock,
        operation: clientMock.operations.resumeClient
      },
      {}
    )

    expect(RepauseCompanyItemMock).toHaveBeenCalledWith(
      {
        componentType: 'menu-item',
        companyId: clientIdMock,
        operation: clientMock.operations.repauseClient
      },
      {}
    )

    expect(OperationMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        operation: clientMock.operations.markClientAsBadLead
      }),
      {}
    )
    expect(MenuItemMock).toHaveBeenNthCalledWith(
      2,
      {
        titleCase: false,
        disabled: false,
        onClick: showMarkAsBadLeadModalMock,
        children: 'Mark as Bad Lead'
      },
      {}
    )

    expect(OperationMock).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        operation: clientMock.operations.updateProfileClient
      }),
      {}
    )
    expect(MenuItemMock).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        as: MenuLink,
        href: clientMock.updateProfileUrl,
        disabled: false,
        children: 'Edit Profile'
      }),
      {}
    )

    expect(InviteToLoginModalItemMock).toHaveBeenCalledWith(
      {
        contact: clientMock.contact,
        operation:
          clientMock.contact?.operations.inviteToLoginCompanyRepresentative
      },
      {}
    )

    expect(BlackFlagClientItemMock).toHaveBeenCalledWith(
      {
        clientId: clientIdMock,
        companyName: clientMock.fullName,
        operation: clientMock.operations.blackFlagClient
      },
      {}
    )

    expect(PauseClientItemMock).toHaveBeenCalledWith(
      {
        clientId: clientIdMock,
        operation: clientMock.operations.pauseClient
      },
      {}
    )

    expect(OperationMock).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        operation: clientMock.operations.rejectClient
      }),
      {}
    )
    expect(MenuItemMock).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        onClick: showDeleteApplicationModalMock,
        disabled: false,
        children: 'Delete Application'
      }),
      {}
    )
  })

  it('does not render invite to login menu item if contact is missing', () => {
    renderComponent({
      ...clientMock,
      contact: undefined
    })

    expect(InviteToLoginModalItemMock).not.toHaveBeenCalled()
  })

  it('does not render Edit Profile menu item if updateProfileUrl is missing', () => {
    renderComponent({
      ...clientMock,
      updateProfileUrl: undefined
    })

    expect(MenuItemMock).not.toHaveBeenCalledWith(
      expect.objectContaining({
        children: 'Edit Profile'
      }),
      {}
    )
  })
})
