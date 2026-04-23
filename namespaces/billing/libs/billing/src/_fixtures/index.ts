import * as MockUsers from './users'
import {
  myBilling as MockEntOverviewMy,
  teamBilling as MockEntOverviewTeam
} from './graphql/entOverview/overview'
import { mockBillingCycleWithDocs } from './components/billingCyclesWithDocs'
import { mockGQLErrors, mockNetworkError } from './components/pageError'
import MockAutocompleteSearchResultsInvoiceListCompanies from './graphql/gateway/autocompleteInvoiceListCompanies'
import MockAutocompleteSearchResultsInvoiceListTalents from './graphql/gateway/autocompleteInvoiceListTalent'
import MockBillingCycle from './graphql/billing/billingCycle'
import MockBillingCycles from './graphql/billing/billingCycles'
import MockBillingCyclesTable from './graphql/gateway/queryBillingCyclesTable'
import MockBillingCyclesWithTimesheet from './graphql/billing/billingCyclesWithTimesheet'
import MockBillingSettingsJob from './graphql/gateway/getJob'
import MockClient from './graphql/gateway/client'
import MockConsolidatedBillingCycle from './components/consolidatedBillingCycle'
import MockConsolidatedBillingCycles from './components/consolidatedBillingCycles'
import MockDocument from './components/document'
import MockEndpoints from './endpoints'
import MockEngagement from './graphql/gateway/engagement'
import MockEngagementDocuments from './graphql/gateway/engagementDocuments'
import MockEngagementEngagementDocuments from './graphql/gateway/engagementBillingCycles'
import MockExpectedCommissionsList from './graphql/gateway/expectedCommissionsList'
import MockExtraExpenses from './graphql/gateway/extraExpenses'
import MockGetBillingCycles from './graphql/gateway/getBillingCycles'
import MockGetClientsToConsolidate from './graphql/gateway/getClientsToConsolidate'
import MockGetCommercialDocumentMemorandums from './graphql/gateway/getCommercialDocumentMemorandums'
import MockGetCommission from './graphql/gateway/getCommission'
import MockGetClientClaimerUpdate from './graphql/gateway/getClientClaimerUpdate'
import MockGetDashboardCommissionWidgetQuery from './graphql/gateway/getDashboardCommissionWidgetQuery'
import MockGetEngagement from './graphql/gateway/getEngagement'
import MockGetInvoicesToConsolidate from './graphql/gateway/getInvoicesToConsolidate'
import MockGetPaymentGroupListHeaderActions from './graphql/gateway/getPaymentGroupListHeader'
import MockGetPaymentListHeaderActions from './graphql/gateway/getPaymentListHeader'
import MockGetPlacementFees from './graphql/gateway/getPlacementFees'
import MockGetPurchaseOrderJobsList from './graphql/gateway/getPurchaseOrderJobsList'
import MockGetPurchaseOrdersList from './graphql/gateway/getPurchaseOrdersList'
import MockInvoice from './graphql/gateway/invoice'
import MockInvoiceList from './graphql/gateway/invoiceList'
import MockInvoiceListFilters from './graphql/gateway/invoiceListFilters'
import MockJobList from './graphql/gateway/jobList'
import MockKipperChart from './kipper/chart'
import MockMemorandum from './graphql/gateway/memorandum'
import MockMemorandumCategories from './graphql/gateway/memorandumCategories'
import MockMemorandums from './graphql/gateway/memorandums'
import MockNotes from './graphql/gateway/getNotes'
import MockNotifications from './graphql/gateway/getNotifications'
import MockOperations from './graphql/gateway/operations'
import MockPayment from './graphql/gateway/getPayment'
import MockPaymentGroup from './graphql/gateway/getPaymentGroup'
import MockPaymentGroupDetails from './graphql/gateway/getPaymentGroupDetails'
import MockPaymentGroupList from './graphql/gateway/getPaymentGroupList'
import MockPaymentList from './graphql/gateway/getPaymentList'
import MockPlacementFees from './graphql/gateway/placementFees'
import MockProcessedBillingCycles from './components/processedBillingCycles'
import MockPurchaseOrders from './graphql/gateway/purchaseOrders'
import MockPurchaseOrderLine from './graphql/gateway/getPurchaseOrderLine'
import MockStaffInvoiceNotes from './graphql/gateway/queryInvoiceNotes'
import MockStaffNote from './graphql/gateway/queryNote'
import MockTimesheetEditFormInput from './graphql/billing/timesheetEditFormInput'
import MockBillingOption from './graphql/billing/billingOption'
import MockTransfer from './graphql/gateway/getTransfer'
import MockTransfers from './graphql/gateway/getTransfers'
import MockGetConsolidationDefaults from './graphql/gateway/getConsolidationDefaults'
import MockGetConsolidationDefaultsModal from './graphql/gateway/getConsolidationDefaultsModal'
import MockGetPurchaseOrderLineJobs from './graphql/gateway/getPurchaseOrderLineJobs'

export default {
  MockAutocompleteSearchResultsInvoiceListCompanies,
  MockAutocompleteSearchResultsInvoiceListTalents,
  MockBillingCycle,
  MockBillingCycles,
  MockBillingCyclesTable,
  MockBillingCyclesWithTimesheet,
  MockBillingCycleWithDocs: mockBillingCycleWithDocs,
  MockBillingOption,
  MockBillingSettingsJob,
  MockClient,
  MockConsolidatedBillingCycle,
  MockConsolidatedBillingCycles,
  MockDocument,
  MockEndpoints,
  MockEngagement,
  MockEngagementDocuments,
  MockEngagementEngagementDocuments,
  MockEntOverviewMy,
  MockEntOverviewTeam,
  MockExpectedCommissionsList,
  MockExtraExpenses,
  MockGetBillingCycles,
  MockGetClientsToConsolidate,
  MockGetConsolidationDefaults,
  MockGetConsolidationDefaultsModal,
  MockGetCommercialDocumentMemorandums,
  MockGetCommission,
  MockGetClientClaimerUpdate,
  MockGetDashboardCommissionWidgetQuery,
  MockGetEngagement,
  MockGetInvoicesToConsolidate,
  MockGetPaymentGroupListHeaderActions,
  MockGetPaymentListHeaderActions,
  MockGetPlacementFees,
  MockGetPurchaseOrderJobsList,
  MockGetPurchaseOrdersList,
  MockGetPurchaseOrderLineJobs,
  MockGQLErrors: mockGQLErrors,
  MockInvoice,
  MockInvoiceList,
  MockInvoiceListFilters,
  MockJobList,
  MockKipperChart,
  MockMemorandum,
  MockMemorandumCategories,
  MockMemorandums,
  MockNetworkError: mockNetworkError,
  MockNotes,
  MockNotifications,
  MockOperations,
  MockPayment,
  MockPaymentGroup,
  MockPaymentGroupDetails,
  MockPaymentGroupList,
  MockPaymentList,
  MockPlacementFees,
  MockProcessedBillingCycles,
  MockPurchaseOrders,
  MockPurchaseOrderLine,
  MockStaffInvoiceNotes,
  MockStaffNote,
  MockTimesheetEditFormInput,
  MockTransfer,
  MockTransfers,
  MockUsers
}
