/* eslint-disable max-lines */
import { ApolloQueryResult } from '@apollo/client'
import { ChangeEvent, FocusEvent, FC } from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { CurrentUser } from '@staff-portal/current-user'
import { defineMessage, TypedMessage } from '@toptal/staff-portal-message-bus'
import {
  BillingCycle,
  Engagement,
  InvoiceConnection,
  Overview,
  PurchaseOrderConnection,
  DocumentStatus,
  TaskSource
} from '@staff-portal/graphql/staff'
import { DependenciesRegistry } from '@staff-portal/dependency-injector'

import { ModalData } from '../store/modalActions'

type notificationHookType = ReturnType<typeof useNotifications>

export type EngagementChange = Pick<
  Engagement,
  | 'billCycle'
  | 'billDay'
  | 'canBeDiscounted'
  | 'commitment'
  | 'companyFullTimeRate'
  | 'companyHourlyRate'
  | 'companyPartTimeRate'
  | 'defaultDiscount'
  | 'defaultFullTimeDiscount'
  | 'defaultMarkup'
  | 'defaultPartTimeDiscount'
  | 'defaultUpcharge'
  | 'discountMultiplier'
  | 'id'
  | 'job'
  | 'fullTimeDiscount'
  | 'markup'
  | 'partTimeDiscount'
  | 'rateOverrideReason'
  | 'rateMethod'
  | 'semiMonthlyPaymentTalentAgreement'
  | 'talentFullTimeRate'
  | 'talentHourlyRate'
  | 'talentPartTimeRate'
>

export interface Option {
  text: string
  value: string | number
}

export interface SummaryItem {
  amount: number
  status: DocumentStatus
}

export enum OverviewAccessLevel {
  TeamBilling = 'TeamBilling',
  MyBilling = 'MyBilling'
}

export interface BillingOverview extends Overview {
  invoicesDisputed: InvoiceConnection
  invoicesOverdue: InvoiceConnection
  purchaseOrdersLimit: PurchaseOrderConnection
  purchaseOrdersExpiration: PurchaseOrderConnection
}

export enum DateFormat {
  MonthDayYear = 'MMM D, YYYY',
  ISODate = 'YYYY-MM-DD'
}

export type WeekStartsOn = 0 | 1 | 2 | 3 | 4 | 5 | 6

export enum UserRole {
  talent = 'talent',
  staff = 'staff',
  // TODO: use valid roles currently just a placeholder
  notTalent = 'anything'
}

export interface GQLSettings {
  endpoint: string
  debugLevel: string
}

export type Refetch = (variables?: any) => Promise<ApolloQueryResult<any>>

export interface GQLQueryWrapperRenderChild {
  data: {
    billingCycle?: BillingCycle
    billingCyclesWithTimesheets?: BillingCycle[]
    engagement?: Engagement
    _entities?: any
    overview?: BillingOverview
  }
  refetch: Refetch
}

export enum TimesheetSubmitEnum {
  submit = 'submit',
  edit = 'edit',
  contactRecruiter = 'contact-recruiter'
}

