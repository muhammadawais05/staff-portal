import { renderHook } from '@testing-library/react-hooks'
import {
  ClientCumulativeStatus,
  BusinessTypes,
  RoleV2Scope
} from '@staff-portal/graphql/staff'
import { DetailedListItem } from '@staff-portal/ui'
import { EditableStaffTransferButton } from '@staff-portal/staff'

import {
  EditableStaffClient,
  PartnerCategory,
  ClaimerCategory,
  ClientPartner,
  FinanceTeamMember
} from '../components/InternalTeam/components'
import { useGetInternalTeamItems } from './use-get-internal-team-items'
import { useGetClientMatcherFields } from '../components/InternalTeam/utils'
import { InternalTeamFragment } from '../data'
import { internalTeamFragmentMock } from '../data/internal-team-fragment.mock'

jest.mock('../components/InternalTeam/utils', () => ({
  ...jest.requireActual('../components/InternalTeam/utils'),
  useGetClientMatcherFields: jest.fn()
}))

const useGetClientMatcherFieldsMock = useGetClientMatcherFields as jest.Mock

const arrangeTest = (params: Partial<InternalTeamFragment> = {}) => {
  useGetClientMatcherFieldsMock.mockReturnValue([])
  const { result } = renderHook(() =>
    useGetInternalTeamItems({
      data: {
        ...internalTeamFragmentMock,
        ...params
      }
    })
  )

  return result.current
}

const getLabels = (items: DetailedListItem[][]) =>
  items
    .map(list => list.map(el => el.label?.toString() || ''))
    .reduce((prev, cur) => [...prev, ...cur])

