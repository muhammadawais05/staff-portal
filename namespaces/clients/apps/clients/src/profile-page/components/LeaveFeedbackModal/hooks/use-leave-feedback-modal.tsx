import { useModal } from '@staff-portal/modals-service'
import { Link } from '@staff-portal/graphql/staff'

import { SurveyEngagementFragment } from '../../../data/survey-engagement-fragment'
import LeaveFeedbackModal from '../LeaveFeedbackModal'

const useLeaveFeedbackModal = ({
  companyId,
  companyWebResource,
  engagements
}: {
  companyId: string
  companyWebResource: Link
  engagements: SurveyEngagementFragment['engagements']
}) => {
  const { showModal } = useModal(LeaveFeedbackModal, {
    companyId,
    companyWebResource,
    engagements
  })

  return {
    showModal
  }
}

export default useLeaveFeedbackModal
