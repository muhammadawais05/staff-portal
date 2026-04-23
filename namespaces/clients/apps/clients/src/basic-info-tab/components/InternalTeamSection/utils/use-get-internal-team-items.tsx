/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import React from 'react'
import {
  ClientCumulativeStatus,
  RoleV2Scope,
  UpdateAccountManagerInput,
  UpdateClientSalesAnalystInput,
  UpdateMatchingOperationsCoordinatorInput,
  UpdateClientRelationshipManagerInput,
  UpdateProjectRelationshipManagerInput,
  UpdateProjectDeliveryManagerInput,
  UpdateProjectSalesSpecialistInput,
  UpdateClientSalesDevelopmentRepresentativeInput,
  SelectClientClaimerInput,
  UpdateClientEnterpriseSalesExecutiveInput,
  UpdateClientAccountOwnerInput
} from '@staff-portal/graphql/staff'
import {
  DetailedListItem,
  LinkWrapper,
  TypographyOverflowLink
} from '@staff-portal/ui'
import { isEnterpriseBusiness } from '@staff-portal/clients'
import { EditableStaffTransferButton } from '@staff-portal/staff'
import { NO_VALUE } from '@staff-portal/config'

import {
  InternalTeamFragment,
  SetClientEnterpriseSalesExecutiveDocument,
  SetSelectClientClaimerDocument,
  SetClientAccountOwnerDocument
} from '../data'
import {
  EditableStaffClient,
  PartnerCategory,
  ClaimerCategory,
  SalesClaimerEditor,
  ClientPartner,
  FinanceTeamMember
} from '../components/InternalTeam/components'
import {
  getAccountManagerHook,
  getClientSalesAnalystHook,
  getClientRelationshipManagerHook,
  getProjectRelationshipManagerHook,
  getProjectDeliveryManagerHook,
  getClientProjectSalesSpecialistHook,
  getClientSalesDevelopmentRepresentativeHook,
  getClientEnterpriseSalesExecutiveHook,
  getClientAccountOwnerHook,
  useGetClientMatcherFields,
  getClientClaimerHook
} from '../components/InternalTeam/utils'
import { getMatchingOperationsCoordinatorHook } from '../components/InternalTeam/utils/get-internal-team-matching-operations-coordinator-hook'
import { SetMatchingOperationsCoordinatorDocument } from '../data/set-client-matching-operations-coordinator.staff.gql.types'
import { SetClientSalesAnalystDocument } from '../data/set-client-sales-analyst.staff.gql.types'
import { SetClientRelationshipManagerDocument } from '../data/set-client-relationship-manager.staff.gql.types'
import { SetProjectRelationshipManagerDocument } from '../data/set-project-relationship-manager.staff.gql.types'
import { SetAccountManagerDocument } from '../data/set-account-manager.staff.gql.types'
import { SetProjectDeliveryManagerDocument } from '../data/set-project-delivery-manager.staff.gql.types'
import { SetClientProjectSalesSpecialistDocument } from '../data/set-client-project-sales-specialist.staff.gql.types'
import { SetClientSalesDevelopmentRepresentativeDocument } from '../data/set-client-sales-development-representative.staff.gql.types'
import { SetRequestClientClaimerTransferDocument } from '../components/InternalTeam/data/set-request-client-claimer-transfer.staff.gql.types'
import { SetRequestClientAccountManagerTransferDocument } from '../components/InternalTeam/data/set-request-client-account-manager-transfer.staff.gql.types'
import { SetRequestClientRelationshipManagerTransferDocument } from '../components/InternalTeam/data/set-request-client-relationship-manager-transfer.staff.gql.types'

interface Props {
  data: InternalTeamFragment
}

