import React, { ComponentProps } from 'react'
import { ExpectedCommissionKind } from '@staff-portal/graphql/staff'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import Component from '.'

jest.mock('@staff-portal/billing/src/components/WebResourceLinkWrapper')

const render = (props: ComponentProps<typeof Component>) =>
  renderComponent(<Component {...props} />)

const defaultReasonTalent = {
  __typename: 'Talent',
  roleType: 'Product manager',
  fullName: 'George Aidonidis',
  id: 'VjEtVGFsZW50LTk5OQ==',
  webResource: {
    __typename: 'Link',
    text: 'George Aidonidis',
    url: 'http://localhost:3000/platform/staff/talent/999'
  }
}
const defaultReasonJob = {
  __typename: 'Job',
  id: 'VjEtVGFsZW50LTk5OQ==',
  webResource: {
    __typename: 'Link',
    text: 'Some job',
    url: 'http://localhost:3000/platform/staff/job/999'
  }
}
const defaultReasonClient = {
  __typename: 'Client',
  id: 'VjEtVGFsZW50LTk5OQ==',
  webResource: {
    __typename: 'Link',
    text: 'Some client',
    url: 'http://localhost:3000/platform/staff/client/999'
  }
}
const defaultReason = {
  __typename: 'Default',
  fullName: 'José Silva',
  id: 'VjEtU3RhZmYtMTQ1NTA4Mg',
  job: defaultReasonJob,
  client: defaultReasonClient,
  talent: defaultReasonTalent,
  roleStepTalent: defaultReasonTalent,
  referrer: {
    __typename: 'Staff',
    fullName: 'Peter Marosi',
    id: 'VjEtU3RhZmYtNzc3',
    roleType: 'designer',
    webResource: {
      __typename: 'Link',
      text: 'Peter Marosi',
      url: 'http://localhost:3000/platform/staff/staff/777'
    }
  },
  webResource: {
    __typename: 'Link',
    text: 'José Silva',
    url: 'http://localhost:3000/platform/staff/staff/1455082'
  }
}