export enum ModalKey {
  billingAddressEdit = 'billing-address-edit',
  billingCycleSettings = 'billing-cycle-settings',
  billingOptionUpdate = 'billing-option-update',
  billingOptionWireVerification = 'billing-option-wire-verification',
  changeRoleReferrer = 'change-role-referrer',
  clientBillingReportDownload = 'client-billing-report-download',
  clientBusinessTypeUpdate = 'client-business-type-update',
  clientClaimerUpdate = 'client-claimer-update',
  clientRefundCreditBalance = 'client-refund-credit-balance',
  commercialDocumentAddNote = 'commercial-document-add-note',
  commercialDocumentDisputeRequest = 'commercial-document-dispute-request',
  commercialDocumentDisputeResolve = 'commercial-document-dispute-resolve',
  commercialDocumentEditNote = 'commercial-document-edit-note',
  commercialDocumentUpdateDueDate = 'commercial-document-update-due-date',
  commitmentChange = 'commitment-change',
  commitmentMinimumEdit = 'commitment-minimum-edit',
  consolidatedInvoiceCreate = 'consolidated-invoice-created',
  unappliedCashRecord = 'record-unapplied-cash',
  unappliedCashEntries = 'unapplied-cash-entries',
  extraExpenseAdd = 'extra-expense-add',
  invoiceApplyMemos = 'invoice-apply-memos',
  invoiceApplyPrepayments = 'invoice-apply-prepayments',
  invoiceCollectBadDebt = 'invoice-collect-bad-debt',
  invoiceDisputeTalent = 'invoice-dispute-talent',
  invoiceDisputeUpdate = 'invoice-dispute-update',
  invoicePay = 'invoice-pay',
  invoiceRecordBadDebt = 'invoice-record-bad-debt',
  invoiceUnconsolidate = 'invoice-unconsolidate',
  invoiceUpdateIssueDate = 'invoice-update-issue-date',
  invoiceWriteOff = 'invoice-write-off',
  jobCreateTemplate = 'billingDetails:create-job-template',
  jobUpdateTemplate = 'billingDetails:update-job-template',
  consolidationDefaultsCreate = 'billingDetails:consolidation-defaults-create',
  consolidationDefaultsUpdate = 'billingDetails:consolidation-defaults-update',
  memorandumAdd = 'memo-add',
  memorandumRevertPrepayment = 'memo-revert-prepayment',
  noteCreate = 'note-create',
  noteEdit = 'note-edit',
  paymentApplyMemos = 'payment-apply-memos',
  paymentCancel = 'payment-cancel',
  paymentConvertIntoCreditMemo = 'payment-convert',
  paymentGroupCancel = 'payment-group-cancel',
  paymentGroupPay = 'payment-group-pay',
  paymentGroupPayMultiple = 'payment-groups-pay-multiple',
  paymentPay = 'payment-pay',
  paymentPayMultiple = 'payment-pay-multiple',
  placementFeeAdd = 'placement-fee-add',
  purchaseOrderCreate = 'purchase-order-create',
  purchaseOrderEdit = 'purchase-order-edit',
  invoiceAssignPurchaseOrder = 'invoice-assign-purchase-order',
  revertCommercialDocumentMemorandum = 'memo-revert',
  revertRoleMemorandum = 'memo-revert-role',
  receivedPaymentsHistory = 'received-payments-history',
  receivedPaymentsCommissions = 'received-payments-commissions',
  receivedPaymentsProjections = 'received-payments-projections',
  timesheet = 'timesheet',
  timesheetEdit = 'timesheet-edit',
  timesheetUnsubmit = 'timesheet-unsubmit',
  transferCancel = 'transfer-cancel',
  transferClaimRefund = 'transfer-claim-refund',
  transferMarkFailed = 'transfer-mark-failed',
  transferPay = 'transfer-pay',
  transferPostpone = 'transfer-postpone',
  transferRollback = 'transfer-rollback'
}

/**
 * Prepare for non platform usage
 * Generalized and collect external events
 * For easier usage
 */
export type HandleEmitOutboundEvent = (
  eventName: HandleOutboundEventName,
  payload: HandleOutboundEventPayload
) => void

export type HandleOutboundEventName =
  | 'billing_cycle_settings:changed'
  | 'commitment:changed'
  | 'extra-expenses-add'
  | 'unapplied-cash:record'
  | 'invoice-collect-bad-debt'
  | 'invoice-record-bad-debt'
  | 'memorandum:add'
  | 'navigate:purchaseorder'
  | 'placement-fee-submit'
  | 'timesheet-approve'
  | 'timesheet-contact-recruiter'
  | 'timesheet-reject'
  | 'timesheet-submit'
  | 'timesheet-unsubmit'
  | 'timesheet-update'
  | TypedMessage<any>

export interface HandleOutboundEventPayload {
  billingCycleId?: string
  invoiceId?: string
  startDate?: string
  endDate?: string
}

/**
 * Its good to store here the required Platform events
 * Despite the fact that it will be declared on Platform inclusion side
 * (Keep in mind, there is no platform event list, described in one place, exist currently)
 */
export enum ExternalPlatformEvents {
  htmlRefresh = 'dom_helper:refreshWithHtml'
}

export type HandleInboundEvent = (
  eventName: HandleInboundEventName,
  payload: HandleInboundEventPayload
) => void