export const useGetInternalTeamItems = ({
  data: {
    id: clientId,
    businessType,
    cumulativeStatus,
    claimer,
    claimerCategory,
    salesAnalyst,
    matchingOperationsCoordinator,
    relationshipManager,
    projectRelationshipManager,
    accountManager,
    projectDeliveryManager,
    projectSalesSpecialist,
    clientPartnerCategory,
    salesDevelopmentRepresentative,
    enterpriseSalesExecutive,
    accountOwner,
    matchers,
    clientPartner,
    financeTeamMember,
    operations: {
      updateClientAccountOwner,
      updateClientSalesAnalyst,
      updateClientRelationshipManager,
      updateProjectRelationshipManager,
      updateMatchingOperationsCoordinator,
      updateClientClaimerCategory,
      updateAccountManager,
      updateProjectDeliveryManager,
      updateProjectSalesSpecialist,
      selectClientClientPartner,
      selectClientClaimer,
      requestClientClaimerTransfer,
      updateClientPartnerCategory,
      updateClientSalesDevelopmentRepresentative,
      updateClientEnterpriseSalesExecutive,
      updateClientMatcher,
      requestClientAccountManagerTransfer,
      requestClientRelationshipManagerTransfer,
      updateClientFinanceTeamMember
    }
  }
}: Props) => {
  const isEnterprise = isEnterpriseBusiness(businessType)
  const isSourced = cumulativeStatus === ClientCumulativeStatus.SOURCED
  const mocRoleScope = isEnterprise
    ? RoleV2Scope.COMPANY_MATCHING_OPERATIONS_COORDINATORS
    : RoleV2Scope.COMPANY_SMB_MATCHING_OPERATIONS_COORDINATORS

  return [
    [
      [
        'Sales claimer',
        <EditableStaffClient<SelectClientClaimerInput>
          mutationDocument={SetSelectClientClaimerDocument}
          name='claimerId'
          clientId={clientId}
          enableReset={false}
          value={claimer}
          queryHook={getClientClaimerHook}
          scope={RoleV2Scope.COMPANY_CLAIMERS}
          operation={selectClientClaimer}
          editor={SalesClaimerEditor}
          icon={
            <EditableStaffTransferButton
              clientId={clientId}
              scope={RoleV2Scope.COMPANY_CLAIMERS}
              staffId={claimer?.id}
              fieldName={'Sales Claimer'}
              mutationName='requestClientClaimerTransfer'
              mutationDocument={SetRequestClientClaimerTransferDocument}
              operation={requestClientClaimerTransfer}
            />
          }
        />
      ],
      isEnterprise
        ? [
            'Claimer category',
            <ClaimerCategory
              clientId={clientId}
              value={claimerCategory}
              operation={updateClientClaimerCategory}
            />
          ]
        : [
            'Project sales specialist',
            <EditableStaffClient<UpdateProjectSalesSpecialistInput>
              name='projectSalesSpecialistId'
              clientId={clientId}
              value={projectSalesSpecialist}
              operation={updateProjectSalesSpecialist}
              scope={
                RoleV2Scope.COMPANY_SMB_PROJECT_SALES_SPECIALISTS_PRIMARY_ROLE
              }
              queryHook={getClientProjectSalesSpecialistHook}
              mutationDocument={SetClientProjectSalesSpecialistDocument}
            />
          ]
    ],
    ...(isEnterprise
      ? [
          [
            [
              'Client Partner',
              <ClientPartner
                clientId={clientId}
                operation={selectClientClientPartner}
                value={clientPartner}
              />
            ],
            [
              'Client Partner category',
              <PartnerCategory
                clientId={clientId}
                value={clientPartnerCategory}
                operation={updateClientPartnerCategory}
              />
            ]
          ],
          [
            [
              'SDR',
              <EditableStaffClient<UpdateClientSalesDevelopmentRepresentativeInput>
                name='salesDevelopmentRepresentativeId'
                clientId={clientId}
                value={salesDevelopmentRepresentative}
                operation={updateClientSalesDevelopmentRepresentative}
                scope={RoleV2Scope.ENTERPRISE_CLAIMERS}
                queryHook={getClientSalesDevelopmentRepresentativeHook}
                mutationDocument={
                  SetClientSalesDevelopmentRepresentativeDocument
                }
              />
            ],
            [
              'ESE',
              <EditableStaffClient<UpdateClientEnterpriseSalesExecutiveInput>
                name='enterpriseSalesExecutiveId'
                clientId={clientId}
                value={enterpriseSalesExecutive}
                operation={updateClientEnterpriseSalesExecutive}
                scope={RoleV2Scope.ENTERPRISE_SALES_EXECUTIVES}
                queryHook={getClientEnterpriseSalesExecutiveHook}
                mutationDocument={SetClientEnterpriseSalesExecutiveDocument}
              />
            ]
          ]
        ]
      : [
          [
            [
              'Relationship manager',
              <EditableStaffClient<UpdateClientRelationshipManagerInput>
                name='relationshipManagerId'
                clientId={clientId}
                value={relationshipManager}
                operation={updateClientRelationshipManager}
                scope={RoleV2Scope.SMB_RELATIONSHIP_MANAGERS}
                queryHook={getClientRelationshipManagerHook}
                mutationDocument={SetClientRelationshipManagerDocument}
                icon={
                  <EditableStaffTransferButton
                    clientId={clientId}
                    staffId={relationshipManager?.id}
                    scope={RoleV2Scope.SMB_RELATIONSHIP_MANAGERS}
                    mutationName='requestClientRelationshipManagerTransfer'
                    fieldName={'Relationship manager'}
                    mutationDocument={
                      SetRequestClientRelationshipManagerTransferDocument
                    }
                    operation={requestClientRelationshipManagerTransfer}
                  />
                }
              />
            ],
            [
              'Project relationship manager',
              <EditableStaffClient<UpdateProjectRelationshipManagerInput>
                name='projectRelationshipManagerId'
                clientId={clientId}
                value={projectRelationshipManager}
                operation={updateProjectRelationshipManager}
                scope={RoleV2Scope.COMPANY_SMB_PROJECT_RELATIONSHIP_MANAGERS}
                queryHook={getProjectRelationshipManagerHook}
                mutationDocument={SetProjectRelationshipManagerDocument}
              />
            ]
          ],
          [
            [
              'Account manager',
              <EditableStaffClient<UpdateAccountManagerInput>
                name='accountManagerId'
                clientId={clientId}
                value={accountManager}
                operation={updateAccountManager}
                scope={RoleV2Scope.COMPANY_SMB_ACCOUNT_MANAGERS}
                queryHook={getAccountManagerHook}
                mutationDocument={SetAccountManagerDocument}
                icon={
                  <EditableStaffTransferButton
                    clientId={clientId}
                    staffId={accountManager?.id}
                    scope={RoleV2Scope.COMPANY_SMB_ACCOUNT_MANAGERS}
                    fieldName={'Account manager'}
                    mutationName='requestClientAccountManagerTransfer'
                    mutationDocument={
                      SetRequestClientAccountManagerTransferDocument
                    }
                    operation={requestClientAccountManagerTransfer}
                  />
                }
              />
            ],
            [
              'Project delivery manager',
              <EditableStaffClient<UpdateProjectDeliveryManagerInput>
                name='projectDeliveryManagerId'
                clientId={clientId}
                value={projectDeliveryManager}
                operation={updateProjectDeliveryManager}
                scope={RoleV2Scope.COMPANY_SMB_PROJECT_DELIVERY_MANAGERS}
                queryHook={getProjectDeliveryManagerHook}
                mutationDocument={SetProjectDeliveryManagerDocument}
              />
            ]
          ]
        ]),
    isEnterprise
      ? [
          [
            'Account manager',
            <EditableStaffClient<UpdateAccountManagerInput>
              name='accountManagerId'
              clientId={clientId}
              value={accountManager}
              operation={updateAccountManager}
              scope={RoleV2Scope.COMPANY_SMB_ACCOUNT_MANAGERS}
              queryHook={getAccountManagerHook}
              mutationDocument={SetAccountManagerDocument}
              icon={
                <EditableStaffTransferButton
                  clientId={clientId}
                  staffId={accountManager?.id}
                  scope={RoleV2Scope.COMPANY_SMB_ACCOUNT_MANAGERS}
                  fieldName={'Account manager'}
                  mutationName='requestClientAccountManagerTransfer'
                  mutationDocument={
                    SetRequestClientAccountManagerTransferDocument
                  }
                  operation={requestClientAccountManagerTransfer}
                />
              }
            />
          ],
          [
            'Relationship manager',
            <EditableStaffClient<UpdateClientRelationshipManagerInput>
              name='relationshipManagerId'
              clientId={clientId}
              value={relationshipManager}
              operation={updateClientRelationshipManager}
              scope={RoleV2Scope.SMB_RELATIONSHIP_MANAGERS}
              queryHook={getClientRelationshipManagerHook}
              mutationDocument={SetClientRelationshipManagerDocument}
              icon={
                <EditableStaffTransferButton
                  clientId={clientId}
                  staffId={relationshipManager?.id}
                  scope={RoleV2Scope.SMB_RELATIONSHIP_MANAGERS}
                  mutationName='requestClientRelationshipManagerTransfer'
                  fieldName={'Relationship manager'}
                  mutationDocument={
                    SetRequestClientRelationshipManagerTransferDocument
                  }
                  operation={requestClientRelationshipManagerTransfer}
                />
              }
            />
          ]
        ]
      : [],
    [
      isEnterprise
        ? [
            'Account owner',
            <EditableStaffClient<UpdateClientAccountOwnerInput>
              name='accountOwnerId'
              clientId={clientId}
              value={accountOwner}
              operation={updateClientAccountOwner}
              scope={RoleV2Scope.ACCOUNT_OWNERS}
              queryHook={getClientAccountOwnerHook}
              mutationDocument={SetClientAccountOwnerDocument}
            />
          ]
        : [
            'Account owner',
            <TypographyOverflowLink size='medium'>
              <LinkWrapper
                wrapWhen={Boolean(accountOwner?.webResource?.url)}
                href={accountOwner?.webResource?.url as string}
                title={accountOwner?.fullName}
              >
                {accountOwner?.fullName || NO_VALUE}
              </LinkWrapper>
            </TypographyOverflowLink>
          ]
    ],
    ...useGetClientMatcherFields({
      clientId,
      operation: updateClientMatcher,
      value: matchers
    }),
    isSourced
      ? [
          [
            'Sales analyst',
            <EditableStaffClient<UpdateClientSalesAnalystInput>
              name='salesAnalystId'
              clientId={clientId}
              value={salesAnalyst}
              operation={updateClientSalesAnalyst}
              scope={RoleV2Scope.SALES_ANALYSTS}
              queryHook={getClientSalesAnalystHook}
              mutationDocument={SetClientSalesAnalystDocument}
            />
          ]
        ]
      : [],
    [
      [
        'Matching operations coordinator',
        <EditableStaffClient<UpdateMatchingOperationsCoordinatorInput>
          name='matchingOperationsCoordinatorId'
          clientId={clientId}
          value={matchingOperationsCoordinator}
          operation={updateMatchingOperationsCoordinator}
          scope={mocRoleScope}
          queryHook={getMatchingOperationsCoordinatorHook}
          mutationDocument={SetMatchingOperationsCoordinatorDocument}
          enableReset={false}
        />
      ]
    ],
    [
      [
        'Finance team member',
        <FinanceTeamMember
          financeTeamMember={financeTeamMember}
          clientId={clientId}
          updateClientFinanceTeamMember={updateClientFinanceTeamMember}
        />
      ]
    ]
  ].map(item =>
    item.map(
      ([label, value]) =>
        ({
          label,
          value
        } as DetailedListItem)
    )
  )
}
