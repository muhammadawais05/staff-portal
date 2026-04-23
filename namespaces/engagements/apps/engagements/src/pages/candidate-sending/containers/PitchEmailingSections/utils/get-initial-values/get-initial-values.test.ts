import getInitialValues from './get-initial-values'
import {
  PitchStepEmailContextFragment,
  PitchStepJobFragment,
  PitchStepTalentFragment
} from '../../../../data/get-pitch-step-data'
import { DoNotSendEmailSenderValue } from '../../../../constants'

describe('getInitialValues', () => {
  const defaultPitchShowScheduleInterview = true
  const introductionEmail = {
    carbonCopies: ['cc-email-1', 'cc-email-2', 'cc-email-3', 'cc-email-4'],
    customClosing: 'default custom closing',
    externalCarbonCopies: [
      'introduction-external-cc-email-1',
      'introduction-external-cc-email-2'
    ],
    sender: {
      id: '123'
    },
    showBillRate: false,
    showContactDetails: false,
    showCustomClosing: false
  }
  const pitchEmailMessaging = {
    defaultEmailTitle: 'default title',
    defaultSendTo: {
      id: 'default send to id',
      fullName: 'Timofei Kachalov'
    },
    emailCarbonCopyOptions: {
      nodes: [
        {
          label: 'label-1',
          default: false,
          role: {
            id: '1',
            fullName: 'full-name-1',
            email: 'cc-email-1'
          }
        },
        {
          label: 'label-2',
          default: true,
          role: {
            id: '2',
            fullName: 'full-name-2',
            email: 'cc-email-2'
          }
        },
        {
          label: 'label-4',
          default: false,
          role: {
            id: '4',
            fullName: 'full-name-4',
            email: 'cc-email-4'
          }
        }
      ]
    }
  } as PitchStepEmailContextFragment['pitchEmailMessaging']
  const job = {
    claimer: {
      id: '456'
    }
  } as PitchStepJobFragment
  const talent = {
    id: '123',
    phoneNumber: '+123456789'
  } as PitchStepTalentFragment
  const newEngagement = {
    companyHourlyRate: '100.0',
    companyPartTimeRate: '50.0',
    companyFullTimeRate: '200.0',
    cumulativeStatus: 'status'
  }
  const talentPitch = {
    id: '123',
    pitchText: 'default pitch text'
  }

  const defaultContactDetailsText =
    'Profile: {{profile_link}}\n\nEmail: {{email_link}}\nPhone: +123456789\n'
  const defaultBillRateText =
    'Hourly Rate: $100.00/hour\nPart-Time Rate: $50.00/week\nFull-Time Rate: $200.00/week\n'
  const defaultCustomClosingText = 'default custom closing'

  describe('when engagement is persistent', () => {
    it('returns initial values', () => {
      const attributes = getInitialValues({
        defaultPitchShowScheduleInterview,
        engagementId: '123',
        introductionEmail,
        job,
        newEngagement,
        pitchEmailMessaging,
        talent,
        talentPitch
      })

      expect(attributes).toEqual({
        ccAdditional: [{ value: 'cc-email-3', text: 'cc-email-3' }],
        ccExternal: [
          {
            value: 'introduction-external-cc-email-1',
            text: 'introduction-external-cc-email-1'
          },
          {
            value: 'introduction-external-cc-email-2',
            text: 'introduction-external-cc-email-2'
          }
        ],
        ccSuggested: ['cc-email-1', 'cc-email-2', 'cc-email-3', 'cc-email-4'],
        senderId: introductionEmail.sender.id,
        title: 'default title',
        to: 'default send to id',
        pitchText: 'default pitch text',
        showScheduleInterview: true,
        showBillRate: false,
        billRateText: defaultBillRateText,
        showContactDetails: false,
        contactDetailsText: defaultContactDetailsText,
        showCustomClosing: false,
        customClosing: defaultCustomClosingText
      })
    })

    describe('when `introductionEmail.sender.id` field is not set', () => {
      it('returns initial values', () => {
        const attributes = getInitialValues({
          defaultPitchShowScheduleInterview,
          engagementId: '123',
          introductionEmail: {
            ...introductionEmail,
            sender: undefined
          },
          job,
          newEngagement,
          pitchEmailMessaging,
          talent,
          talentPitch
        })

        expect(attributes).toEqual({
          ccAdditional: [{ value: 'cc-email-3', text: 'cc-email-3' }],
          ccExternal: [
            {
              value: 'introduction-external-cc-email-1',
              text: 'introduction-external-cc-email-1'
            },
            {
              value: 'introduction-external-cc-email-2',
              text: 'introduction-external-cc-email-2'
            }
          ],
          ccSuggested: ['cc-email-1', 'cc-email-2', 'cc-email-3', 'cc-email-4'],
          senderId: DoNotSendEmailSenderValue,
          title: 'default title',
          to: 'default send to id',
          pitchText: 'default pitch text',
          showScheduleInterview: true,
          showBillRate: false,
          billRateText: defaultBillRateText,
          showContactDetails: false,
          contactDetailsText: defaultContactDetailsText,
          showCustomClosing: false,
          customClosing: defaultCustomClosingText
        })
      })
    })
  })

  describe('when engagement is not persistent', () => {
    it('returns initial values', () => {
      const attributes = getInitialValues({
        defaultPitchShowScheduleInterview,
        engagementId: null,
        introductionEmail,
        job,
        newEngagement,
        pitchEmailMessaging,
        talent,
        talentPitch
      })

      expect(attributes).toEqual({
        ccAdditional: [],
        ccExternal: [
          {
            value: 'introduction-external-cc-email-1',
            text: 'introduction-external-cc-email-1'
          },
          {
            value: 'introduction-external-cc-email-2',
            text: 'introduction-external-cc-email-2'
          }
        ],
        ccSuggested: ['cc-email-2'],
        senderId: job.claimer?.id,
        title: 'default title',
        to: 'default send to id',
        pitchText: 'default pitch text',
        showScheduleInterview: true,
        showBillRate: false,
        billRateText: defaultBillRateText,
        showContactDetails: false,
        contactDetailsText: defaultContactDetailsText,
        showCustomClosing: false,
        customClosing: defaultCustomClosingText
      })
    })

    describe('when `job.toptalProjects` flag is `true`', () => {
      it('returns initial values', () => {
        const attributes = getInitialValues({
          defaultPitchShowScheduleInterview,
          engagementId: null,
          introductionEmail,
          job: {
            ...job,
            toptalProjects: true
          },
          newEngagement,
          pitchEmailMessaging,
          talent,
          talentPitch
        })

        expect(attributes).toEqual({
          ccAdditional: [],
          ccExternal: [
            {
              value: 'introduction-external-cc-email-1',
              text: 'introduction-external-cc-email-1'
            },
            {
              value: 'introduction-external-cc-email-2',
              text: 'introduction-external-cc-email-2'
            }
          ],
          ccSuggested: ['cc-email-2'],
          senderId: DoNotSendEmailSenderValue,
          title: 'default title',
          to: 'default send to id',
          pitchText: 'default pitch text',
          showScheduleInterview: true,
          showBillRate: false,
          billRateText: defaultBillRateText,
          showContactDetails: false,
          contactDetailsText: defaultContactDetailsText,
          showCustomClosing: false,
          customClosing: defaultCustomClosingText
        })
      })
    })

    describe('when `job.client.enterprise` flag is `true`', () => {
      it('returns initial values', () => {
        const attributes = getInitialValues({
          defaultPitchShowScheduleInterview,
          engagementId: null,
          introductionEmail,
          job: {
            ...job,
            client: {
              ...job.client,
              enterprise: true
            }
          },
          newEngagement,
          pitchEmailMessaging,
          talent,
          talentPitch
        })

        expect(attributes).toEqual({
          ccAdditional: [],
          ccExternal: [
            {
              value: 'introduction-external-cc-email-1',
              text: 'introduction-external-cc-email-1'
            },
            {
              value: 'introduction-external-cc-email-2',
              text: 'introduction-external-cc-email-2'
            }
          ],
          ccSuggested: ['cc-email-2'],
          senderId: DoNotSendEmailSenderValue,
          title: 'default title',
          to: 'default send to id',
          pitchText: 'default pitch text',
          showScheduleInterview: true,
          showBillRate: false,
          billRateText: defaultBillRateText,
          showContactDetails: false,
          contactDetailsText: defaultContactDetailsText,
          showCustomClosing: false,
          customClosing: defaultCustomClosingText
        })
      })
    })

    describe('when `job.claimer.id` is not set', () => {
      it('returns initial values', () => {
        const attributes = getInitialValues({
          defaultPitchShowScheduleInterview,
          engagementId: null,
          introductionEmail,
          job: {
            ...job,
            claimer: undefined
          },
          newEngagement,
          pitchEmailMessaging,
          talent,
          talentPitch
        })

        expect(attributes).toEqual({
          ccAdditional: [],
          ccExternal: [
            {
              value: 'introduction-external-cc-email-1',
              text: 'introduction-external-cc-email-1'
            },
            {
              value: 'introduction-external-cc-email-2',
              text: 'introduction-external-cc-email-2'
            }
          ],
          ccSuggested: ['cc-email-2'],
          senderId: DoNotSendEmailSenderValue,
          title: 'default title',
          to: 'default send to id',
          pitchText: 'default pitch text',
          showScheduleInterview: true,
          showBillRate: false,
          billRateText: defaultBillRateText,
          showContactDetails: false,
          contactDetailsText: defaultContactDetailsText,
          showCustomClosing: false,
          customClosing: defaultCustomClosingText
        })
      })
    })
  })

  describe('when default pitch text is not set', () => {
    describe('when `defaultSentTo.fullName` is set', () => {
      it('returns initial values', () => {
        const attributes = getInitialValues({
          defaultPitchShowScheduleInterview,
          engagementId: '123',
          introductionEmail,
          job,
          newEngagement,
          talent,
          talentPitch: undefined,
          pitchEmailMessaging
        })

        expect(attributes).toEqual({
          ccAdditional: [{ value: 'cc-email-3', text: 'cc-email-3' }],
          ccExternal: [
            {
              value: 'introduction-external-cc-email-1',
              text: 'introduction-external-cc-email-1'
            },
            {
              value: 'introduction-external-cc-email-2',
              text: 'introduction-external-cc-email-2'
            }
          ],
          ccSuggested: ['cc-email-1', 'cc-email-2', 'cc-email-3', 'cc-email-4'],
          senderId: introductionEmail.sender.id,
          title: 'default title',
          to: 'default send to id',
          pitchText: '',
          showScheduleInterview: true,
          showBillRate: false,
          billRateText: defaultBillRateText,
          showContactDetails: false,
          contactDetailsText: defaultContactDetailsText,
          showCustomClosing: false,
          customClosing: defaultCustomClosingText
        })
      })
    })

    describe('when `defaultSentTo` is not set', () => {
      it('returns initial values', () => {
        const attributes = getInitialValues({
          defaultPitchShowScheduleInterview,
          engagementId: '123',
          introductionEmail,
          job,
          newEngagement,
          talent,
          talentPitch: undefined,
          pitchEmailMessaging: {
            ...pitchEmailMessaging,
            defaultSendTo: undefined
          } as PitchStepEmailContextFragment['pitchEmailMessaging']
        })

        expect(attributes).toEqual({
          ccAdditional: [{ value: 'cc-email-3', text: 'cc-email-3' }],
          ccExternal: [
            {
              value: 'introduction-external-cc-email-1',
              text: 'introduction-external-cc-email-1'
            },
            {
              value: 'introduction-external-cc-email-2',
              text: 'introduction-external-cc-email-2'
            }
          ],
          ccSuggested: ['cc-email-1', 'cc-email-2', 'cc-email-3', 'cc-email-4'],
          senderId: introductionEmail.sender.id,
          title: 'default title',
          to: undefined,
          pitchText: '',
          showScheduleInterview: true,
          showBillRate: false,
          billRateText: defaultBillRateText,
          showContactDetails: false,
          contactDetailsText: defaultContactDetailsText,
          showCustomClosing: false,
          customClosing: defaultCustomClosingText
        })
      })
    })
  })

  describe('when `talent.phoneNumber` is not set', () => {
    it('returns initial values', () => {
      const attributes = getInitialValues({
        defaultPitchShowScheduleInterview,
        engagementId: '123',
        introductionEmail,
        job,
        newEngagement,
        pitchEmailMessaging,
        talentPitch,
        talent: undefined
      })

      expect(attributes).toEqual({
        ccAdditional: [{ value: 'cc-email-3', text: 'cc-email-3' }],
        ccExternal: [
          {
            value: 'introduction-external-cc-email-1',
            text: 'introduction-external-cc-email-1'
          },
          {
            value: 'introduction-external-cc-email-2',
            text: 'introduction-external-cc-email-2'
          }
        ],
        ccSuggested: ['cc-email-1', 'cc-email-2', 'cc-email-3', 'cc-email-4'],
        senderId: introductionEmail.sender.id,
        title: 'default title',
        to: 'default send to id',
        pitchText: 'default pitch text',
        showScheduleInterview: true,
        showBillRate: false,
        billRateText: defaultBillRateText,
        showContactDetails: false,
        contactDetailsText:
          'Profile: {{profile_link}}\n\nEmail: {{email_link}}\n',
        showCustomClosing: false,
        customClosing: defaultCustomClosingText
      })
    })
  })

  describe('when `introductionEmail` fields are not set', () => {
    it('returns initial values', () => {
      const attributes = getInitialValues({
        defaultPitchShowScheduleInterview,
        engagementId: null,
        introductionEmail: {
          ...introductionEmail,
          showContactDetails: undefined,
          showBillRate: undefined,
          showCustomClosing: undefined
        },
        job,
        newEngagement,
        pitchEmailMessaging,
        talent,
        talentPitch
      })

      expect(attributes).toEqual({
        ccAdditional: [],
        ccExternal: [
          {
            value: 'introduction-external-cc-email-1',
            text: 'introduction-external-cc-email-1'
          },
          {
            value: 'introduction-external-cc-email-2',
            text: 'introduction-external-cc-email-2'
          }
        ],
        ccSuggested: ['cc-email-2'],
        senderId: job.claimer?.id,
        title: 'default title',
        to: 'default send to id',
        pitchText: 'default pitch text',
        showScheduleInterview: true,
        showBillRate: true,
        billRateText: defaultBillRateText,
        showContactDetails: true,
        contactDetailsText: defaultContactDetailsText,
        showCustomClosing: true,
        customClosing: defaultCustomClosingText
      })
    })
  })

  describe('when some rate fields of `newEngagement` are not set', () => {
    it.each([
      {
        newEngagement: { ...newEngagement, companyHourlyRate: undefined },
        expectedBillRateText:
          'Part-Time Rate: $50.00/week\nFull-Time Rate: $200.00/week\n'
      },
      {
        newEngagement: { ...newEngagement, companyFullTimeRate: undefined },
        expectedBillRateText:
          'Hourly Rate: $100.00/hour\nPart-Time Rate: $50.00/week\n'
      },
      {
        newEngagement: { ...newEngagement, companyPartTimeRate: undefined },
        expectedBillRateText:
          'Hourly Rate: $100.00/hour\nFull-Time Rate: $200.00/week\n'
      },
      {
        newEngagement: undefined,
        expectedBillRateText: ''
      }
    ])(
      'returns initial values',
      ({
        newEngagement: newEngagementWithMissingFields,
        expectedBillRateText
      }) => {
        const attributes = getInitialValues({
          defaultPitchShowScheduleInterview,
          engagementId: '123',
          introductionEmail,
          job,
          newEngagement: newEngagementWithMissingFields,
          pitchEmailMessaging,
          talent,
          talentPitch
        })

        expect(attributes).toEqual({
          ccAdditional: [{ value: 'cc-email-3', text: 'cc-email-3' }],
          ccExternal: [
            {
              value: 'introduction-external-cc-email-1',
              text: 'introduction-external-cc-email-1'
            },
            {
              value: 'introduction-external-cc-email-2',
              text: 'introduction-external-cc-email-2'
            }
          ],
          ccSuggested: ['cc-email-1', 'cc-email-2', 'cc-email-3', 'cc-email-4'],
          senderId: introductionEmail.sender.id,
          title: 'default title',
          to: 'default send to id',
          pitchText: 'default pitch text',
          showScheduleInterview: true,
          showBillRate: false,
          billRateText: expectedBillRateText,
          showContactDetails: false,
          contactDetailsText: defaultContactDetailsText,
          showCustomClosing: false,
          customClosing: defaultCustomClosingText
        })
      }
    )
  })
})