export type HandleInboundEventName =
  | 'billing_cycle_settings:changed'
  | 'commitment:changed'
  | 'refetch_query:billingCycles'
  | 'refetch_query:billingCyclesWithTimesheets'
  | 'refetch_query:engagementDocuments'
  | 'set_engagementId'
  | 'show_modal'

export type HandleInboundEventPayload = {
  refetchQuery?: Refetch
  setEid?: (id: string) => void
  showModal?: (modalName: string, options?: ModalData) => void
}

export type HandleInboundEventUnsubscribe = (
  eventName: HandleInboundEventName,
  payload?: HandleInboundEventUnsubscribePayload
) => void

export type HandleInboundEventUnsubscribePayload = {}

/**
 * Form Input
 * shared handler interfaces
 */
export type FormInputHandleOnBlur = (
  handleFinalFormOnBlur: (value: string) => void,
  handleFinalFormOnChange: (value: string) => void
) => (event: FocusEvent<HTMLInputElement>) => void

export type FormInputDatePickerOnChange = (
  handleFinalFormOnChange: (value: string) => void,
  adjustedValue: string | null
) => void

export type FormInputHandleOnChange = (
  handleFinalFormOnChange: (value: string) => void
) => (
  event:
    | ChangeEvent<
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLSelectElement
        | {
            name?: string | undefined
            value: string | string[] | number
          }
      >
    | any
) => void

export type FormInputHandleOnFocus = (
  handleFinalFormOnFocus: (value: string) => void
) => (event: FocusEvent<HTMLInputElement>) => void

/**
 * Non exported input props
 * React final form Component field props approach
 */
export interface FieldInputProps<
  FieldValue,
  T extends HTMLElement = HTMLElement
> {
  name: string
  onBlur: (event?: FocusEvent<T>) => void
  onChange: (event: ChangeEvent<T> | any) => void
  onFocus: (event?: FocusEvent<T>) => void
  type?: string
  value: FieldValue
  checked?: boolean
  multiple?: boolean
}

export type NotificationError = notificationHookType['showError']
export type NotificationSuccess = notificationHookType['showSuccess']

export interface BaseMutationHandler {
  handleOutboundEventEmit?: HandleEmitOutboundEvent
  handleOnCloseModal: () => void
  showNotificationError: NotificationError
  showNotificationSuccess: NotificationSuccess
}

