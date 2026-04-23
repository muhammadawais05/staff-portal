import { ApproveCommitmentChangeRequestDataFragment } from '../../../ApproveCommitmentChangeRequestModal/data'
import { ApproveCommitmentChangeRequestFormValues } from '../../types'
import { getInitialRates } from '../get-initial-rates'

type Props = {
  commitmentChangeRequest: ApproveCommitmentChangeRequestDataFragment
}

export const prepareInitialValues = ({
  commitmentChangeRequest
}: Props): Partial<ApproveCommitmentChangeRequestFormValues> => {
  const { changeDate, engagement, newAvailability } = commitmentChangeRequest
  const initialRates = engagement
    ? getInitialRates({ engagement, newAvailability })
    : undefined

  return {
    ...initialRates,
    changeDate: changeDate ?? undefined,
    notifyCompany: true,
    notifyTalent: true
  }
}
