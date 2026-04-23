export * from './sectionTitles'

export const MESSAGES = {
  matchQualitySection: {
    couldNotLoad: "Checklist couldn't load."
  }
}

export const NOTIFICATIONS = {
  errorOccurred: 'Sorry, something went wrong. Please try again later.',
  job: {
    cannotApply: 'This job is no longer accepting applications.',
    // Looks like a bug to have the same text for confirmation, but it's actually an approved copy
    // https://toptal-core.slack.com/archives/C31KCTD1C/p1626099579160500
    cannotConfirm: 'This job is no longer accepting applications.',
    notFound:
      'This job is no longer available, or you may not be eligible to view it.'
  },
  timeOff: {
    scheduled: 'Time off successfully scheduled.'
  },
  timesheet: {
    submitted: 'Timesheet successfully submitted.',
    updated: 'Timesheet successfully updated.',
    missingNote:
      'Please add detailed notes to provide context on your billed hours.'
  },
  applicationCard: {
    invalid: 'You must include all required information to continue.'
  },
  settings: {
    timeZoneWorkingHours: {
      updated: 'Time zone and preferred hours updated.'
    }
  }
}
