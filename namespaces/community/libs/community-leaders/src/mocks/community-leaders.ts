import {
  CommunityLeaderRecordStatus,
  CommunityLeaderStatus,
  CommunityLeaderType
} from '@staff-portal/graphql/staff'

import { CommunityLeader } from '../types'

const mockDate = '2021-08-06'

export const communityLeadersListMock: CommunityLeader[] = [
  {
    id: '1',
    node: {
      id: '1',
      featuredOrder: 1,
      createdAt: mockDate,
      requestedAt: mockDate,
      reviewedAt: mockDate,
      type: CommunityLeaderType.COMMUNITY_LEADER,
      leaderStatus: CommunityLeaderRecordStatus.ACTIVE
    },
    status: CommunityLeaderStatus.APPROVED,
    type: CommunityLeaderType.COMMUNITY_LEADER,
    appliedStaffRole: {
      id: '1',
      email: 'alex.casillas@toptal.com',
      fullName: 'Alex Casillas',
      photo: {
        default: ''
      },
      location: {
        country: {
          id: '1',
          name: 'Spain'
        },
        cityName: 'Córdoba',
        stateName: 'Andalucía'
      },
      webResource: {
        text: 'Name',
        url: null
      }
    }
  },
  {
    id: '2',
    node: {
      id: '2',
      featuredOrder: 0,
      createdAt: mockDate,
      requestedAt: mockDate,
      reviewedAt: mockDate,
      type: CommunityLeaderType.COMMUNITY_LEADER,
      leaderStatus: CommunityLeaderRecordStatus.ACTIVE
    },
    status: CommunityLeaderStatus.APPROVED,
    type: CommunityLeaderType.COMMUNITY_LEADER,
    appliedStaffRole: {
      id: '2',
      email: 'diogo.lessa@toptal.com',
      fullName: 'Diogo Lessa',
      photo: {
        default: ''
      },
      location: {
        country: {
          id: '1',
          name: 'Spain'
        },
        cityName: 'Córdoba',
        stateName: 'Andalucía'
      },
      webResource: {
        text: 'Name',
        url: null
      }
    }
  },
  {
    id: '3',
    node: {
      id: '3',
      featuredOrder: 0,
      createdAt: mockDate,
      requestedAt: mockDate,
      reviewedAt: mockDate,
      type: CommunityLeaderType.COMMUNITY_LEADER,
      leaderStatus: CommunityLeaderRecordStatus.ACTIVE
    },
    status: CommunityLeaderStatus.APPROVED,
    type: CommunityLeaderType.COMMUNITY_LEADER,
    appliedStaffRole: {
      id: '3',
      email: 'pavel.tumash@toptal.com',
      fullName: 'Pavel Tumash',
      photo: {
        default: ''
      },
      location: {
        country: {
          id: '1',
          name: 'Spain'
        },
        cityName: 'Córdoba',
        stateName: 'Andalucía'
      },
      webResource: {
        text: 'Name',
        url: null
      }
    }
  },
  {
    id: '4',
    node: {
      id: '4',
      featuredOrder: 0,
      createdAt: mockDate,
      requestedAt: mockDate,
      reviewedAt: mockDate,
      type: CommunityLeaderType.COMMUNITY_LEADER,
      leaderStatus: CommunityLeaderRecordStatus.ACTIVE
    },
    status: CommunityLeaderStatus.DELETED,
    type: CommunityLeaderType.COMMUNITY_LEADER,
    appliedStaffRole: {
      id: '4',
      email: 'ilya.erin@toptal.com',
      fullName: 'Ilya Erin',
      photo: {
        default: ''
      },
      location: {
        country: {
          id: '1',
          name: 'Spain'
        },
        cityName: 'Córdoba',
        stateName: 'Andalucía'
      },
      webResource: {
        text: 'Name',
        url: null
      }
    }
  },
  {
    id: '5',
    node: {
      id: '5',
      featuredOrder: 0,
      createdAt: mockDate,
      requestedAt: mockDate,
      reviewedAt: mockDate,
      type: CommunityLeaderType.COMMUNITY_LEADER,
      leaderStatus: CommunityLeaderRecordStatus.ACTIVE
    },
    status: CommunityLeaderStatus.DELETED,
    type: CommunityLeaderType.COMMUNITY_LEADER,
    appliedStaffRole: {
      id: '5',
      email: 'dimitri.kurashvili@toptal.com',
      fullName: 'Dimitri Kurashvili',
      photo: {
        default: ''
      },
      location: {
        country: {
          id: '1',
          name: 'Spain'
        },
        cityName: 'Córdoba',
        stateName: 'Andalucía'
      },
      webResource: {
        text: 'Name',
        url: null
      }
    }
  },
  {
    id: '6',
    node: {
      id: '6',
      featuredOrder: 0,
      createdAt: mockDate,
      requestedAt: mockDate,
      reviewedAt: mockDate,
      type: CommunityLeaderType.COMMUNITY_LEADER,
      leaderStatus: CommunityLeaderRecordStatus.ACTIVE
    },
    status: CommunityLeaderStatus.DELETED,
    type: CommunityLeaderType.COMMUNITY_LEADER,
    appliedStaffRole: {
      id: '6',
      email: 'anton.smagin@toptal.com',
      fullName: 'Anton Smagin',
      photo: {
        default: ''
      },
      location: {
        country: {
          id: '1',
          name: 'Spain'
        },
        cityName: 'Córdoba',
        stateName: 'Andalucía'
      },
      webResource: {
        text: 'Name',
        url: null
      }
    }
  },
  {
    id: '7',
    node: {
      id: '7',
      featuredOrder: 0,
      createdAt: mockDate,
      requestedAt: mockDate,
      reviewedAt: mockDate,
      type: CommunityLeaderType.COMMUNITY_LEADER,
      leaderStatus: CommunityLeaderRecordStatus.ACTIVE
    },
    status: CommunityLeaderStatus.DELETED,
    type: CommunityLeaderType.COMMUNITY_LEADER,
    appliedStaffRole: {
      id: '7',
      email: 'vladyslav.kozin@toptal.com',
      fullName: 'Vladyslav Kozin',
      photo: {
        default: ''
      },
      location: {
        country: {
          id: '1',
          name: 'Spain'
        },
        cityName: 'Córdoba',
        stateName: 'Andalucía'
      },
      webResource: {
        text: 'Name',
        url: null
      }
    }
  }
]
