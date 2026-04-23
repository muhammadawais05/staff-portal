import React from 'react'
import { render, screen, within, waitFor } from '@testing-library/react'
import { NO_VALUE } from '@staff-portal/config'
import {
  TalentCumulativeStatus,
  OfacStatus,
  VisualComplianceStatus,
  TalentSpecializationApplicationStatus
} from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import {
  TestErrorBoundary,
  assertErrorBoundaryErrorsCalled,
  TestWrapperWithMocks
} from '@staff-portal/test-utils'
import {
  createGetTalentSkillSetsMock,
  createGetClientWillHireAgainMock,
  createGetTalentEngagementsRatesMock
} from '@staff-portal/talents/src/mocks'

import TalentGeneralSection from '../TalentGeneralSection'
import {
  createTalentProfileGeneralDataFragmentMock,
  createGetTalentProfileGeneralDataMock,
  createGetTalentProfileGeneralDataFailedMock
} from '../data/get-talent-profile-general-data/mocks'
import { createGetTalentStatusMock } from '../../StatusField/data/get-talent-status/mocks'
import { createGetTalentProfileOperationsMock } from '../data/get-talent-profile-operations/mocks'
import { createGetTalentPaymentOptionsMock } from '../../PaymentMethodsField/data/get-talent-payment-options/mocks'
import { createGetTalentPortfolioUrlMock } from '../../TalentPortfolioUrlField/data/get-talent-portfolio-url/mocks'
import { createGetTalentRejectForInactivityMock } from '../../RejectForInactivityField/data/get-talent-reject-for-inactivity/mocks'
import { createGetTalentPortfolioMock } from '../../TalentPortfolioField/data/get-talent-portfolio/mocks'

const anyDatePattern = '\\w{3} \\d{1,2}, \\d{4}'
const anyTimePattern = '\\d{1,2}:\\d{2} [A|P]M'
const TALENT_ID = '123'

jest.mock('../../../hooks/use-talent-header/use-talent-header', () => ({
  __esModule: true,
  default: () => ({
    renderHeader: () => null
  })
}))

jest.unmock('@staff-portal/editable')
jest.unmock('@staff-portal/current-user')

jest.mock('@staff-portal/date-time-utils', () => ({
  ...jest.requireActual('@staff-portal/date-time-utils'),
  getTimeZoneFullText: ({ name }: { name: string }) => name
}))

const arrangeTest = ({
  talentId,
  mocks = [],
  errorBoundaryMessage = ''
}: {
  talentId: string
  mocks?: MockedResponse[]
  errorBoundaryMessage?: string
}) => {
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <TestErrorBoundary errorMessage={errorBoundaryMessage}>
        <TalentGeneralSection talentId={talentId} />
      </TestErrorBoundary>
    </TestWrapperWithMocks>
  )
}

jest.setTimeout(10000)

