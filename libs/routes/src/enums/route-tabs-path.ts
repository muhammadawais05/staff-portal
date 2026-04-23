export enum StaffTabUrlHash {
  STAFF_PROFILE = 'staff_profile',
  COMMUNITY_LEADER = 'community_leader'
}

export enum CompanyTabUrlHash {
  BASIC_INFO = 'profile',
  INTERNAL_DATA = 'internal_data',
  NOTES = 'notes',
  COMPANY_JOBS = 'company_jobs',
  CONTACTS = 'contacts',
  WEB_AND_SOCIAL = 'web_and_social',
  LEGAL = 'legal',
  BILLING = 'billing',
  TOPSCREEN = 'topscreen',
  /**
   * @deprecated legacy only
   */
  LEGACY_LEGAL_AND_BILLING = 'legal_and_billing'
}

/**
 * @deprecated use `JobTabValue` instead
 */
export enum JobTabUrlHash {
  JOB_DETAILS = 'job_details',
  SOURCING_REQUEST = 'sourcing_request',
  BILLING = 'billing',
  SUMMARY = 'summary'
}

export enum OpportunityTabUrlHash {
  DETAILS = 'details',
  TIMELINE = 'timeline',
  CONTACTS = 'contacts',
  ATTRIBUTION = 'attribution'
}

export enum CommunityLeaderTabUrlHash {
  ACTIVE_LEADERS = 'active_leaders',
  REMOVED_LEADERS = 'removed_leaders',
  APPLICATIONS = 'applications'
}
