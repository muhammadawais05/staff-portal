import {
  CommunityLeaderApplicationStatus,
  CommunityLeaderStatus
} from '@staff-portal/graphql/staff'
import { palette } from '@toptal/picasso/utils'

export const getCommunityLeaderStatus = (
  status: CommunityLeaderStatus
): { label: string; color: string; css: string } => {
  if (!status) {
    return {
      label: 'Not Applied',
      color: palette.grey.dark,
      css: `color: ${palette.grey.dark}`
    }
  }

  return {
    [CommunityLeaderStatus.APPLIED]: {
      label: 'Applied',
      color: palette.yellow.main,
      css: `color: ${palette.yellow.main}`
    },
    [CommunityLeaderStatus.APPROVED]: {
      label: 'Approved',
      color: palette.green.dark,
      css: `color: ${palette.green.dark}`
    },
    [CommunityLeaderStatus.DELETED]: {
      label: 'Deleted',
      color: palette.red.main,
      css: `color: ${palette.red.main}`
    },
    [CommunityLeaderStatus.ON_HOLD]: {
      label: 'Paused',
      color: palette.yellow.main,
      css: `color: ${palette.yellow.main}`
    },
    [CommunityLeaderStatus.REJECTED]: {
      label: 'Rejected',
      color: palette.red.main,
      css: `color: ${palette.red.main}`
    }
  }[status]
}

export const getCommunityLeaderApplicationStatus = (
  status: CommunityLeaderApplicationStatus
): { label: string; color: string; css: string } => {
  if (!status) {
    return {
      label: 'Not Applied',
      color: palette.grey.dark,
      css: `color: ${palette.grey.dark}`
    }
  }

  return {
    [CommunityLeaderApplicationStatus.APPLIED]: {
      label: 'Applied',
      color: palette.yellow.main,
      css: `color: ${palette.yellow.main}`
    },
    [CommunityLeaderApplicationStatus.APPROVED]: {
      label: 'Approved',
      color: palette.green.dark,
      css: `color: ${palette.green.dark}`
    },
    [CommunityLeaderApplicationStatus.ON_HOLD]: {
      label: 'Paused',
      color: palette.yellow.main,
      css: `color: ${palette.yellow.main}`
    },
    [CommunityLeaderApplicationStatus.REJECTED]: {
      label: 'Rejected',
      color: palette.red.main,
      css: `color: ${palette.red.main}`
    }
  }[status]
}
