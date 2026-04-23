import { Client } from '@staff-portal/graphql/staff'

import { financialInformationMock } from './financial-information-mock'
import { inDepthCompanyResearchMock } from './in-depth-company-research-mock'
import { socialMediaMock } from './social-media-mock'
import { clientNodeMock } from '~integration/mocks/fragments/client-node-mock'
import { webResourceMock } from '~integration/mocks/fragments/web-resource-mock'

export const clientWebNSocialMock = (node?: Partial<Client>) => ({
  id: 'VjEtQ2xpZW50LTUyODg4NQ',
  companyLegacyId: 12300,
  fullName: 'Ritchie-Jewess BU',
  casesUrl: 'https://staging.toptal.net/platform/staff/roles/2596580/cases',
  gdprReportUrl:
    'https://staging.toptal.net/platform/gdpr_report?user_id=1142613',
  emailMessagesUrl:
    'http://staging.toptal.net/companies/2596580/email_messages',
  referralsUrl: 'https://staging.toptal.net/referrals',
  updateProfileUrl:
    'https://staging.toptal.net/platform/companies/update_profile?role_id=123',
  ...inDepthCompanyResearchMock(),
  ...financialInformationMock(),
  ...socialMediaMock(),
  ...webResourceMock({
    text: '123',
    url: 'test-url'
  }),
  representatives: {
    totalCount: 0
  },
  operations: {
    ...clientNodeMock().node().operations
  },
  ...node
})
