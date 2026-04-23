import { EngagementCommitmentEnum, Maybe } from '@staff-portal/graphql/staff'

import { ApproveCommitmentChangeRequestEngagementFragment } from '../../../ApproveCommitmentChangeRequestModal/data'
import { formatRate } from '../format-rate'

type Props = {
  newAvailability?: Maybe<EngagementCommitmentEnum>
  engagement: ApproveCommitmentChangeRequestEngagementFragment
}

export const getInitialRates = ({
  newAvailability,
  engagement: {
    companyFullTimeRate,
    companyHourlyRate,
    companyPartTimeRate,
    talentFullTimeRate,
    talentHourlyRate,
    talentPartTimeRate
  }
}: Props) => {
  let companyRate
  let talentRate

  switch (newAvailability) {
    case EngagementCommitmentEnum.FULL_TIME:
      companyRate = companyFullTimeRate
      talentRate = talentFullTimeRate
      break
    case EngagementCommitmentEnum.PART_TIME:
      companyRate = companyPartTimeRate
      talentRate = talentPartTimeRate
      break
    case EngagementCommitmentEnum.HOURLY:
      companyRate = companyHourlyRate
      talentRate = talentHourlyRate
      break
  }

  return {
    companyRate: formatRate(companyRate),
    talentRate: formatRate(talentRate)
  }
}