// TODO refactor the test according to the document
// https://toptal-core.atlassian.net/wiki/spaces/ENG/pages/1949991124/Frontend+Testing+-+Testing+props+passed+to+components
// https://toptal-core.atlassian.net/browse/SPB-2801
describe('#ExpectedCommissionShortDescription', () => {
  describe.each([
    [
      ExpectedCommissionKind.SOURCING_COMMISSION,
      '<span class="MuiTypography-root PicassoTypography-bodyInherit-9 MuiTypography-body1" data-testid="ExpectedCommissionShortDescription">Commission for sourcing product manager <a data-testid="user-link" href="http://localhost:3000/platform/staff/talent/999">George Aidonidis</a></span>',
      {
        reason: {
          __typename: 'Talent',
          roleType: 'Product manager',
          fullName: 'José Silva',
          id: 'VjEtU3RhZmYtMTQ1NTA4Mg',
          talent: defaultReasonTalent,
          roleStepTalent: defaultReasonTalent,
          sourcedByTalentAcquisitionTeam: true,
          webResource: {
            __typename: 'Link',
            text: 'José Silva',
            url: 'http://localhost:3000/platform/staff/staff/1455082'
          }
        }
      }
    ],
    [
      ExpectedCommissionKind.SOURCING_COMMISSION,
      '<span class="MuiTypography-root PicassoTypography-bodyInherit-9 MuiTypography-body1" data-testid="ExpectedCommissionShortDescription">Commission for referring company <a data-testid="user-link" href="http://localhost:3000/platform/staff/talent/999">George Aidonidis</a></span>',
      {
        reason: {
          __typename: 'Talent',
          fullName: 'José Silva',
          id: 'VjEtU3RhZmYtMTQ1NTA4Mg',
          talent: defaultReasonTalent,
          roleStepTalent: defaultReasonTalent,
          webResource: {
            __typename: 'Link',
            text: 'José Silva',
            url: 'http://localhost:3000/platform/staff/staff/1455082'
          }
        }
      }
    ],
    [
      ExpectedCommissionKind.SOURCING_COMMISSION,
      '<span class="MuiTypography-root PicassoTypography-bodyInherit-9 MuiTypography-body1" data-testid="ExpectedCommissionShortDescription">Commission for referring partner <a data-testid="user-link" href="http://localhost:3000/platform/staff/talent/999">George Aidonidis</a></span>',
      {
        reason: {
          __typename: 'TalentPartner',
          fullName: 'José Silva',
          id: 'VjEtU3RhZmYtMTQ1NTA4Mg',
          talent: defaultReasonTalent,
          roleStepTalent: defaultReasonTalent,
          webResource: {
            __typename: 'Link',
            text: 'José Silva',
            url: 'http://localhost:3000/platform/staff/staff/1455082'
          }
        }
      }
    ],
    [
      ExpectedCommissionKind.SOURCING_COMMISSION,
      '<span class="MuiTypography-root PicassoTypography-bodyInherit-9 MuiTypography-body1" data-testid="ExpectedCommissionShortDescription">Commission for referring company <a data-testid="user-link" href="http://localhost:3000/platform/staff/talent/999">George Aidonidis</a></span>',
      {
        reason: {
          __typename: 'Client',
          fullName: 'José Silva',
          id: 'VjEtU3RhZmYtMTQ1NTA4Mg',
          talent: defaultReasonTalent,
          roleStepTalent: defaultReasonTalent,
          webResource: {
            __typename: 'Link',
            text: 'José Silva',
            url: 'http://localhost:3000/platform/staff/staff/1455082'
          }
        }
      }
    ],
    [
      ExpectedCommissionKind.TOP_SKILL_BONUS_TALENT_SOURCING_COMMISSION,
      '<span class="MuiTypography-root PicassoTypography-bodyInherit-9 MuiTypography-body1" data-testid="ExpectedCommissionShortDescription">Commission for referring company <a data-testid="user-link" href="http://localhost:3000/platform/staff/talent/999">George Aidonidis</a></span>',
      {
        reason: {
          __typename: 'Talent',
          fullName: 'José Silva',
          id: 'VjEtU3RhZmYtMTQ1NTA4Mg',
          talent: defaultReasonTalent,
          roleStepTalent: defaultReasonTalent,
          webResource: {
            __typename: 'Link',
            text: 'José Silva',
            url: 'http://localhost:3000/platform/staff/staff/1455082'
          }
        }
      }
    ],
    [
      ExpectedCommissionKind.TOP_SKILL_BONUS_TALENT_SOURCING_COMMISSION,
      '<span class="MuiTypography-root PicassoTypography-bodyInherit-9 MuiTypography-body1" data-testid="ExpectedCommissionShortDescription">Commission for referring partner <a data-testid="user-link" href="http://localhost:3000/platform/staff/talent/999">George Aidonidis</a></span>',
      {
        reason: {
          __typename: 'TalentPartner',
          fullName: 'José Silva',
          id: 'VjEtU3RhZmYtMTQ1NTA4Mg',
          talent: defaultReasonTalent,
          roleStepTalent: defaultReasonTalent,
          webResource: {
            __typename: 'Link',
            text: 'José Silva',
            url: 'http://localhost:3000/platform/staff/staff/1455082'
          }
        }
      }
    ],
    [
      ExpectedCommissionKind.TOP_SKILL_BONUS_TALENT_SOURCING_COMMISSION,
      '<span class="MuiTypography-root PicassoTypography-bodyInherit-9 MuiTypography-body1" data-testid="ExpectedCommissionShortDescription">Commission for referring company <a data-testid="user-link" href="http://localhost:3000/platform/staff/talent/999">George Aidonidis</a></span>',
      {
        reason: {
          __typename: 'Client',
          fullName: 'José Silva',
          id: 'VjEtU3RhZmYtMTQ1NTA4Mg',
          talent: defaultReasonTalent,
          roleStepTalent: defaultReasonTalent,
          webResource: {
            __typename: 'Link',
            text: 'José Silva',
            url: 'http://localhost:3000/platform/staff/staff/1455082'
          }
        }
      }
    ],
    [
      ExpectedCommissionKind.COMPANY_CLAIMING_COMMISSION,
      '<span class="MuiTypography-root PicassoTypography-bodyInherit-9 MuiTypography-body1" data-testid="ExpectedCommissionShortDescription">Commission for engagement letter <a data-testid="talent-link" href="http://localhost:3000/platform/staff/talent/999">George Aidonidis</a> to <a data-testid="job-link" href="http://localhost:3000/platform/staff/job/999">Some job</a></span>'
    ],
    [
      ExpectedCommissionKind.ENTERPRISE_CLIENT_PARTNER_COMMISSION,
      '<span class="MuiTypography-root PicassoTypography-bodyInherit-9 MuiTypography-body1" data-testid="ExpectedCommissionShortDescription">Commission for enterprise company client partner of <a data-testid="company-link" href="http://localhost:3000/platform/staff/client/999">Some client</a> to <a data-testid="job-link" href="http://localhost:3000/platform/staff/job/999">Some job</a></span>'
    ],
    [
      ExpectedCommissionKind.ENTERPRISE_COMPANY_CLAIMING_COMMISSION,
      '<span class="MuiTypography-root PicassoTypography-bodyInherit-9 MuiTypography-body1" data-testid="ExpectedCommissionShortDescription">Commission for enterprise company claimer of <a data-testid="company-link" href="http://localhost:3000/platform/staff/client/999">Some client</a> to <a data-testid="job-link" href="http://localhost:3000/platform/staff/job/999">Some job</a></span>'
    ],
    [
      ExpectedCommissionKind.JOB_CLAIMING_COMMISSION,
      '<span class="MuiTypography-root PicassoTypography-bodyInherit-9 MuiTypography-body1" data-testid="ExpectedCommissionShortDescription">Commission for engagement <a data-testid="talent-link" href="http://localhost:3000/platform/staff/talent/999">George Aidonidis</a> to <a data-testid="job-link" href="http://localhost:3000/platform/staff/job/999">Some job</a></span>'
    ],
    [
      ExpectedCommissionKind.PROJECT_SALES_COMMISSION,
      '<span class="MuiTypography-root PicassoTypography-bodyInherit-9 MuiTypography-body1" data-testid="ExpectedCommissionShortDescription">Commission for projects engagement of <a data-testid="talent-link" href="http://localhost:3000/platform/staff/talent/999">George Aidonidis</a> to <a data-testid="job-link" href="http://localhost:3000/platform/staff/job/999">Some job</a></span>'
    ],
    [
      ExpectedCommissionKind.REFERRED_COMMISSION,
      '<span class="MuiTypography-root PicassoTypography-bodyInherit-9 MuiTypography-body1" data-testid="ExpectedCommissionShortDescription">Commission for being referred by designer <a data-testid="refer-link" href="http://localhost:3000/platform/staff/staff/777">Peter Marosi</a></span>'
    ],
    [
      ExpectedCommissionKind.ROLE_STEP_COMMISSION,
      '<span class="MuiTypography-root PicassoTypography-bodyInherit-9 MuiTypography-body1" data-testid="ExpectedCommissionShortDescription">Commission for screening  step of <a data-testid="user-link" href="http://localhost:3000/platform/staff/talent/999">George Aidonidis</a></span>'
    ],
    [
      ExpectedCommissionKind.SALES_ANALYSIS_COMMISSION,
      '<span class="MuiTypography-root PicassoTypography-bodyInherit-9 MuiTypography-body1" data-testid="ExpectedCommissionShortDescription">Commission for sales analysis <a data-testid="talent-link" href="http://localhost:3000/platform/staff/talent/999">George Aidonidis</a> to <a data-testid="job-link" href="http://localhost:3000/platform/staff/job/999">Some job</a></span>'
    ],
    [
      ExpectedCommissionKind.SALES_OWNER_COMMISSION,
      '<span class="MuiTypography-root PicassoTypography-bodyInherit-9 MuiTypography-body1" data-testid="ExpectedCommissionShortDescription">Commission for engagement of <a data-testid="talent-link" href="http://localhost:3000/platform/staff/talent/999">George Aidonidis</a> to <a data-testid="job-link" href="http://localhost:3000/platform/staff/job/999">Some job</a></span>'
    ],
    [
      ExpectedCommissionKind.TOP_SKILL_BONUS_REFERRED_COMMISSION,
      '<span class="MuiTypography-root PicassoTypography-bodyInherit-9 MuiTypography-body1" data-testid="ExpectedCommissionShortDescription">Commission for being referred by designer <a data-testid="refer-link" href="http://localhost:3000/platform/staff/staff/777">Peter Marosi</a></span>'
    ]
  ])('variations', (kind, result, override) => {
    describe(`when kind is ${kind} and ${
      override?.reason?.__typename || 'default'
    } reason`, () => {
      it('renders the expected short description', () => {
        const { getByTestId } = render({
          expectedCommission: {
            ...fixtures.MockExpectedCommissionsList.expectedCommissions
              .groups[0].expectedCommissions[0],
            kind,
            ...{ reason: { ...defaultReason } },
            ...override
          }
        })

        expect(getByTestId('ExpectedCommissionShortDescription')).toContainHTML(
          result
        )
      })
    })
  })
})
