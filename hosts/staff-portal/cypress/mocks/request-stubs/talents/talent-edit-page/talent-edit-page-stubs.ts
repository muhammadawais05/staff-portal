import { Talent } from '@staff-portal/graphql/staff'

export const talentEditPageStubs = (talent?: Partial<Talent>) => ({
  GetEmailContacts: {
    data: {
      viewer: {
        me: {
          id: 'VjEtU3RhZmYtMzg4Njk5',
          contacts: {
            nodes: [
              {
                id: 'VjEtQ29udGFjdC0yOTg2NTk',
                value: 'arij-513e7c3fe259cead@toptal.io',
                __typename: 'Contact'
              }
            ],
            __typename: 'ContactConnection'
          },
          __typename: 'Staff'
        },
        __typename: 'Viewer'
      }
    }
  },
  GetTeamsWithEmailTracking: {
    data: {
      viewer: {
        me: {
          id: 'VjEtU3RhZmYtMzg4Njk5',
          teams: {
            nodes: [],
            __typename: 'TeamConnection'
          },
          __typename: 'Staff'
        },
        __typename: 'Viewer'
      }
    }
  },
  GetTalentUpdate: {
    data: {
      viewer: {
        permits: {
          accessTalentInternals: true,
          manageTalentBillingName: false,
          editTalentTopSkill: true,
          hideTalentFromRobots: true,
          __typename: 'Permits'
        },
        __typename: 'Viewer'
      },
      node: {
        id: '123',
        fullName: 'Ludie Yost',
        type: 'ProductManager',
        email: 'jmoy-00411908dea14e66@toptal.io',
        toptalEmail: 'jack-4f591f95a3f191d9@toptal.io',
        phoneNumber: '+4915156002127',
        skype: 'ludie_yost3169303',
        legalName: 'ludie yost',
        billingName: null,
        useBillingName: false,
        hourlyRate: '100.0',
        talentPartner: null,
        profile: {
          id: 'VjEtVGFsZW50UHJvZmlsZS0xNzE1MjU3',
          topSkill: null,
          website: null,
          __typename: 'TalentProfile'
        },
        talentPartnership: null,
        hiddenFromRobots: false,
        hiddenFromPublicAccess: false,
        featured: true,
        webResource: {
          url: 'https://staging.toptal.net/platform/staff/talents/3264111',
          __typename: 'Link'
        },
        locationV2: {
          country: {
            id: 'VjEtQ291bnRyeS04Mg',
            __typename: 'Country'
          },
          cityName: 'Berlin',
          placeId: 'ChIJAVkDPzdOqEcRcDteW0YgIQQ',
          __typename: 'Location'
        },
        timeZone: {
          name: '(UTC+02:00) Europe - Berlin',
          value: 'Europe/Berlin',
          __typename: 'TimeZone'
        },
        citizenship: {
          id: 'VjEtQ291bnRyeS0yMzM',
          __typename: 'Country'
        },
        operations: {
          updateTalentProfile: {
            callable: 'ENABLED',
            messages: [],
            __typename: 'Operation'
          },
          updateTalentHourlyRate: {
            callable: 'ENABLED',
            messages: [],
            __typename: 'Operation'
          },
          __typename: 'TalentOperations'
        },
        languages: {
          nodes: [
            {
              id: 'VjEtTGFuZ3VhZ2UtMQ',
              name: 'English',
              __typename: 'Language'
            }
          ],
          __typename: 'LanguageConnection'
        },
        linkedinUrl: 'https://www.linkedin.com/in/obfuscated.profile',
        admissionPostUrl: null,
        twitter: null,
        ...talent,
        __typename: 'Talent'
      }
    }
  }
})
