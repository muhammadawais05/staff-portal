/* eslint-disable max-lines */
import { lazy } from '@staff-portal/utils'
import { ModalPathsMap } from '@staff-portal/billing/src/components/ModalsState/ModalsState'
import { ModalKey } from '@staff-portal/billing/src/@types/types'

import TimesheetUnsubmitModal from './modules/timesheets/modals/TimesheetUnsubmitModal/components/TimesheetUnsubmitModal'
import TimesheetModal from './modules/timesheets/modals/TimesheetModal/components/TimesheetModal'
import ExtraExpensesAddModal from './modules/extraExpenses/modals/components/ExtraExpensesAddModal'
import PlacementFeesAddModal from './modules/placementFees/modals/components/AddModal'
import BillingCycleSettingsModal from './modules/billingCycleSettings/components/BillingCycleSettingsModal'
import ConsolidationDefaultCreateModal from './modules/consolidationDefaults/modals/ConsolidationDefault/components/CreateModal'
import ConsolidationDefaultUpdateModal from './modules/consolidationDefaults/modals/ConsolidationDefault/components/UpdateModal'
import UnappliedCashRecordModal from './modules/unappliedCash/modals/components/RecordModal'
import CommitmentChangeModal from './modules/commitmentChange/components/CommitmentChangeModal'

export const BillingWidgetsModalsPathsMap: ModalPathsMap = {
  [ModalKey.billingAddressEdit]: lazy(
    () => import('./modules/billingDetails/modals/BillingAddressEdit')
  ),
  [ModalKey.clientRefundCreditBalance]: lazy(
    () => import('./modules/billingInfo/modals/RefundClientCreditBalance')
  ),
  [ModalKey.unappliedCashEntries]: lazy(
    () => import('./modules/billingInfo/modals/UnappliedCashEntriesModal')
  ),
  [ModalKey.clientBusinessTypeUpdate]: lazy(
    () => import('./modules/commission/modals/ClientBusinessTypeUpdate')
  ),
  [ModalKey.clientClaimerUpdate]: lazy(
    () =>
      import(
        './modules/commission/modals/ClientClaimerUpdate/components/ClientClaimerUpdateModal'
      )
  ),
  [ModalKey.clientBillingReportDownload]: lazy(
    () => import('./modules/billingDetails/modals/BillingReportDownload')
  ),
  [ModalKey.changeRoleReferrer]: lazy(
    () => import('./modules/commission/modals/ChangeRoleReferrer')
  ),
  [ModalKey.commitmentMinimumEdit]: lazy(
    () =>
      import(
        './modules/billingDetails/modals/MinimumCommitmentEdit/components/MinimumCommitmentEditModal'
      )
  ),
  [ModalKey.jobCreateTemplate]: lazy(
    () =>
      import(
        './modules/billingDetails/modals/JobTemplate/components/JobCreateTemplateModal'
      )
  ),
  [ModalKey.jobUpdateTemplate]: lazy(
    () =>
      import(
        './modules/billingDetails/modals/JobTemplate/components/JobUpdateTemplateModal'
      )
  ),
  [ModalKey.billingOptionWireVerification]: lazy(
    () => import('./modules/billingDetails/modals/WireVerification')
  ),
  [ModalKey.billingOptionUpdate]: lazy(
    () => import('./modules/billingDetails/modals/BillingOptionUpdate')
  ),

  // ---
  // legacy modals, should be imported in a sync way:
  // (because legacy Platform does not support async-import via usage of webpack 3)
  // ---

  [ModalKey.timesheet]: TimesheetModal,
  [ModalKey.timesheetEdit]: TimesheetModal,
  [ModalKey.timesheetUnsubmit]: TimesheetUnsubmitModal,
  [ModalKey.extraExpenseAdd]: ExtraExpensesAddModal,
  [ModalKey.placementFeeAdd]: PlacementFeesAddModal,
  [ModalKey.billingCycleSettings]: BillingCycleSettingsModal,
  [ModalKey.consolidationDefaultsCreate]: ConsolidationDefaultCreateModal,
  [ModalKey.consolidationDefaultsUpdate]: ConsolidationDefaultUpdateModal,
  [ModalKey.unappliedCashRecord]: UnappliedCashRecordModal,
  [ModalKey.commitmentChange]: CommitmentChangeModal
}
