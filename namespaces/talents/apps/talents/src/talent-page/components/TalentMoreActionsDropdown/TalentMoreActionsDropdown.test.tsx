import React from 'react'
import { render } from '@testing-library/react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { TalentFragment } from '@staff-portal/talents'
import { createTalentFragmentMock } from '@staff-portal/talents/src/mocks'
import { createOperationMock } from '@staff-portal/operations/src/mocks'
import { ActionsDropdown } from '@staff-portal/facilities'
import { NodeType } from '@staff-portal/graphql'

import TalentMoreActionsDropdown from './TalentMoreActionsDropdown'

jest.mock('@staff-portal/facilities', () => {
  const ActionsDropdownMock = jest.fn() as unknown as {
    LinkItem: Function
    MenuItem: Function
    LazyMenuItem: Function
    ModalItem: Function
  }

  ActionsDropdownMock.LinkItem = jest.fn()
  ActionsDropdownMock.MenuItem = jest.fn()
  ActionsDropdownMock.LazyMenuItem = jest.fn()
  ActionsDropdownMock.ModalItem = jest.fn()

  return {
    ...jest.requireActual('@staff-portal/facilities'),
    ActionsDropdown: ActionsDropdownMock,
    useLoginAs: () => ({
      loginAs: () => null
    })
  }
})

const ActionsDropdownMock = ActionsDropdown as unknown as jest.Mock
const ActionsDropdownLinkItemMock = ActionsDropdown.LinkItem as jest.Mock
const ActionsDropdownMenuItemMock = ActionsDropdown.MenuItem as jest.Mock
const ActionsDropdownLazyMenuItemMock =
  ActionsDropdown.LazyMenuItem as jest.Mock
const ActionsDropdownModalItemMock = ActionsDropdown.ModalItem as jest.Mock

const arrangeTest = (
  talentPartial: Partial<TalentFragment> = {},
  operations = {},
  mocks: MockedResponse[] = []
) => {
  const talent = createTalentFragmentMock(talentPartial) as TalentFragment

  talent.operations = { ...talent.operations, ...operations }

  ActionsDropdownMock.mockImplementation(({ children }) => children)
  ActionsDropdownLinkItemMock.mockReturnValue(null)
  ActionsDropdownMenuItemMock.mockReturnValue(null)
  ActionsDropdownLazyMenuItemMock.mockReturnValue(null)
  ActionsDropdownModalItemMock.mockReturnValue(null)

  return render(
    <TestWrapperWithMocks mocks={mocks}>
      <TalentMoreActionsDropdown talent={talent} talentLegacyId='123' />
    </TestWrapperWithMocks>
  )
}

