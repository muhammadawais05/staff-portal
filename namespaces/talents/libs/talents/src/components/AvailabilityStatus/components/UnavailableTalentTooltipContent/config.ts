export const REJECT_REASON_KEY_OTHER = 'other'
export const REJECT_REASON_OTHER = 'Other'

export const REJECT_REASON_MAPPING: Record<string, string> = {
  another_freelance_job: 'Found another freelance job elsewhere',
  another_onsite_full_time: 'Accepted another onsite full-time job',
  another_remote_full_time: 'Accepted another remote full-time job',
  lack_of_jobs:
    'Not interested in Toptal because of the number of appropriate jobs',
  lack_of_quality: 'Not interested in Toptal because of the quality of service',
  not_working: 'Not working right now',
  [REJECT_REASON_KEY_OTHER]: 'Other'
}
