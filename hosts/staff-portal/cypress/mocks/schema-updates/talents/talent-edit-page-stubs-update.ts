import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Talent } from '@staff-portal/graphql/staff'

import { talentEditPageStubs } from '~integration/mocks/request-stubs'
import {
  getCountriesResponse,
  getLanguagesResponse,
  getPendoVisitorResponse
} from '~integration/mocks/responses'

const updateTalentEditPageStubs = (talent?: Partial<Talent>) =>
  cy.stubGraphQLRequests({
    ...talentEditPageStubs(talent),
    GetUnfilledCallsCount: {
      data: {
        viewer: {
          calls: {
            totalCount: 50,
            __typename: 'CallsConnection'
          },
          __typename: 'Viewer'
        }
      }
    },
    GetRoleProfilePhoto: {
      data: {
        staffNode: {
          id: '123',
          fullName: 'Ludie Yost',
          photo: null,
          operations: {
            updateRolePhoto: {
              callable: 'ENABLED',
              messages: [],
              __typename: 'Operation'
            },
            __typename: 'TalentOperations'
          },
          __typename: 'Talent'
        }
      }
    },
    GetCountries: getCountriesResponse(),
    GetTalentPartners: {
      data: {
        viewer: {
          permits: {
            assignTalentPartner: false,
            __typename: 'Permits'
          },
          __typename: 'Viewer'
        },
        talentPartners: null
      }
    },
    GetAvailableTimeZones: {
      data: {
        availableTimeZones: [
          {
            name: '(UTC-06:00) America - Chicago',
            value: 'America/Chicago',
            __typename: 'TimeZone'
          },
          {
            name: '(UTC-05:00) America - New York',
            value: 'America/New_York',
            __typename: 'TimeZone'
          }
        ]
      }
    },
    GetPendoVisitor: getPendoVisitorResponse(),
    GetLanguages: getLanguagesResponse(),
    PhotoAndCrop: {
      data: {
        staffNode: {
          id: encodeEntityId('123', 'Talent'),
          photo: null,
          __typename: 'Talent'
        }
      }
    },
    PhotoRequirements: {
      data: {
        photoRequirements: {
          filetypes: 'jpg jpeg png',
          minDimension: {
            height: 1000,
            width: 1000,
            __typename: 'Dimensions'
          },
          sizeLimitMB: 25,
          __typename: 'PhotoRequirements'
        }
      }
    },
    UpdateRolePhoto: {
      data: {
        updateRolePhoto: {
          role: {
            id: encodeEntityId('123', 'Talent'),
            photo: {
              default:
                'https://uploads-staging.toptal.io/profile_photo/image/user/3169303/default_2916fe99a6580ea17b8785fc3a1de109.jpg',
              huge: 'https://uploads-staging.toptal.io/profile_photo/image/user/3169303/huge_2916fe99a6580ea17b8785fc3a1de109.jpg',
              icon: 'https://uploads-staging.toptal.io/profile_photo/image/user/3169303/icon_2916fe99a6580ea17b8785fc3a1de109.jpg',
              large:
                'https://uploads-staging.toptal.io/profile_photo/image/user/3169303/large_2916fe99a6580ea17b8785fc3a1de109.jpg',
              skillPageAvatar:
                'https://uploads-staging.toptal.io/profile_photo/image/user/3169303/skill_page_avatar_2916fe99a6580ea17b8785fc3a1de109.jpg',
              small:
                'https://uploads-staging.toptal.io/profile_photo/image/user/3169303/small_2916fe99a6580ea17b8785fc3a1de109.jpg',
              thumb:
                'https://uploads-staging.toptal.io/profile_photo/image/user/3169303/thumb_2916fe99a6580ea17b8785fc3a1de109.jpg',
              original:
                'https://uploads-staging.toptal.io/profile_photo/image/user/3169303/2916fe99a6580ea17b8785fc3a1de109.jpg',
              __typename: 'Photo',
              transformations: {
                cropped: {
                  cropX: 0,
                  cropY: 0,
                  cropW: 1010,
                  cropH: 1010,
                  __typename: 'PhotoTransformation'
                },
                __typename: 'PhotoTransformations'
              }
            },
            __typename: 'Talent'
          },
          success: true,
          errors: [],
          __typename: 'UpdateRolePhotoPayload'
        }
      }
    }
  })

export default updateTalentEditPageStubs
