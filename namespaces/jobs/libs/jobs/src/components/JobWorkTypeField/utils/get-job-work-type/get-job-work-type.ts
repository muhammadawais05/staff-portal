import { JobWorkType } from '@staff-portal/graphql/staff'
import { capitalize } from '@toptal/picasso/utils'

export const getJobWorkType = (
  workType: JobWorkType,
  timeLengthOnsite?: number | null
) => {
  if (workType !== JobWorkType.MIXED) {
    return capitalize(workType.toLowerCase())
  }

  const timeLengthOnSiteStr: { [index: number]: string } = {
    0: '1-4 weeks',
    1: '10%',
    2: '20%',
    3: '30%',
    4: '40%',
    5: '50%',
    6: '60%',
    7: '70%',
    8: '80%'
  }

  return timeLengthOnsite != null
    ? `Mixed (${timeLengthOnSiteStr[timeLengthOnsite]} on-site)`
    : capitalize(workType.toLowerCase())
}
