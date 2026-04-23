import {
  LeadProbabilityBucket,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'

export const companyMock = {
  id: 'VjEtQ2xpZW50LTMwMjc0Nw',
  fullName: 'Berge, Sanford and Shields',
  businessType: 'Enterprise business',
  claimableSince: '2019-04-10T21:35:03-05:00',
  createdAt: '2019-04-10T21:35:01-05:00',
  cumulativeStatus: 'BAD_LEAD',
  daysInFunnel: 568,
  email: 'sasm-1203f538007e228e@toptal.io',
  interestedIn: 'Developers',
  reviewStatus: 'NONE',
  twitter: 'proctergamble',
  website: 'http://www.pg.com',
  applicationInfo: null,
  claimer: {
    id: 'VjEtU3RhZmYtMTE0OTkyOQ',
    webResource: {
      text: 'Drew Ritter',
      url: 'https://staging.toptal.net/platform/staff/staff/1149929',
      __typename: 'Link'
    },
    __typename: 'Staff',
    fullName: 'Drew Ritter'
  },
  contact: {
    id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTE0MDcxMjE',
    webResource: {
      text: 'Carey Reichert',
      url: 'https://staging.toptal.net/platform/staff/company_representatives/1407121',
      __typename: 'Link'
    },
    __typename: 'CompanyRepresentative',
    fullName: 'Carey Reichert',
    contacts: {
      nodes: [
        {
          id: 'VjEtQ29udGFjdC0xODQyODMy',
          type: 'EMAIL',
          value: 'sasm-1203f538007e228e@toptal.io',
          __typename: 'Contact'
        }
      ],
      __typename: 'ContactConnection'
    },
    invitedToLoginAt: null,
    operations: {
      inviteToLoginCompanyRepresentative: {
        callable: 'DISABLED',
        messages: [
          'Primary contact can only be invited when the company has been approved.'
        ],
        __typename: 'Operation'
      },
      __typename: 'CompanyRepresentativeOperations'
    },
    client: {
      id: '1',
      portalPermissionsEnabled: true
    }
  },
  country: {
    id: 'test-id',
    name: 'Singapore',
    __typename: 'Country'
  },
  leadPotential: {
    leadProbabilityBucket: LeadProbabilityBucket.MEDIUM,
    __typename: 'ClientLeadPotential'
  },
  scoreExplanation: {
    negativeFeatures: [
      {
        name: 'email_type',
        position: 1,
        value: 'gmail',
        __typename: 'ScoreFeature'
      }
    ],
    positiveFeatures: [
      {
        name: 'ready_to_start',
        position: 5,
        value: 'immediately',
        __typename: 'ScoreFeature'
      }
    ],
    __typename: 'ScoreExplanation'
  },
  photo: null,
  referrer: null,
  reviewAttempts: {
    totalCount: 0,
    __typename: 'ReviewAttemptConnection'
  },
  timeZone: {
    name: '(UTC+08:00) Asia - Singapore',
    value: 'Asia/Singapore',
    __typename: 'TimeZone'
  },
  engagements: {
    totalCount: 0,
    __typename: 'ClientEngagementConnection'
  },
  billingVerifiedAt: null,
  updateProfileUrl:
    'https://staging.toptal.net/platform/companies/update_profile?role_id=1407120',
  companyLegacyId: 1407120,
  lastAnsweredPromotion: null,
  promotions: {
    webResource: {
      url: 'https://staging.toptal.net/platform/staff/companies/1407120/promotions',
      __typename: 'Link'
    },
    __typename: 'PromotionsConnection'
  },
  __typename: 'Client',
  flags: {
    nodes: [
      {
        id: 'VjEtUm9sZUZsYWctMjcwODY0',
        flag: {
          title: 'VIP',
          __typename: 'Flag',
          id: 'VjEtUm9sZUZsYWctMjcwODY0',
          color: 'red',
          targetRole: 'Some role'
        },
        comment: 'This part was obfuscated, some content was here.',
        flaggedBy: null,
        createdAt: '2019-04-10T21:35:01-05:00',
        updatedAt: '2019-04-10T21:35:01-05:00',
        __typename: 'RoleFlag',
        operations: {
          updateRoleFlag: {
            callable: OperationCallableTypes.ENABLED,
            messages: []
          },
          removeRoleFlag: {
            callable: OperationCallableTypes.ENABLED,
            messages: []
          }
        }
      }
    ],
    __typename: 'RoleFlagConnection'
  },
  totalJobs: {
    totalCount: 0,
    __typename: 'ClientJobConnection'
  },
  activeJobs: {
    totalCount: 0,
    __typename: 'ClientJobConnection'
  },
  jobsForVerticalsEngaged: {
    verticalsEngaged: [],
    __typename: 'ClientJobConnection'
  },
  representatives: {
    nodes: [
      {
        id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTE0MDcxMjE',
        webResource: {
          text: 'Carey Reichert',
          url: 'https://staging.toptal.net/platform/staff/company_representatives/1407121',
          __typename: 'Link'
        },
        __typename: 'CompanyRepresentative',
        fullName: 'Carey Reichert',
        currentSignInAt: null,
        currentSignInIp: '165.225.112.105',
        ipLocation: {
          cityName: 'Singapore',
          countryName: 'Singapore',
          __typename: 'Location'
        }
      }
    ],
    __typename: 'ClientRepresentativesConnection'
  },
  investigations: {
    nodes: [],
    __typename: 'InvestigationConnection'
  },
  operations: {
    blackFlagClient: {
      callable: 'ENABLED',
      messages: [],
      __typename: 'Operation'
    },
    markClientAsBadLead: {
      callable: 'HIDDEN',
      messages: ['Something went wrong. Please try again later.'],
      __typename: 'Operation'
    },
    pauseClient: {
      callable: 'HIDDEN',
      messages: ['Something went wrong. Please try again later.'],
      __typename: 'Operation'
    },
    repauseClient: {
      callable: 'HIDDEN',
      messages: [
        'Company should be in paused state',
        'Something went wrong. Please try again later.'
      ],
      __typename: 'Operation'
    },
    resumeClient: {
      callable: 'HIDDEN',
      messages: [
        'Company should be in paused state',
        'Something went wrong. Please try again later.'
      ],
      __typename: 'Operation'
    },
    updateProfileClient: {
      callable: 'ENABLED',
      messages: [],
      __typename: 'Operation'
    },
    rejectClient: {
      callable: 'HIDDEN',
      messages: ['Something went wrong. Please try again later.'],
      __typename: 'Operation'
    },
    restoreClient: {
      callable: 'HIDDEN',
      messages: [],
      __typename: 'Operation'
    },
    restoreClientFromBadLead: {
      callable: 'HIDDEN',
      messages: [],
      __typename: 'Operation'
    },
    createActivity: {
      callable: 'ENABLED',
      messages: [],
      __typename: 'Operation'
    },
    patchClientProfile: {
      callable: 'ENABLED',
      messages: [],
      __typename: 'Operation'
    },
    updateClientLegalName: {
      callable: 'ENABLED',
      messages: [],
      __typename: 'Operation'
    },
    __typename: 'ClientOperations'
  },
  invoices: {
    totalAmount: '0',
    __typename: 'ClientInvoiceConnection'
  },
  overdueInvoices: {
    totalCount: 0,
    __typename: 'ClientInvoiceConnection'
  },
  webResource: {
    url: 'https://staging.toptal.net/platform/staff/companies/1407120',
    text: 'Berge, Sanford and Shields',
    __typename: 'Link'
  }
}