describe('Talent Profile General section', () => {
  it('show active talent fields when it loads an active talent', async () => {
    const OFAC_STATUS = {
      value: OfacStatus.NORMAL,
      text: 'Normal'
    }
    const VISUAL_COMPLIANCE_STATUS = {
      value: VisualComplianceStatus.FULLY_CHECKED,
      text: 'verified via Visual Compliance'
    }

    const talentMock = createTalentProfileGeneralDataFragmentMock({
      cumulativeStatus: TalentCumulativeStatus.ACTIVE,
      phoneContacts: {
        nodes: [
          {
            id: '123',
            value: 'TEST_NUMBER',
            primary: true
          }
        ]
      },
      ofacStatus: OFAC_STATUS.value,
      visualComplianceStatus: VISUAL_COMPLIANCE_STATUS.value,
      id: TALENT_ID
    })
    const getTalentMock = createGetTalentProfileGeneralDataMock(talentMock)

    const getTalentStatusMock = createGetTalentStatusMock({
      cumulativeStatus: TalentCumulativeStatus.ACTIVE,
      talentId: TALENT_ID
    })
    const operationsMock = createGetTalentProfileOperationsMock({
      talentId: TALENT_ID
    })

    arrangeTest({
      talentId: talentMock.id,
      mocks: [
        getTalentMock,
        getTalentStatusMock,
        operationsMock,
        createGetTalentSkillSetsMock({ talentId: TALENT_ID }),
        createGetTalentPaymentOptionsMock({ talentId: TALENT_ID }),
        createGetClientWillHireAgainMock({
          talentId: TALENT_ID,
          totalCount: 0
        }),
        createGetTalentEngagementsRatesMock({ talentId: TALENT_ID }),
        createGetTalentPortfolioUrlMock({ talentId: TALENT_ID }),
        createGetTalentRejectForInactivityMock({
          talentId: TALENT_ID,
          cumulativeStatus: TalentCumulativeStatus.ACTIVE,
          ofacStatus: OFAC_STATUS.value
        }),
        createGetTalentPortfolioMock({ talentId: TALENT_ID })
      ]
    })

    expect(
      await screen.findByTestId(/item-field: profile type/i)
    ).toHaveTextContent(new RegExp(talentMock.type, 'i'))

    const emailLink = within(
      screen.getByTestId(/item-field: email/i)
    ).getByRole('link')

    expect(emailLink).toHaveTextContent(talentMock.email)
    expect(emailLink).toHaveAttribute('href', `mailto:${talentMock.email}`)

    const toptalEmailLink = within(
      screen.getByTestId(/item-field: toptal email/i)
    ).getByRole('link')

    expect(toptalEmailLink).toHaveTextContent(talentMock.toptalEmail!)
    expect(toptalEmailLink).toHaveAttribute(
      'href',
      `mailto:${talentMock.toptalEmail}`
    )

    const slackLink = within(
      screen.getByTestId(/item-field: slack/i)
    ).getByRole('link')
    const slack = talentMock.slackContacts.nodes[0]?.webResource

    expect(slackLink).toHaveTextContent(slack.text)
    expect(slackLink).toHaveAttribute('href', slack.url)
    expect(slackLink).toHaveAttribute('target', '_blank')

    expect(screen.getByTestId(/item-field: phone/i)).toHaveTextContent(
      talentMock.phoneContacts.nodes[0].value
    )

    const skypeLink = within(
      screen.getByTestId(/item-field: skype/i)
    ).getByRole('link')
    const skypeId = talentMock.skypeContacts.nodes[0].value

    expect(skypeLink).toHaveTextContent(skypeId)
    expect(skypeLink).toHaveAttribute('href', `skype:${skypeId}`)

    expect(
      screen.getByTestId(/item-field: supply health priority/i)
    ).toHaveTextContent(
      new RegExp(talentMock.supplyHealthModelData!.priority, 'i')
    )

    expect(screen.getByTestId(/item-field: working status/i)).toHaveTextContent(
      talentMock.engagements.counters.workingNumber
        ? /working/i
        : /not working/i
    )
    expect(
      screen.getByTestId(/item-field: allocated hours/i)
    ).toHaveTextContent(new RegExp(`${talentMock.allocatedHours} hours/week`))

    const twitterLink = within(
      screen.getByTestId(/item-field: twitter/i)
    ).getByRole('link')

    expect(twitterLink).toHaveTextContent(talentMock.twitter!)
    expect(twitterLink).toHaveAttribute(
      'href',
      `https://twitter.com/${talentMock.twitter}`
    )

    expect(screen.getByTestId(/item-field: twitter/i)).toHaveTextContent(
      talentMock.twitter!
    )

    expect(
      screen.queryByTestId(/item-field: ID Verification/i)
    ).toBeInTheDocument()

    expect(
      screen.getByTestId(/item-field: full legal name/i)
    ).toHaveTextContent(talentMock.legalName!)
    expect(screen.getByTestId(/item-field: billing name/i)).toHaveTextContent(
      talentMock.billingName!
    )
    expect(
      screen.getByTestId(/item-field: use billing name/i)
    ).toHaveTextContent(talentMock.useBillingName ? /yes/i : /no/i)
    expect(
      screen.getByTestId(/item-field: current country/i)
    ).toHaveTextContent(talentMock.locationV2?.countryName!)
    expect(screen.getByTestId(/item-field: current city/i)).toHaveTextContent(
      talentMock.cityDescription!
    )
    expect(screen.getByTestId(/item-field: time zone/i)).toHaveTextContent(
      talentMock.timeZone?.name || ''
    )
    expect(screen.getByTestId(/item-field: citizenship/i)).toHaveTextContent(
      talentMock.citizenship?.name!
    )
    expect(screen.getByTestId(/item-field: status/i)).toHaveTextContent(
      /active/i
    )
    expect(screen.getByTestId(/item-field: applied/i)).toHaveTextContent(
      new RegExp(anyDatePattern)
    )
    expect(
      screen.getByTestId(/item-field: application form/i)
    ).toHaveTextContent(new RegExp(anyDatePattern))
    expect(screen.getByTestId(/item-field: approved/i)).toHaveTextContent(
      new RegExp(anyDatePattern)
    )

    expect(screen.getByTestId(/item-field: last edited/i)).toHaveTextContent(
      new RegExp(anyDatePattern)
    )

    expect(screen.getByTestId(/item-field: primary skill/i)).toHaveTextContent(
      `${talentMock.primarySkill?.title}`
    )

    const lastLoginText = within(
      screen.getByTestId(/item-field: last login/i)
    ).getByText(new RegExp(`${anyDatePattern} at ${anyTimePattern}`, 'i'))

    expect(lastLoginText).toBeInTheDocument()

    // TODO: Uncomment when we improve the performance of this test
    // jest.useFakeTimers()
    // await assertOnTooltipTextUsingFakeTimers(
    //   lastLoginText,
    //   new RegExp(
    //     `ip: ${talentMock.currentSignInIp}location: ${escapeRegExp(
    //       talentMock.ipLocation.cityName!
    //     )}, ${escapeRegExp(talentMock.ipLocation.countryName!)}`,
    //     'i'
    //   )
    // )

    expect(
      screen.getByTestId(/item-field: terms of service/i)
    ).toHaveTextContent(new RegExp(`accepted on ${anyDatePattern}`, 'i'))
    expect(
      screen.getByTestId(/item-field: code of conduct/i)
    ).toHaveTextContent(new RegExp(`accepted on ${anyDatePattern}`, 'i'))
    expect(screen.getByTestId(/item-field: working time/i)).toHaveTextContent(
      new RegExp(`from ${anyTimePattern} to ${anyTimePattern}`, 'i')
    )
    expect(
      screen.getByTestId(/item-field: available shift range/i)
    ).toHaveTextContent(
      new RegExp(`from ${anyTimePattern} to ${anyTimePattern}`, 'i')
    )

    // website

    const websiteUrl = talentMock.profile?.website || ''
    const websiteLink = within(
      screen.getByTestId(/item-field: website/i)
    ).getByRole('link')

    expect(websiteLink).toHaveTextContent(websiteUrl)
    expect(websiteLink).toHaveAttribute('href', websiteUrl)
    expect(websiteLink).toHaveAttribute('target', '_blank')

    // linkedIn

    const linkedInUrl = talentMock.linkedinUrl || ''
    const linkedInLink = within(
      screen.getByTestId(/item-field: linkedin profile/i)
    ).getByRole('link')

    expect(linkedInLink).toHaveTextContent(linkedInUrl)
    expect(linkedInLink).toHaveAttribute('href', linkedInUrl)
    expect(linkedInLink).toHaveAttribute('target', '_blank')

    // admission post

    const admissionPostUrl = talentMock.admissionPostUrl || ''
    const admissionLink = within(
      screen.getByTestId(/item-field: admission post/i)
    ).getByRole('link')

    expect(admissionLink).toHaveTextContent(admissionPostUrl)
    expect(admissionLink).toHaveAttribute('href', admissionPostUrl)
    expect(admissionLink).toHaveAttribute('target', '_blank')

    expect(screen.getByTestId(/item-field: OFAC Status/i)).toHaveTextContent(
      new RegExp(
        `${OFAC_STATUS.text} \\(${VISUAL_COMPLIANCE_STATUS.text}\\)`,
        'i'
      )
    )
  })

  it('trigger an error boundary when it fails loading', async () => {
    const talentId = '123'
    const errorMessage = 'TEST_ERROR'

    const getTalentFailedMock = createGetTalentProfileGeneralDataFailedMock(
      { talentId },
      errorMessage
    )

    arrangeTest({
      talentId,
      mocks: [getTalentFailedMock],
      errorBoundaryMessage: errorMessage
    })

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

    expect(await screen.findByText(errorMessage)).toBeInTheDocument()

    assertErrorBoundaryErrorsCalled(
      consoleErrorSpy,
      errorMessage,
      TalentGeneralSection
    )
  })

  describe('When talent has recentIdVerification', () => {
    it('renders it in the list', async () => {
      const talentMock = createTalentProfileGeneralDataFragmentMock({
        recentIdVerification: {
          id: '123',
          status: 'pending',
          statusDisplayKey: 'checking_manually',
          reasonForPausingDisplayKey: 'inactivity',
          remainingAttempts: 2,
          automaticMeetingCancellationCount: 0,
          legalName: 'BRUCE WAYNE',
          selfieUrl: 'TEST_LINK'
        },
        id: TALENT_ID
      })

      const getTalentMock = createGetTalentProfileGeneralDataMock(talentMock)
      const operationsMock = createGetTalentProfileOperationsMock({
        talentId: TALENT_ID
      })

      arrangeTest({
        talentId: talentMock.id,
        mocks: [getTalentMock, operationsMock]
      })

      const idVerificationField = await screen.findByTestId(
        /item-field: ID Verification/i
      )

      expect(idVerificationField).toBeInTheDocument()
      expect(idVerificationField).toHaveTextContent('Status: Is being checked')
      expect(idVerificationField).toHaveTextContent(
        'Legal name from ID: BRUCE WAYNE'
      )
      expect(
        within(idVerificationField).getByTestId('recent-id-verification-selfie')
      ).toBeInTheDocument()
      expect(idVerificationField).toHaveTextContent(
        'Automatic meeting cancellation count: 0'
      )
      expect(idVerificationField).toHaveTextContent('Remaining attempts: 2')
    })

    describe('when Talent has status "paused"', () => {
      it('shows reason for pausing', async () => {
        const talentMock = createTalentProfileGeneralDataFragmentMock({
          cumulativeStatus: TalentCumulativeStatus.PAUSED,
          recentIdVerification: {
            id: '123',
            status: 'pending',
            statusDisplayKey: 'checking_manually',
            reasonForPausingDisplayKey: 'verification_failure',
            remainingAttempts: 2,
            automaticMeetingCancellationCount: 0,
            legalName: 'BRUCE WAYNE',
            selfieUrl: 'TEST_LINK'
          },
          id: TALENT_ID
        })

        const getTalentMock = createGetTalentProfileGeneralDataMock(talentMock)
        const operationsMock = createGetTalentProfileOperationsMock({
          talentId: TALENT_ID
        })

        arrangeTest({
          talentId: talentMock.id,
          mocks: [getTalentMock, operationsMock]
        })

        const idVerificationField = await screen.findByTestId(
          /item-field: ID Verification/i
        )

        expect(idVerificationField).toHaveTextContent(
          'Reason for pausing: Verification failure'
        )
      })
    })

    describe('when Talent has status "applied"', () => {
      it('does not show reason for pausing', async () => {
        const talentMock = createTalentProfileGeneralDataFragmentMock({
          cumulativeStatus: TalentCumulativeStatus.APPLIED,
          recentIdVerification: {
            id: '123',
            status: 'pending',
            statusDisplayKey: 'checking_manually',
            reasonForPausingDisplayKey: 'verification_failure',
            remainingAttempts: 2,
            automaticMeetingCancellationCount: 0,
            legalName: 'BRUCE WAYNE',
            selfieUrl: 'TEST_LINK'
          },
          id: TALENT_ID
        })

        const getTalentMock = createGetTalentProfileGeneralDataMock(talentMock)
        const operationsMock = createGetTalentProfileOperationsMock({
          talentId: TALENT_ID
        })

        arrangeTest({
          talentId: talentMock.id,
          mocks: [getTalentMock, operationsMock]
        })

        const idVerificationField = await screen.findByTestId(
          /item-field: ID Verification/i
        )

        expect(idVerificationField).not.toHaveTextContent('Reason for pausing:')
      })
    })
  })

  describe('Eligible for Restoration field', () => {
    describe('when Talent has status "rejected" or "rejected_inactive"', () => {
      it('shows the field', async () => {
        const talentMock = createTalentProfileGeneralDataFragmentMock({
          cumulativeStatus: TalentCumulativeStatus.REJECTED,
          id: TALENT_ID
        })

        const getTalentMock = createGetTalentProfileGeneralDataMock(talentMock)
        const operationsMock = createGetTalentProfileOperationsMock({
          talentId: TALENT_ID
        })

        arrangeTest({
          talentId: talentMock.id,
          mocks: [getTalentMock, operationsMock]
        })

        // Use an existing field to ensure the profile data has loaded
        await screen.findByTestId(/item-field: profile type/i)

        expect(
          screen.queryByTestId(/item-field: eligible for restoration/i)
        ).toBeInTheDocument()
      })
    })

    describe('when Talent has status different from "rejected" or "rejected_inactive"', () => {
      it('hides the field', async () => {
        const talentMock = createTalentProfileGeneralDataFragmentMock({
          cumulativeStatus: TalentCumulativeStatus.ACTIVE,
          id: TALENT_ID
        })

        const getTalentMock = createGetTalentProfileGeneralDataMock(talentMock)
        const operationsMock = createGetTalentProfileOperationsMock({
          talentId: TALENT_ID
        })

        arrangeTest({
          talentId: talentMock.id,
          mocks: [getTalentMock, operationsMock]
        })

        // Use an existing field to ensure the profile data has loaded
        await screen.findByTestId(/item-field: profile type/i)

        expect(
          screen.queryByTestId(/item-field: eligible for restoration/i)
        ).not.toBeInTheDocument()
      })
    })
  })

  describe('Github Profile field', () => {
    it('links to the Github profile', async () => {
      const talentMock = createTalentProfileGeneralDataFragmentMock({
        id: TALENT_ID,
        profile: {
          id: 'test-id',
          website: '',
          github: 'https://github.com/test-account',
          industrySets: {
            nodes: []
          }
        }
      })

      const getTalentMock = createGetTalentProfileGeneralDataMock(talentMock)
      const operationsMock = createGetTalentProfileOperationsMock({
        talentId: TALENT_ID
      })

      arrangeTest({
        talentId: talentMock.id,
        mocks: [getTalentMock, operationsMock]
      })

      const githubData = talentMock.profile?.github
      const githubLabel = await screen.findByTestId(
        /item-field: github profile/i
      )
      const githubLink = within(githubLabel).getByRole('link')

      expect(githubLink).toHaveTextContent('test-account')
      expect(githubLink).toHaveAttribute('href', githubData)
      expect(githubLink).toHaveAttribute('target', '_blank')
    })

    it('shows dash if link is not defined', async () => {
      const talentMock = createTalentProfileGeneralDataFragmentMock({
        id: TALENT_ID,
        profile: {
          id: 'test-id',
          website: '',
          github: null,
          industrySets: {
            nodes: []
          }
        }
      })

      const getTalentMock = createGetTalentProfileGeneralDataMock(talentMock)
      const operationsMock = createGetTalentProfileOperationsMock({
        talentId: TALENT_ID
      })

      arrangeTest({
        talentId: talentMock.id,
        mocks: [getTalentMock, operationsMock]
      })

      const githubLabel = await screen.findByTestId(
        /item-field: github profile/i
      )

      expect(within(githubLabel).getByText('—')).toBeInTheDocument()
    })

    it('hides if talent is not eligible for a Github profile', async () => {
      const talentMock = createTalentProfileGeneralDataFragmentMock({
        id: TALENT_ID,
        profile: {
          id: 'test-id',
          website: '',
          industrySets: {
            nodes: []
          }
        }
      })
      const operationsMock = createGetTalentProfileOperationsMock({
        talentId: TALENT_ID
      })

      const getTalentMock = createGetTalentProfileGeneralDataMock(talentMock)

      arrangeTest({
        talentId: talentMock.id,
        mocks: [getTalentMock, operationsMock]
      })

      // Use an existing field to ensure the profile data has loaded
      await screen.findByTestId(/item-field: profile type/i)

      expect(
        screen.queryByTestId(/item-field: github profile/i)
      ).not.toBeInTheDocument()
    })
  })

  describe('Origin field', () => {
    describe('when applicationInfo is empty', () => {
      it('shows dash', async () => {
        const talentMock = createTalentProfileGeneralDataFragmentMock({
          id: TALENT_ID
        })

        const getTalentMock = createGetTalentProfileGeneralDataMock(talentMock)
        const operationsMock = createGetTalentProfileOperationsMock({
          talentId: TALENT_ID
        })

        arrangeTest({
          talentId: talentMock.id,
          mocks: [getTalentMock, operationsMock]
        })

        const originLabel = await screen.findByTestId(/item-field: origin/i)

        expect(within(originLabel).getByText(NO_VALUE)).toBeInTheDocument()
      })
    })

    describe('when applicationInfo webResource url is set', () => {
      it('shows field', async () => {
        const talentMock = createTalentProfileGeneralDataFragmentMock({
          id: TALENT_ID,
          applicationInfo: {
            id: 'test-id',
            webResource: {
              url: 'https://example.com',
              text: 'text'
            }
          }
        })

        const getTalentMock = createGetTalentProfileGeneralDataMock(talentMock)
        const operationsMock = createGetTalentProfileOperationsMock({
          talentId: TALENT_ID
        })

        arrangeTest({
          talentId: talentMock.id,
          mocks: [getTalentMock, operationsMock]
        })

        const originField = await screen.findByTestId(/item-field: origin/i)

        expect(originField).toHaveTextContent('View Details')
      })
    })
  })

  describe('Employment start date with talent partner field', () => {
    it('shows field when talentPartnership exists', async () => {
      const talentMock = createTalentProfileGeneralDataFragmentMock({
        id: TALENT_ID,
        talentPartnership: {
          employmentStartDate: '2021-06-07'
        }
      })

      const getTalentMock = createGetTalentProfileGeneralDataMock(talentMock)
      const operationsMock = createGetTalentProfileOperationsMock({
        talentId: TALENT_ID
      })

      arrangeTest({
        talentId: talentMock.id,
        mocks: [getTalentMock, operationsMock]
      })

      const employmentField = await screen.findByTestId(
        /item-field: employment start date with talent partner/i
      )

      expect(employmentField).toHaveTextContent(new RegExp(anyDatePattern))
    })

    it('does not show field when talentPartnership does not exist', async () => {
      const talentMock = createTalentProfileGeneralDataFragmentMock({
        id: TALENT_ID
      })

      const getTalentMock = createGetTalentProfileGeneralDataMock(talentMock)
      const operationsMock = createGetTalentProfileOperationsMock({
        talentId: TALENT_ID
      })

      arrangeTest({
        talentId: talentMock.id,
        mocks: [getTalentMock, operationsMock]
      })

      expect(
        screen.queryByTestId(
          /item-field: employment start date with talent partner/i
        )
      ).not.toBeInTheDocument()
    })
  })

  describe('Specializations field', () => {
    describe('when only one specialization available for the Talent', () => {
      it("doesn't show specialization section", async () => {
        const talentMock = createTalentProfileGeneralDataFragmentMock({
          id: TALENT_ID,
          vertical: {
            id: '42',
            specializations: {
              totalCount: 1
            }
          },
          specializationApplications: {
            nodes: [
              {
                id: 'test-id',
                status: TalentSpecializationApplicationStatus.APPROVED,
                specialization: {
                  id: 'test-id',
                  title: 'super_developer'
                }
              }
            ]
          }
        })

        const getTalentMock = createGetTalentProfileGeneralDataMock(talentMock)
        const operationsMock = createGetTalentProfileOperationsMock({
          talentId: TALENT_ID
        })

        arrangeTest({
          talentId: talentMock.id,
          mocks: [getTalentMock, operationsMock]
        })

        // Use an existing field to ensure the profile data has loaded
        await screen.findByTestId(/item-field: profile type/i)

        await waitFor(() => {
          expect(
            screen.queryByTestId(/item-field: specializations/i)
          ).not.toBeInTheDocument()
        })
      })
    })

    describe('when multiplte specializations available for the Talent', () => {
      it('shows specialization section', async () => {
        const talentMock = createTalentProfileGeneralDataFragmentMock({
          id: TALENT_ID,
          vertical: {
            id: '42',
            specializations: {
              totalCount: 2
            }
          },
          specializationApplications: {
            nodes: [
              {
                id: 'test-id',
                status: TalentSpecializationApplicationStatus.APPROVED,
                specialization: {
                  id: 'test-id',
                  title: 'super_developer'
                }
              }
            ]
          }
        })

        const getTalentMock = createGetTalentProfileGeneralDataMock(talentMock)
        const operationsMock = createGetTalentProfileOperationsMock({
          talentId: TALENT_ID
        })

        arrangeTest({
          talentId: talentMock.id,
          mocks: [getTalentMock, operationsMock]
        })

        expect(
          await screen.findByTestId(/item-field: specializations/i)
        ).toBeInTheDocument()
      })
    })
  })
})