describe('useGetInternalTeamItems', () => {
  describe('when data is available', () => {
    let items: DetailedListItem[][]
    let labels: string[]
    const getItemByLabel = (label: string) => {
      const itemList = items.reduce((prev, cur) => [...prev, ...cur])

      return itemList[labels.indexOf(label)]
    }

    describe('default render', () => {
      beforeAll(() => {
        const result = arrangeTest()

        items = result
        labels = getLabels(items)
      })

      it('renders Sales Claimer item', () => {
        const { value } = getItemByLabel('Sales claimer')

        const {
          id,
          claimer,
          operations: { selectClientClaimer, requestClientClaimerTransfer }
        } = internalTeamFragmentMock

        expect(value).toMatchObject({
          type: EditableStaffClient,
          props: {
            clientId: id,
            mutationDocument: expect.any(Object),
            name: 'claimerId',
            value: claimer,
            queryHook: expect.any(Function),
            scope: RoleV2Scope.COMPANY_CLAIMERS,
            operation: selectClientClaimer,
            enableReset: false,
            editor: expect.any(Function),
            icon: {
              type: EditableStaffTransferButton,
              props: {
                scope: RoleV2Scope.COMPANY_CLAIMERS,
                mutationName: 'requestClientClaimerTransfer',
                mutationDocument: expect.any(Object),
                operation: requestClientClaimerTransfer,
                fieldName: 'Sales Claimer',
                clientId: id,
                staffId: claimer.id
              }
            }
          }
        })
      })

      it('returns Client Partner item', () => {
        const { value } = getItemByLabel('Client Partner')

        const {
          id,
          clientPartner,
          operations: { updateClientClientPartner }
        } = internalTeamFragmentMock

        expect(value).toMatchObject({
          type: ClientPartner,
          props: {
            clientId: id,
            value: clientPartner,
            operation: updateClientClientPartner
          }
        })
      })

      it('renders relationship manager field', () => {
        const { value } = getItemByLabel('Relationship manager')

        const {
          id,
          relationshipManager,
          operations: {
            updateClientRelationshipManager,
            requestClientRelationshipManagerTransfer
          }
        } = internalTeamFragmentMock

        expect(value).toMatchObject({
          type: EditableStaffClient,
          props: {
            name: 'relationshipManagerId',
            clientId: id,
            value: relationshipManager,
            operation: updateClientRelationshipManager,
            scope: RoleV2Scope.SMB_RELATIONSHIP_MANAGERS,
            queryHook: expect.any(Function),
            icon: {
              type: EditableStaffTransferButton,
              props: {
                scope: RoleV2Scope.SMB_RELATIONSHIP_MANAGERS,
                mutationName: 'requestClientRelationshipManagerTransfer',
                mutationDocument: expect.any(Object),
                fieldName: 'Relationship manager',
                operation: requestClientRelationshipManagerTransfer,
                clientId: id,
                staffId: relationshipManager.id
              }
            }
          }
        })
      })

      it('renders account manager field', () => {
        const { value } = getItemByLabel('Account manager')

        const {
          id,
          accountManager,
          operations: {
            updateAccountManager,
            requestClientAccountManagerTransfer
          }
        } = internalTeamFragmentMock

        expect(value).toMatchObject({
          type: EditableStaffClient,
          props: {
            name: 'accountManagerId',
            clientId: id,
            value: accountManager,
            operation: updateAccountManager,
            scope: RoleV2Scope.COMPANY_SMB_ACCOUNT_MANAGERS,
            queryHook: expect.any(Function),
            icon: {
              type: EditableStaffTransferButton,
              props: {
                scope: RoleV2Scope.COMPANY_SMB_ACCOUNT_MANAGERS,
                mutationName: 'requestClientAccountManagerTransfer',
                mutationDocument: expect.any(Object),
                fieldName: 'Account manager',
                operation: requestClientAccountManagerTransfer,
                clientId: id,
                staffId: accountManager.id
              }
            }
          }
        })
      })
    })

    describe('when company business type is enterprise', () => {
      beforeAll(() => {
        const result = arrangeTest({
          businessType: BusinessTypes.ENTERPRISE_BUSINESS
        })

        items = result
        labels = getLabels(items)
      })

      it('returns Claimer Category item', () => {
        const { value } = getItemByLabel('Claimer category')

        const {
          id,
          claimerCategory,
          operations: { updateClientClaimerCategory }
        } = internalTeamFragmentMock

        expect(value).toMatchObject({
          type: ClaimerCategory,
          props: {
            clientId: id,
            value: claimerCategory,
            operation: updateClientClaimerCategory
          }
        })
      })

      it('returns Client Partner category item', () => {
        const { value } = getItemByLabel('Client Partner category')

        const {
          id,
          clientPartnerCategory,
          operations: { updateClientPartnerCategory }
        } = internalTeamFragmentMock

        expect(value).toMatchObject({
          type: PartnerCategory,
          props: {
            clientId: id,
            value: clientPartnerCategory,
            operation: updateClientPartnerCategory
          }
        })
      })

      it('returns SDR item', () => {
        const { value } = getItemByLabel('SDR')

        const {
          id,
          salesDevelopmentRepresentative,
          operations: { updateClientSalesDevelopmentRepresentative }
        } = internalTeamFragmentMock

        expect(value).toMatchObject({
          type: EditableStaffClient,
          props: {
            name: 'salesDevelopmentRepresentativeId',
            clientId: id,
            value: salesDevelopmentRepresentative,
            operation: updateClientSalesDevelopmentRepresentative,
            scope: RoleV2Scope.ENTERPRISE_CLAIMERS,
            queryHook: expect.any(Function)
          }
        })
      })

      it('returns ESE item', () => {
        const { value } = getItemByLabel('ESE')

        const {
          id,
          enterpriseSalesExecutive,
          operations: { updateClientEnterpriseSalesExecutive }
        } = internalTeamFragmentMock

        expect(value).toMatchObject({
          type: EditableStaffClient,
          props: {
            name: 'enterpriseSalesExecutiveId',
            clientId: id,
            value: enterpriseSalesExecutive,
            operation: updateClientEnterpriseSalesExecutive,
            scope: RoleV2Scope.ENTERPRISE_SALES_EXECUTIVES,
            queryHook: expect.any(Function)
          }
        })
      })

      it('returns Account Owner item', () => {
        const { value } = getItemByLabel('Account owner')

        const {
          id,
          accountOwner,
          operations: { updateClientAccountOwner }
        } = internalTeamFragmentMock

        expect(value).toMatchObject({
          type: EditableStaffClient,
          props: {
            name: 'accountOwnerId',
            clientId: id,
            value: accountOwner,
            operation: updateClientAccountOwner,
            scope: RoleV2Scope.ACCOUNT_OWNERS,
            queryHook: expect.any(Function)
          }
        })
      })

      it('renders Finance Team Member item', () => {
        const { value } = getItemByLabel('Finance team member')

        const {
          id,
          financeTeamMember,
          operations: { updateClientFinanceTeamMember }
        } = internalTeamFragmentMock

        expect(value).toMatchObject({
          type: FinanceTeamMember,
          props: {
            financeTeamMember: financeTeamMember,
            clientId: id,
            updateClientFinanceTeamMember: updateClientFinanceTeamMember
          }
        })
      })

      it('renders enterprise and common fields in order', () => {
        expect(labels).toEqual([
          'Sales claimer',
          'Claimer category',
          'Client Partner',
          'Client Partner category',
          'SDR',
          'ESE',
          'Account manager',
          'Relationship manager',
          'Account owner',
          'Sales analyst',
          'Matching operations coordinator',
          'Finance team member'
        ])
      })

      it('renders matching operations coordinator field', () => {
        const { value } = getItemByLabel('Matching operations coordinator')

        const {
          id,
          matchingOperationsCoordinator,
          operations: { updateMatchingOperationsCoordinator }
        } = internalTeamFragmentMock

        expect(value).toMatchObject({
          type: EditableStaffClient,
          props: {
            name: 'matchingOperationsCoordinatorId',
            clientId: id,
            value: matchingOperationsCoordinator,
            operation: updateMatchingOperationsCoordinator,
            scope: RoleV2Scope.COMPANY_MATCHING_OPERATIONS_COORDINATORS,
            queryHook: expect.any(Function),
            enableReset: false
          }
        })
      })
    })

    describe('when company business type is not enterprise', () => {
      beforeAll(() => {
        const result = arrangeTest({
          businessType: undefined
        })

        items = result
        labels = getLabels(items)
      })

      it('renders project relationship manager field', () => {
        const { value } = getItemByLabel('Project relationship manager')

        const {
          id,
          projectRelationshipManager,
          operations: { updateProjectRelationshipManager }
        } = internalTeamFragmentMock

        expect(value).toMatchObject({
          type: EditableStaffClient,
          props: {
            name: 'projectRelationshipManagerId',
            clientId: id,
            value: projectRelationshipManager,
            operation: updateProjectRelationshipManager,
            scope: RoleV2Scope.COMPANY_SMB_PROJECT_RELATIONSHIP_MANAGERS,
            queryHook: expect.any(Function)
          }
        })
      })

      it('renders project delivery manager field', () => {
        const { value } = getItemByLabel('Project delivery manager')

        const {
          id,
          projectDeliveryManager,
          operations: { updateProjectDeliveryManager }
        } = internalTeamFragmentMock

        expect(value).toMatchObject({
          type: EditableStaffClient,
          props: {
            name: 'projectDeliveryManagerId',
            clientId: id,
            value: projectDeliveryManager,
            operation: updateProjectDeliveryManager,
            scope: RoleV2Scope.COMPANY_SMB_PROJECT_DELIVERY_MANAGERS,
            queryHook: expect.any(Function)
          }
        })
      })

      it('returns Project sales specialist item', () => {
        const { value } = getItemByLabel('Project sales specialist')

        const {
          id,
          projectSalesSpecialist,
          operations: { updateProjectSalesSpecialist }
        } = internalTeamFragmentMock

        expect(value).toMatchObject({
          type: EditableStaffClient,
          props: {
            name: 'projectSalesSpecialistId',
            clientId: id,
            value: projectSalesSpecialist,
            operation: updateProjectSalesSpecialist,
            scope:
              RoleV2Scope.COMPANY_SMB_PROJECT_SALES_SPECIALISTS_PRIMARY_ROLE,
            queryHook: expect.any(Function)
          }
        })
      })

      it('renders non-enterprise and common fields in order', () => {
        expect(labels).toEqual([
          'Sales claimer',
          'Project sales specialist',
          'Relationship manager',
          'Project relationship manager',
          'Account manager',
          'Project delivery manager',
          'Account owner',
          'Sales analyst',
          'Matching operations coordinator',
          'Finance team member'
        ])
      })

      it('renders matching operations coordinator field', () => {
        const { value } = getItemByLabel('Matching operations coordinator')

        const {
          id,
          matchingOperationsCoordinator,
          operations: { updateMatchingOperationsCoordinator }
        } = internalTeamFragmentMock

        expect(value).toMatchObject({
          type: EditableStaffClient,
          props: {
            name: 'matchingOperationsCoordinatorId',
            clientId: id,
            value: matchingOperationsCoordinator,
            operation: updateMatchingOperationsCoordinator,
            scope: RoleV2Scope.COMPANY_SMB_MATCHING_OPERATIONS_COORDINATORS,
            queryHook: expect.any(Function),
            enableReset: false
          }
        })
      })
    })

    describe('when matchers are available', () => {
      it('calls useGetClientMatcherFields', () => {
        const {
          id: clientId,
          matchers,
          operations: { updateClientMatcher }
        } = internalTeamFragmentMock

        arrangeTest()

        expect(useGetClientMatcherFieldsMock).toHaveBeenCalledWith({
          clientId,
          value: matchers,
          operation: updateClientMatcher
        })
      })
    })

    describe('when cumulative status is sourced', () => {
      it('renders sales analyst field', () => {
        const result = arrangeTest({
          cumulativeStatus: ClientCumulativeStatus.SOURCED
        })
        const item = result
          .reduce((prev, cur) => [...prev, ...cur])
          .find(({ label }) => label === 'Sales analyst')

        const {
          id,
          salesAnalyst,
          operations: { updateClientSalesAnalyst }
        } = internalTeamFragmentMock

        expect(item?.value).toMatchObject({
          type: EditableStaffClient,
          props: {
            name: 'salesAnalystId',
            clientId: id,
            value: salesAnalyst,
            operation: updateClientSalesAnalyst,
            scope: RoleV2Scope.SALES_ANALYSTS,
            queryHook: expect.any(Function)
          }
        })
      })
    })

    describe('when cumulative status is not sourced', () => {
      it('does not render sales analyst field', () => {
        const result = arrangeTest({
          cumulativeStatus: ClientCumulativeStatus.ACTIVE
        })
        const item = result
          .reduce((prev, cur) => [...prev, ...cur])
          .find(({ label }) => label === 'Sales analyst')

        expect(item).toBeUndefined()
      })
    })
  })
})
