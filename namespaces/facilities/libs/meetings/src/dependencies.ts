import { defineDependency } from '@staff-portal/dependency-injector'

type UseSendModalReturnValue = {
  showModal: ({ talentId }: { talentId?: string }) => void
}

export const MEETING_CANCELED_NEXT_ACTION_HOOKS = defineDependency<{
  useSendRescheduleReviewCallEmailModal: () => UseSendModalReturnValue
  useSendRescheduleScreeningEmailModal: () => UseSendModalReturnValue
}>()
