import {
  PaymentHold,
  PaymentHoldAutomaticExpiration,
  Scalars
} from '@staff-portal/graphql/staff'
import { TalentFragment } from '@staff-portal/talents'

export enum TabType {
  AUTOMATIC = 0,
  MANUAL = 1
}
export interface CreateHoldPaymentsModalProps {
  talentId: string
  fullName: string
  hideModal: () => void
  paymentsHoldDescription: TalentFragment['paymentsHoldDescription']
}

export interface FormDescriptionProps {
  currentTab: TabType
}
export interface CreateHoldPaymentsActionsProps {
  loading: boolean
  onClick: () => void
}

export interface CreatePaymentHoldFormValuesProps {
  holdType: PaymentHold
  expirationType: PaymentHoldAutomaticExpiration
  expireOn?: Scalars['Date']
  expireAtThreshold?: string
  comment: string
}
