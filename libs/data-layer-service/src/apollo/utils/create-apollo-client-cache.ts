import { InMemoryCache } from '@apollo/client'
import gqlIntrospectionQueryResultData from '@staff-portal/graphql/introspection-query-result.json'

import { keyFields } from './key-fields'

export const createApolloClientCache = () =>
  new InMemoryCache({
    // Cache canonicalization was disabled by default in @apollo/client@3.4.14.
    // Enable it on the cache level to not break anything.
    canonizeResults: true,
    typePolicies: {
      Viewer: { keyFields: [] },
      Counter: { keyFields: ['name'] },
      Widgets: { keyFields: [] },
      ClaimsWidget: { keyFields: [], merge: true },
      CommissionsWidget: { keyFields: [], merge: true },
      CompanyChartsWidget: { keyFields: [], merge: true },
      ReferralsWidget: { keyFields: [], merge: true },
      BillingStatsWidget: { keyFields: [], merge: true },
      Menu: { keyFields: [] },
      Permits: { keyFields: [] },
      EmailAddress: { keyFields: keyFields(['email']) },
      TalentInfractionConnection: { merge: true },
      TalentProfile: { merge: true },
      TalentPortfolio: { merge: true },
      TalentOperations: { merge: true },
      TopscreenPositionOperations: { merge: true },
      TopscreenClientOperations: { merge: true },
      AvailabilityRequest: { merge: true },
      ClientOperations: { merge: true },
      InterviewOperations: { merge: true },
      CompanyRepresentativeOperations: { merge: true },
      EmailTemplateOperations: { merge: true },
      ViewerSettings: { merge: true },
      DraftJobOperations: { merge: true },
      TaskOperations: { merge: true },
      NewEngagement: { keyFields: [] },
      NewEngagementWizard: { keyFields: [] },
      TalentEngagementConnection: { merge: true },
      EngagementBreakOperations: { merge: true },
      EngagementOperations: { merge: true },
      AdjustedCommitment: { merge: true },
      SpecializationApplicationOperations: { merge: true },
      RoleStepOperations: { merge: true },
      VerticalSpecializationConnection: { merge: true },
      JobEngagementConnection: { merge: true },
      TimeZone: { keyFields: keyFields(['name']), merge: true },
      SourcingRequestConnection: { merge: true },
      CallbackRequestOperations: { merge: true },
      OperationalIssueOperations: { merge: true },
      MeetingOperations: { merge: true },
      ActivityOperations: { merge: true },
      ClientChildrenConnection: { merge: true },
      RoleStepMainAction: { keyFields: keyFields(['actionName']) },
      TalentProfileEmploymentConnection: { merge: true },
      QueryOperations: { merge: true },
      SkillNameOperations: { merge: true },
      SkillSetConnection: { merge: true },
      InvoiceNotificationStatus: {
        keyFields: object =>
          `${object.email}+${object.status}+${object.description}`
      },
      Investigation: {
        keyFields: keyFields(['startedAt'])
      },
      NoteAttachment: {
        keyFields: keyFields(['url'])
      },
      Link: {
        merge: true
      },
      AutocompleteEdge: {
        keyFields: keyFields(['key'])
      },
      InvoicesConnection: { merge: true },
      PaymentsConnection: { merge: true },
      MemorandumConnection: { merge: true },
      PaymentGroupsConnection: { merge: true },
      NoteConnection: { merge: true },
      ActivityOrNoteConnection: { merge: true },
      NoteAnswer: {
        /* default answers have the same ids, latest apollo version
           keeps them under one id, that's the reason we need to specify custom key field
        */
        keyFields: keyFields(['id', 'questionEdge.node.id'])
      },
      Photo: { merge: true },
      InvoiceGroup: {
        fields: {
          totals: { merge: false },
          invoices: { merge: false }
        }
      },
      PaymentsGroup: {
        fields: {
          totals: { merge: false },
          payments: { merge: false }
        }
      },
      ExpectedCommissionsGroup: {
        fields: {
          totals: { merge: false },
          expectedCommissions: { merge: false }
        }
      },
      StaffConnection: { merge: false },
      InvoiceConnection: { merge: false },
      Operation: { merge: false },
      Client: { fields: { operations: { merge: true } }, merge: true },
      Invoice: { fields: { operations: { merge: true } }, merge: true },
      Payment: { fields: { operations: { merge: true } }, merge: true },
      Experiments: { fields: { operations: { merge: true } }, merge: true },
      Staff: { fields: { operations: { merge: true } }, merge: true },
      Opportunity: { merge: true },
      PaymentGroup: { fields: { operations: { merge: true } }, merge: true },
      Memorandum: { fields: { operations: { merge: true } }, merge: true },
      PurchaseOrder: { fields: { operations: { merge: true } }, merge: true },
      InvoicesConnectionOperations: { merge: false },
      PaymentsConnectionOperations: { merge: false },
      PaymentGroupsConnectionOperations: { merge: false },
      Totals: { merge: false },
      InvoicesTotals: { merge: false },
      PaymentsTotals: { merge: false },
      ExpectedCommissionsTotals: { merge: false },
      ClientCommissions: { merge: false },
      JobOperations: { merge: true },
      SourcingRequestOperations: { merge: true },
      CommitmentChangeRequestOperations: { merge: true },
      ProposedEngagementEnd: { merge: true },
      RoleFlagOperations: { merge: true },
      TalentProfileLink: {
        keyFields: keyFields(['url'])
      },
      PortfolioItemCoverImage: { merge: true },
      Query: {
        fields: {
          staffNode(existing, { readField, args }) {
            return (
              existing ||
              readField({ fieldName: 'node', args: args || undefined })
            )
          },
          staffNodes(existing, { readField, args }) {
            return (
              existing ||
              readField({ fieldName: 'nodes', args: args || undefined })
            )
          }
        }
      }
    },
    possibleTypes: {
      ...gqlIntrospectionQueryResultData.possibleTypes
    }
  })