export const ApolloContextEvents = <const>{
  billingAddressEdit: defineMessage('billingAddress:edit'),
  billingCycleChange: defineMessage('billingCycle:change'),
  billingInformationNoteCreate: defineMessage('billingInformationNote:create'),
  billingInformationNoteEdit: defineMessage('billingInformationNote:edit'),
  billingOptionRemove: defineMessage('billingDetails:billingOptionRemove'),
  billingOptionUpdate: defineMessage('billingOption:update'),
  changeRoleReferrer: defineMessage('role:change-referrer'),
  clientRefundCreditBalance: defineMessage('client:refund-credit-balance'),
  clientUpdateClaimer: defineMessage('client:update-claimer'),
  commercialDocumentAddNote: defineMessage('commercial-document:add-note'),
  commercialDocumentApplyMemos: defineMessage(
    'commercial-document:apply-memos'
  ),
  commercialDocumentDisputeRequest: defineMessage(
    'commercial-document:dispute-request'
  ),
  commercialDocumentDisputeResolve: defineMessage(
    'commercial-document:dispute-resolve'
  ),
  commercialDocumentEditNote: defineMessage('commercial-document:edit-note'),
  commercialDocumentUpdateDueDate: defineMessage(
    'commercial-document:update-due-date'
  ),
  commitmentChange: defineMessage('commitment:change'),
  convertPaymentIntoCreditMemorandum: defineMessage(
    'payment:convert-into-credit-memorandum'
  ),
  extraExpensesCreate: defineMessage('extraExpenses:create'),
  invoiceApplyPrepayments: defineMessage('invoice:apply-prepayments'),
  invoiceApplyPromotions: defineMessage('invoice:apply-promotions'),
  invoiceAssignPurchaseOrder: defineMessage('invoice:assign-purchase-order'),
  invoiceCollectBadDebt: defineMessage('invoice:collect-bad-debt'),
  invoiceConsolidatedCreate: defineMessage('invoice:consolidated-create'),
  invoiceDisputeTalent: defineMessage('invoice:dispute-talent'),
  invoiceDisputeUpdate: defineMessage('invoice:dispute-update'),
  invoicePay: defineMessage('invoice:pay'),
  invoiceRecordBadDebt: defineMessage('invoice:record-bad-debt'),
  invoiceUnconsolidate: defineMessage('invoice:unconsolidate'),
  invoiceUpdateIssueDate: defineMessage('invoice-update-issue-date'),
  invoiceWriteOff: defineMessage('invoice:write-off'),
  jobCreateTemplate: defineMessage('billingDetails:jobCreateTemplate'),
  jobDeleteTemplate: defineMessage('billingDetails:jobDeleteTemplate'),
  jobInvoiceNoteUpdate: defineMessage('job:invoice-note-update'),
  jobPurchaseOrderEdit: defineMessage('job:purchase-order-edit'),
  jobNextPurchaseOrderEdit: defineMessage('job:next-purchase-order-edit'),
  jobUpdateTemplate: defineMessage('billingDetails:jobUpdateTemplate'),
  consolidationDefaultCreate: defineMessage(
    'billingDetails:consolidationDefaultCreate'
  ),
  consolidationDefaultUpdate: defineMessage(
    'billingDetails:consolidationDefaultUpdate'
  ),
  unappliedCashRecord: defineMessage('client:unappliedCashRecord'),
  memorandumAdd: defineMessage('memorandum:add'),
  memorandumRevert: defineMessage('memorandum:revert'),
  memorandumRevertPrepayment: defineMessage('memorandum:revert-prepayment'),
  noteCreate: defineMessage('note:create'),
  noteDelete: defineMessage('note:delete'),
  noteDeleteAttachment: defineMessage('note:delete-attachment'),
  noteUpdate: defineMessage('note:update'),
  paymentAddToGroup: defineMessage<{ paymentId: string; removed: boolean }>(
    'payment:add-payment-to-group'
  ),
  paymentCancel: defineMessage('payment:cancel'),
  paymentCreateGroup: defineMessage('payment:create-group'),
  paymentDownloadFromSearch: defineMessage(
    'payment:list-download-payments-from-search'
  ),
  paymentGroupApplyMemos: defineMessage('payment-group:apply-memos'),
  paymentGroupCancel: defineMessage('payment-group:cancel'),
  paymentGroupPay: defineMessage('payment:pay-group'),
  paymentMultiplePay: defineMessage('payment:multiple-pay'),
  paymentPay: defineMessage('payment:pay'),
  paymentRemoveFromGroup: defineMessage<{
    paymentId: string
    removed: boolean
  }>('payment:remove-payment-from-group'),
  payPaymentGroups: defineMessage('paymentGroups:multiple-pay'),
  placementFeeCreate: defineMessage('placementFee:create'),
  reverifyCreditCardBillingOption: defineMessage(
    'billingDetails:reverifyCreditCardBillingOption'
  ),
  preferEnterpriseBillingOption: defineMessage(
    'billingDetails:preferEnterpriseBillingOption'
  ),
  purchaseOrderArchiveToggle: defineMessage('purchase-order:archive-toggle'),
  purchaseOrderLineArchiveToggle: defineMessage(
    'purchase-order-line:archive-toggle'
  ),
  purchaseOrderCreate: defineMessage('purchase-order:create'),
  purchaseOrderUpdate: defineMessage('purchase-order:update'),
  timesheetSubmit: defineMessage('timesheet:submit'),
  timesheetUnsubmit: defineMessage('timesheet:unsubmit'),
  timesheetUpdate: defineMessage('timesheet:update'),
  transferCancel: defineMessage('transfer:cancel'),
  transferClaimRefund: defineMessage('transfer:claim-refund'),
  transferMarkFailed: defineMessage('transfer:mark-failed'),
  transferPay: defineMessage('transfer:pay'),
  transferPostpone: defineMessage('transfer:postpone'),
  transferRollback: defineMessage('transfer:rollback'),
  unsetPreferredBillingOption: defineMessage(
    'billingDetails:unsetPreferredBillingOption'
  ),
  wireVerification: defineMessage('billingDetails:wireVerification')
}

export enum FeatureFlagEnum {}

export type FeatureFlag = Record<FeatureFlagEnum, boolean>

