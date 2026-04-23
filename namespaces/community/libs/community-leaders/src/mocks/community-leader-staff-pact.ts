import { pactMatchers, Matchers } from '@staff-portal/pact-utils'

const { string, boolean, eachLike } = Matchers

export const communityLeaderStaffMock = {
  data: {
    staffNode: {
      activatedAt: pactMatchers.time(),
      applicationInfo: null,
      associatedRoles: {
        nodes: eachLike([]),
        __typename: 'RoleOrClientConnection'
      },
      billingNotes: null,
      canIssueSourcingCommission: boolean(false),
      citizenship: {
        id: pactMatchers.id(),
        name: string('Croatia'),
        __typename: 'Country'
      },
      cityDescription: string('Rijeka'),
      cumulativeStatus: string('ACTIVE'),
      currentSignInAt: pactMatchers.time(),
      currentSignInIp: string('80.107.26.178'),
      email: string('igor-e8cbd090d622caf5@toptal.io'),
      fullName: string('Carina Rodriguez'),
      id: pactMatchers.id(),
      ipLocation: {
        cityName: string('Athens'),
        countryName: string('Greece'),
        __typename: 'Location'
      },
      languages: {
        nodes: eachLike([
          {
            id: pactMatchers.id(),
            name: string('Croatian'),
            __typename: 'Language'
          }
        ]),
        __typename: 'LanguageConnection'
      },
      locationV2: {
        countryName: string('Croatia'),
        __typename: 'Location'
      },
      ofacStatus: string('NORMAL'),
      otherRoles: {
        nodes: eachLike([
          {
            id: pactMatchers.id(),
            type: string('Leader'),
            webResource: {
              url: string(
                'https://staging.toptal.net/platform/staff/leaders/604557'
              ),
              __typename: 'Link'
            },
            cumulativeStatus: string('ACTIVE'),
            __typename: 'Leader'
          }
        ]),
        __typename: 'RoleOrClientConnection'
      },
      slackContacts: {
        nodes: eachLike([
          {
            id: pactMatchers.id(),
            webResource: {
              text: string('Carina Rodriguez'),
              url: string(
                'https://toptal.slack.com/app_redirect?channel=U01V22TAAPQ'
              ),
              __typename: 'Link'
            },
            __typename: 'Contact'
          }
        ]),
        __typename: 'ContactConnection'
      },
      phoneContacts: {
        nodes: eachLike([
          {
            id: pactMatchers.id(),
            value: string('+385915487155'),
            primary: boolean(true),
            __typename: 'Contact'
          }
        ]),
        __typename: 'ContactConnection'
      },
      skypeContacts: {
        nodes: eachLike([]),
        __typename: 'ContactConnection'
      },
      timeZone: {
        name: string('(UTC+01:00) Europe - Zagreb'),
        value: string('Europe/Zagreb'),
        __typename: 'TimeZone'
      },
      __typename: 'Staff',
      unallocatedMemorandum: {
        totalAmount: string('0'),
        webResource: {
          url: string(
            'https://staging.toptal.net/platform/staff/memos?badges%5Bmanager_ids%5D=301447&status=unallocated'
          ),
          text: string('0'),
          __typename: 'Link'
        },
        __typename: 'UnallocatedMemorandumConnection'
      },
      visualComplianceStatus: string('NOT_FULLY_CHECKED'),
      type: string('Staff')
    }
  }
}

export const communityLeaderStaffMockCheck = {
  staffNode: {
    otherRoles: {
      nodes: [
        [
          {
            webResource: {
              __typename: 'Link'
            },
            __typename: 'Leader'
          }
        ]
      ],
      __typename: 'RoleOrClientConnection'
    },
    slackContacts: {
      nodes: [
        [
          {
            __typename: 'Contact',
            webResource: {
              __typename: 'Link'
            }
          }
        ]
      ],
      __typename: 'ContactConnection'
    },
    phoneContacts: {
      nodes: [
        [
          {
            __typename: 'Contact'
          }
        ]
      ],
      __typename: 'ContactConnection'
    },
    skypeContacts: {
      __typename: 'ContactConnection'
    },
    locationV2: {
      __typename: 'Location'
    },
    timeZone: {
      __typename: 'TimeZone'
    },
    citizenship: {
      __typename: 'Country'
    },
    ipLocation: {
      __typename: 'Location'
    },
    languages: {
      nodes: [
        [
          {
            __typename: 'Language'
          }
        ]
      ],
      __typename: 'LanguageConnection'
    },
    unallocatedMemorandum: {
      webResource: {
        __typename: 'Link'
      },
      __typename: 'UnallocatedMemorandumConnection'
    },
    associatedRoles: {
      __typename: 'RoleOrClientConnection'
    }
  }
}