describe('TalentMoreActionsDropdown', () => {
  it('renders link items with the correct data', () => {
    const gdprReportUrl = 'https://domain.com/gdpr-report-url'
    const emailMessagesUrl = 'https://domain.com/email-messages-url'
    const referralsUrl = 'https://domain.com/referrals-url'

    arrangeTest({
      gdprReportUrl,
      emailMessagesUrl,
      referralsUrl
    })

    expect(ActionsDropdownMock).toHaveBeenCalledTimes(1)
    expect(ActionsDropdownMock).toHaveBeenCalledWith(
      expect.objectContaining({
        disablePopper: true,
        fullHeight: true
      }),
      {}
    )

    expect(ActionsDropdownLinkItemMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        children: 'Edit Details',
        href: '/talents/123/edit'
      }),
      {}
    )
    expect(ActionsDropdownLinkItemMock).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        children: 'Talent Profile',
        href: 'https://domain.com/profile-editor-url'
      }),
      {}
    )
    expect(ActionsDropdownLinkItemMock).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        children: 'Communication',
        href: 'https://domain.com/email-messages-url'
      }),
      {}
    )
    expect(ActionsDropdownLinkItemMock).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        children: 'Referred Users',
        href: 'https://domain.com/referrals-url'
      }),
      {}
    )
    expect(ActionsDropdownLinkItemMock).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({
        children: 'Workflows',
        href: 'https://domain.com/default/cases/url',
        newWindow: true
      }),
      {}
    )
    expect(ActionsDropdownLinkItemMock).toHaveBeenNthCalledWith(
      6,
      expect.objectContaining({
        children: 'Payments',
        disabled: true,
        disabledText: 'This Project Manager does not have any payments',
        href: '/payments?badges%5Bpayee_ids%5D%5B%5D=123'
      }),
      {}
    )
    expect(ActionsDropdownLinkItemMock).toHaveBeenNthCalledWith(
      7,
      expect.objectContaining({
        children: 'GDPR Report',
        href: 'https://domain.com/gdpr-report-url'
      }),
      {}
    )
  })

  it('renders menu items with the correct data', () => {
    const emailMessaging = {
      id: '234',
      operations: {
        sendEmailTo: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      }
    }

    arrangeTest(
      {
        emailMessaging
      },
      {
        resetRejectedTalentApplication: createOperationMock(),
        removeTalent: createOperationMock(),
        reactivateTalent: createOperationMock(),
        processGdprRemovalTalent: createOperationMock(),
        createTalentAvailabilityRequest: createOperationMock(),
        loginAs: createOperationMock(),
        resumeTalentApplication: createOperationMock()
      }
    )

    expect(ActionsDropdownMenuItemMock).toHaveBeenCalledTimes(4)

    expect(ActionsDropdownMenuItemMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        children: 'Reset Application',
        operation: createOperationMock()
      }),
      {}
    )
    expect(ActionsDropdownMenuItemMock).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        children: 'Send Email',
        operation: { callable: OperationCallableTypes.ENABLED, messages: [] }
      }),
      {}
    )
    expect(ActionsDropdownMenuItemMock).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        children: 'Login as this Project Manager',
        operation: createOperationMock()
      }),
      {}
    )
    expect(ActionsDropdownMenuItemMock).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        children: 'Exceptional Restoration',
        operation: createOperationMock()
      }),
      {}
    )
  })

  it('renders modal items with the correct data', () => {
    const TALENT_ID = 'VjEtVGFsZW50LTE4NTc0NTU'

    arrangeTest(
      {},
      {
        convertToSourcingFlow: createOperationMock(),
        pauseTalent: createOperationMock(),
        createTalentAvailabilityRequest: createOperationMock(),
        removeTalent: createOperationMock(),
        reactivateTalent: createOperationMock(),
        importTalentContract: createOperationMock(),
        createPaymentHold: createOperationMock(),
        removePaymentHold: createOperationMock(),
        downloadRolePaymentHistory: createOperationMock()
      }
    )

    expect(ActionsDropdownModalItemMock).toHaveBeenCalledTimes(11)

    expect(ActionsDropdownModalItemMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        children: 'Convert to Sourcing Flow',
        modalProps: { talentId: TALENT_ID },
        operation: createOperationMock()
      }),
      {}
    )
    expect(ActionsDropdownModalItemMock).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        children: 'Reject Application',
        modalProps: {
          talentId: TALENT_ID,
          specializationApplicationId: '234'
        },
        operation: createOperationMock()
      }),
      {}
    )
    expect(ActionsDropdownModalItemMock).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        children: 'Pause Application',
        modalProps: { talentId: TALENT_ID },
        operation: createOperationMock()
      }),
      {}
    )
    expect(ActionsDropdownModalItemMock).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        children: 'Request Availability',
        modalProps: {
          talentId: TALENT_ID
        },
        operation: createOperationMock()
      }),
      {}
    )
    expect(ActionsDropdownModalItemMock).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({
        children: 'Deactivate Project Manager',
        modalProps: {
          talentId: TALENT_ID,
          fullName: 'Jon Doe',
          talentType: 'Project Manager'
        },
        operation: createOperationMock()
      }),
      {}
    )
    expect(ActionsDropdownModalItemMock).toHaveBeenNthCalledWith(
      6,
      expect.objectContaining({
        children: 'Restore Project Manager',
        modalProps: {
          talentId: TALENT_ID,
          fullName: 'Jon Doe',
          talentType: 'Project Manager'
        },
        operation: createOperationMock()
      }),
      {}
    )
    expect(ActionsDropdownModalItemMock).toHaveBeenNthCalledWith(
      7,
      expect.objectContaining({
        children: 'Import Contract',
        modalProps: {
          talentId: TALENT_ID
        },
        operation: createOperationMock()
      }),
      {}
    )
    expect(ActionsDropdownModalItemMock).toHaveBeenNthCalledWith(
      8,
      expect.objectContaining({
        children: 'Hold Payments',
        modalProps: {
          talentId: TALENT_ID,
          fullName: 'Jon Doe',
          paymentsHoldDescription: undefined
        },
        operation: createOperationMock()
      }),
      {}
    )
    expect(ActionsDropdownModalItemMock).toHaveBeenNthCalledWith(
      9,
      expect.objectContaining({
        children: 'Remove Hold on Payments',
        modalProps: {
          fullName: 'Jon Doe',
          talentId: TALENT_ID
        },
        operation: createOperationMock()
      }),
      {}
    )
    expect(ActionsDropdownModalItemMock).toHaveBeenNthCalledWith(
      10,
      expect.objectContaining({
        children: 'Payment History',
        modalProps: {
          nodeId: TALENT_ID,
          nodeType: NodeType.TALENT,
          successMessageEmitOptions: {
            payload: { talentId: TALENT_ID },
            type: {
              metaData: undefined
            }
          }
        },
        operation: createOperationMock()
      }),
      {}
    )
    expect(ActionsDropdownModalItemMock).toHaveBeenNthCalledWith(
      11,
      expect.objectContaining({
        children: 'GDPR Remove Data',
        modalProps: {
          talentId: TALENT_ID
        },
        operation: createOperationMock()
      }),
      {}
    )
  })

  it('renders lazy menu items with the correct data', () => {
    const NODE_ID = 'VjEtVGFsZW50LTE4NTc0NTU'

    arrangeTest(
      {},
      {
        createTalentInfraction: createOperationMock(),
        convertOnboardingTalent: createOperationMock(),
        convertTalent: createOperationMock(),
        setHealthStatusTalent: createOperationMock(),
        downloadTalentIpHistory: createOperationMock(),
        applyTalentToAnotherVertical: createOperationMock()
      }
    )

    expect(ActionsDropdownLazyMenuItemMock).toHaveBeenCalledTimes(6)

    expect(ActionsDropdownLazyMenuItemMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        children: 'Add Infraction',
        operationVariables: {
          nodeId: NODE_ID,
          nodeType: NodeType.TALENT,
          operationName: 'createTalentInfraction'
        },
        operation: createOperationMock()
      }),
      {}
    )
    expect(ActionsDropdownLazyMenuItemMock).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        children: 'Convert to...',
        operationVariables: {
          nodeId: NODE_ID,
          nodeType: NodeType.TALENT,
          operationName: 'convertOnboardingTalent'
        },
        operation: createOperationMock()
      }),
      {}
    )
    expect(ActionsDropdownLazyMenuItemMock).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        children: 'Convert to...',
        operationVariables: {
          nodeId: NODE_ID,
          nodeType: NodeType.TALENT,
          operationName: 'convertTalent'
        },
        operation: createOperationMock()
      }),
      {}
    )
    expect(ActionsDropdownLazyMenuItemMock).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        children: 'Talent Health Status',
        operationVariables: {
          nodeId: NODE_ID,
          nodeType: NodeType.TALENT,
          operationName: 'setHealthStatusTalent'
        },
        operation: createOperationMock()
      }),
      {}
    )
    expect(ActionsDropdownLazyMenuItemMock).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({
        children: 'Download IP History',
        operationVariables: {
          nodeId: NODE_ID,
          nodeType: NodeType.TALENT,
          operationName: 'downloadTalentIpHistory'
        },
        operation: createOperationMock()
      }),
      {}
    )
    expect(ActionsDropdownLazyMenuItemMock).toHaveBeenNthCalledWith(
      6,
      expect.objectContaining({
        children: 'Apply to Different Vertical',
        operationVariables: {
          nodeId: NODE_ID,
          nodeType: NodeType.TALENT,
          operationName: 'applyTalentToAnotherVertical'
        },
        operation: createOperationMock()
      }),
      {}
    )
  })
})