export enum ApplicationWidgets {
  StaffBasicBillingInfoWidget = 'StaffBasicBillingInfoWidget',
  StaffBillingDetailsWidget = 'StaffBillingDetailsWidget',
  StaffBillingInformationNotesWidget = 'StaffBillingInformationNotesWidget',
  StaffBillingSettingsPage = 'StaffBillingSettingsPage',
  StaffBillingStatsWidget = 'StaffBillingStatsWidget',
  StaffCommissionWidget = 'StaffCommissionWidget',
  StaffCompanyProfileWidget = 'StaffCompanyProfileWidget',
  StaffDashboardCommissionWidget = 'StaffDashboardCommissionWidget',
  StaffEngagementPage = 'StaffEngagementPage',
  StaffExpectedCommissionListPage = 'StaffExpectedCommissionListPage',
  StaffInvoiceDetailsPage = 'StaffInvoiceDetailsPage',
  StaffInvoiceListPage = 'StaffInvoiceListPage',
  StaffInvoiceTaskCard = 'StaffInvoiceTaskCard',
  StaffJobPage = 'StaffJobPage',
  StaffMemorandumListPage = 'StaffMemorandumListPage',
  StaffOverviewPage = 'StaffOverviewPage',
  StaffPaymentDetailsPage = 'StaffPaymentDetailsPage',
  StaffPaymentGroupDetailsPage = 'StaffPaymentGroupDetailsPage',
  StaffPaymentGroupListPage = 'StaffPaymentGroupListPage',
  StaffPaymentListPage = 'StaffPaymentListPage',
  StaffPaymentTaskCard = 'StaffPaymentTaskCard',
  StaffPurchaseOrderDetailsPage = 'StaffPurchaseOrderDetailsPage',
  StaffPurchaseOrderListPage = 'StaffPurchaseOrderListPage'
}

export interface ConnectionPoint {
  url: string
  token?: string
}

export interface ConnectionPoints {
  kipper?: ConnectionPoint
  platform?: ConnectionPoint
  lens?: ConnectionPoint
}

export interface BaseEndpoints {
  Gateway: string
  Platform: string
  Kipper: string
}

export interface BaseAppProps {
  currentUser?: CurrentUser
  datepickerDisplayDateFormat?: string
  datepickerEditDateFormat?: string
  /** Pure urls, graphql reference will be extended in getApolloClient */
  endpoints: BaseEndpoints
  featureFlags?: Partial<FeatureFlag>
  handleInboundEvent?: HandleInboundEvent
  handleInboundEventUnsubscribe?: HandleInboundEventUnsubscribe
  handleOutboundEventEmit?: HandleEmitOutboundEvent
  isPicassoRendered?: boolean
  locale?: string
  modalContainer?: HTMLElement
  notificationContainer?: HTMLElement
  role?: UserRole
  shouldInitSentry?: boolean
  throwBoundaryErrorsToHostApp?: boolean
  // Index of the first day of the week (0 - Sunday)
  weekStartsOn?: WeekStartsOn
  renderAppShell?: boolean
  isEnd2EndTestMode?: boolean
  dependenciesRegistry?: DependenciesRegistry
}

export type GQLEndpointKey = 'default' | 'empty'
export interface GQLEndpoint {
  uri: string
  authType?: 'token' | 'cookie' | 'implicit'
  authValue?: string | null
}
export type GQLEndpoints = Record<GQLEndpointKey, GQLEndpoint>

export type CamelCase<S extends string> =
  S extends `${infer P1}_${infer P2}${infer P3}`
    ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
    : Lowercase<S>

// prettier-ignore
export type KeysToCamelCase<T> = {
  [K in keyof T as CamelCase<string & K>]: T[K] extends {} ? KeysToCamelCase<T[K]> : T[K]
}

export type EnumKeysToCamelCase<T> = keyof KeysToCamelCase<T>

export type TaskCardConfig = {
  title: string
  subtitle?: string
  entityId: string
}

export enum TaskStatuses {
  pending = 'pending',
  inactive = 'inactive',
  finished = 'finished',
  paused = 'paused',
  cancelled = 'cancelled'
}

export type StaffPortalRelatedTasks = FC<{
  nodeId: string
  taskSource: TaskSource
  listenedMessages?: TypedMessage[]
}>

export type StaffPortalTimelineButton = FC<{ nodeId: string }>
