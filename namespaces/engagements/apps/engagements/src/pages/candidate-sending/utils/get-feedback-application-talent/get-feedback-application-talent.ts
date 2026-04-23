type AvailabilityRequestTalent<T> = {
  availabilityRequestTalent?: T
}

type JobApplicationTalent<T> = {
  jobApplicationTalent: T
}

export const getFeedbackApplicationTalent = <T>(
  data?: AvailabilityRequestTalent<T> | JobApplicationTalent<T> | null
) => {
  if (!data) {
    return
  }

  return 'availabilityRequestTalent' in data
    ? data.availabilityRequestTalent
    : 'jobApplicationTalent' in data
    ? data.jobApplicationTalent
    : null
}
