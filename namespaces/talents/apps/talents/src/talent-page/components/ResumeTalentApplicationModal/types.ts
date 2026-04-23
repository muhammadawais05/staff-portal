import { ModalComponentBaseProps } from '@staff-portal/modals-service'
export interface ResumeTalentApplicationModalProps
  extends ModalComponentBaseProps {
  talentId: string
  manualRestorationAvailable?: boolean | null
  onSendToPortfolioReview?: (emailTemplateId?: string) => void
}
