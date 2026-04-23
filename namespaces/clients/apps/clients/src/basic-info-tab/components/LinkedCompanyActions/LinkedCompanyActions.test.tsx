import { render } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { isOperationHidden, OperationFragment } from '@staff-portal/operations'
import { NegotiationStatus } from '@staff-portal/graphql/staff'
import { MoreButton } from '@staff-portal/ui'

import {
  ImportSTAMenuItem,
  StartNegotiationMenuItem,
  SuspendNegotiationMenuItem,
  UpdateNegotiationStatusMenuItem
} from '../../../modals'
import { LinkedCompanyNodeFragment } from '../LinkedCompaniesSection/data'
import LinkedCompanyActions from './LinkedCompanyActions'

const renderComponent = (company: LinkedCompanyNodeFragment) =>
  render(
    <TestWrapper>
      <LinkedCompanyActions company={company} />
    </TestWrapper>
  )

jest.mock('@staff-portal/ui', () => ({
  ...jest.requireActual('@staff-portal/ui'),
  MoreButton: jest.fn()
}))

jest.mock('@staff-portal/operations', () => ({
  ...jest.requireActual('@staff-portal/operations'),
  isOperationHidden: jest.fn()
}))

const mockedMoreButton = MoreButton as jest.Mock
const mockedIsOperationHidden = isOperationHidden as jest.Mock

describe('LinkedCompanyActions', () => {
  beforeEach(() => {
    mockedMoreButton.mockReturnValue(null)
    mockedIsOperationHidden.mockReturnValue(false)
  })

  it('isOperationHidden is being called with correct arguments', () => {
    const company = {
      currentNegotiation: {
        id: 'id',
        operations: {
          updateNegotiationStatus:
            'updateNegotiationStatus' as unknown as OperationFragment,
          suspendNegotiation:
            'suspendNegotiation' as unknown as OperationFragment
        }
      },
      operations: {
        importSTA: 'importSTA' as unknown as OperationFragment,
        startNegotiationForClient:
          'startNegotiationForClient' as unknown as OperationFragment
      }
    } as LinkedCompanyNodeFragment

    mockedIsOperationHidden.mockReturnValue(true)

    renderComponent(company)

    expect(mockedIsOperationHidden).toHaveBeenCalledTimes(4)
    expect(mockedIsOperationHidden).toHaveBeenNthCalledWith(
      1,
      company.operations.importSTA
    )
    expect(mockedIsOperationHidden).toHaveBeenNthCalledWith(
      2,
      company.operations.startNegotiationForClient
    )
    expect(mockedIsOperationHidden).toHaveBeenNthCalledWith(
      3,
      company?.currentNegotiation?.operations.updateNegotiationStatus
    )
    expect(mockedIsOperationHidden).toHaveBeenNthCalledWith(
      4,
      company?.currentNegotiation?.operations.suspendNegotiation
    )
  })

  it('renders inner components correctly', () => {
    const company = {
      id: '1',
      fullName: 'name',
      currentNegotiation: {
        id: 'n1',
        status: 'status' as NegotiationStatus,
        operations: {
          updateNegotiationStatus:
            'updateNegotiationStatus' as unknown as OperationFragment,
          suspendNegotiation:
            'suspendNegotiation' as unknown as OperationFragment
        }
      },
      operations: {
        importSTA: 'importSTA' as unknown as OperationFragment,
        startNegotiationForClient:
          'startNegotiationForClient' as unknown as OperationFragment
      }
    } as LinkedCompanyNodeFragment

    renderComponent(company)

    expect(mockedMoreButton).toHaveBeenCalledWith(
      expect.objectContaining({
        hidden: false,
        children: [
          expect.objectContaining({
            type: ImportSTAMenuItem,
            props: {
              companyId: company.id,
              operation: company.operations.importSTA
            }
          }),
          expect.objectContaining({
            type: StartNegotiationMenuItem,
            props: {
              companyId: company.id,
              companyName: company.fullName,
              operation: company.operations.startNegotiationForClient
            }
          }),
          expect.objectContaining({
            type: UpdateNegotiationStatusMenuItem,
            props: {
              companyName: company.fullName,
              operation:
                company?.currentNegotiation?.operations.updateNegotiationStatus,
              negotiationId: company.currentNegotiation?.id,
              negotiationStatus: company.currentNegotiation?.status
            }
          }),
          expect.objectContaining({
            type: SuspendNegotiationMenuItem,
            props: {
              companyName: company.fullName,
              operation:
                company?.currentNegotiation?.operations.suspendNegotiation,
              negotiationId: company.currentNegotiation?.id
            }
          })
        ]
      }),
      {}
    )
  })
})
