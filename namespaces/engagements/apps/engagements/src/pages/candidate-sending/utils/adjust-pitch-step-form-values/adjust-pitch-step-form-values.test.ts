import adjustPitchStepFormValues from './adjust-pitch-step-form-values'
import { DoNotSendEmailSenderValue } from '../../constants'

describe('adjustPitchStepFormValues', () => {
  const defaultCcAdditional = [
    { value: 'cc-additional-1', text: 'cc-additional-1' },
    { value: 'cc-additional-2', text: 'cc-additional-2' },
    { value: undefined, text: 'cc-additional-3' }
  ]
  const defaultCcSuggested = ['cc-suggested-1', 'cc-suggested-2']
  const defaultCcExternal = [
    {
      value: 'cc-external-1',
      text: 'cc-external-1'
    },
    {
      value: 'cc-external-2',
      text: 'cc-external-2'
    },
    {
      value: undefined,
      text: 'cc-external-3'
    }
  ]

  describe('when `senderId` field is set', () => {
    it('returns adjusted attributes', () => {
      expect(
        adjustPitchStepFormValues({
          title: 'some title',
          ccAdditional: defaultCcAdditional,
          ccSuggested: defaultCcSuggested,
          ccExternal: defaultCcExternal,
          billRateText: 'some bill rate text',
          contactDetailsText: 'some contact details text',
          customClosing: 'some custom closing text',
          pitchText: 'some pitch text',
          senderId: '123',
          showBillRate: true,
          showContactDetails: true,
          showCustomClosing: true,
          showScheduleInterview: true,
          to: 'some-contact'
        })
      ).toEqual({
        senderId: '123',
        title: 'some title',
        cc: [
          'cc-suggested-1',
          'cc-suggested-2',
          'cc-additional-1',
          'cc-additional-2'
        ],
        externalCc: ['cc-external-1', 'cc-external-2'],
        billRateText: 'some bill rate text',
        contactId: 'some-contact',
        contactDetailsText: 'some contact details text',
        customClosing: 'some custom closing text',
        noEmail: false,
        pitchText: 'some pitch text',
        showBillRate: true,
        showContactDetails: true,
        showCustomClosing: true,
        showScheduleInterview: true
      })
    })

    describe('when all `cc` values are empty', () => {
      it('returns adjusted attributes', () => {
        expect(
          adjustPitchStepFormValues({
            title: 'some title',
            ccAdditional: [
              { value: undefined, text: 'cc-additional-1' },
              { value: undefined, text: 'cc-additional-2' },
              { value: undefined, text: 'cc-additional-3' }
            ],
            ccSuggested: [],
            ccExternal: [
              {
                value: undefined,
                text: 'cc-external-1'
              },
              {
                value: undefined,
                text: 'cc-external-2'
              },
              {
                value: undefined,
                text: 'cc-external-3'
              }
            ],
            billRateText: 'some bill rate text',
            contactDetailsText: 'some contact details text',
            customClosing: 'some custom closing text',
            pitchText: 'some pitch text',
            senderId: '123',
            showBillRate: true,
            showContactDetails: true,
            showCustomClosing: true,
            showScheduleInterview: true,
            to: 'some-contact'
          })
        ).toEqual({
          senderId: '123',
          noEmail: false,
          title: 'some title',
          cc: undefined,
          externalCc: undefined,
          billRateText: 'some bill rate text',
          contactDetailsText: 'some contact details text',
          contactId: 'some-contact',
          customClosing: 'some custom closing text',
          pitchText: 'some pitch text',
          showBillRate: true,
          showContactDetails: true,
          showCustomClosing: true,
          showScheduleInterview: true
        })
      })
    })

    describe('when some values are empty', () => {
      it('returns adjusted attributes', () => {
        expect(
          adjustPitchStepFormValues({
            title: undefined,
            ccAdditional: [],
            ccSuggested: [],
            ccExternal: [],
            billRateText: undefined,
            contactDetailsText: undefined,
            customClosing: undefined,
            senderId: '123',
            showBillRate: true,
            showContactDetails: true,
            showCustomClosing: true,
            showScheduleInterview: true,
            to: undefined,
            pitchText: undefined
          })
        ).toEqual({
          senderId: '123',
          noEmail: false,
          title: undefined,
          cc: undefined,
          billRateText: undefined,
          contactDetailsText: undefined,
          customClosing: undefined,
          externalCc: undefined,
          contactId: undefined,
          pitchText: undefined,
          showBillRate: true,
          showContactDetails: true,
          showCustomClosing: true,
          showScheduleInterview: true
        })
      })
    })
  })

  describe('when `senderId` field is not set', () => {
    it('returns adjusted attributes', () => {
      expect(
        adjustPitchStepFormValues({
          title: 'some title',
          ccAdditional: defaultCcAdditional,
          ccSuggested: defaultCcSuggested,
          ccExternal: defaultCcExternal,
          billRateText: 'some bill rate text',
          contactDetailsText: 'some contact details text',
          customClosing: 'some custom closing text',
          pitchText: 'some pitch text',
          senderId: DoNotSendEmailSenderValue,
          showBillRate: true,
          showContactDetails: true,
          showCustomClosing: true,
          to: 'some-contact'
        })
      ).toEqual({
        noEmail: true
      })
    })
  })

  describe('when `showContactDetails` is `false`', () => {
    it('returns adjusted attributes', () => {
      expect(
        adjustPitchStepFormValues({
          title: 'some title',
          ccAdditional: defaultCcAdditional,
          ccSuggested: defaultCcSuggested,
          ccExternal: defaultCcExternal,
          contactDetailsText: 'some contact details text',
          pitchText: 'some pitch text',
          senderId: '123',
          showContactDetails: false,
          to: 'some-contact'
        })
      ).toEqual({
        senderId: '123',
        title: 'some title',
        cc: [
          'cc-suggested-1',
          'cc-suggested-2',
          'cc-additional-1',
          'cc-additional-2'
        ],
        externalCc: ['cc-external-1', 'cc-external-2'],
        contactId: 'some-contact',
        noEmail: false,
        pitchText: 'some pitch text',
        showContactDetails: false
      })
    })
  })

  describe('when `showBillRate` is `false', () => {
    it('returns adjusted attributes', () => {
      expect(
        adjustPitchStepFormValues({
          title: 'some title',
          ccAdditional: defaultCcAdditional,
          ccSuggested: defaultCcSuggested,
          ccExternal: defaultCcExternal,
          billRateText: 'some bill rate text',
          contactDetailsText: 'some contact details text',
          pitchText: 'some pitch text',
          senderId: '123',
          showBillRate: false,
          showContactDetails: true,
          to: 'some-contact'
        })
      ).toEqual({
        senderId: '123',
        title: 'some title',
        cc: [
          'cc-suggested-1',
          'cc-suggested-2',
          'cc-additional-1',
          'cc-additional-2'
        ],
        externalCc: ['cc-external-1', 'cc-external-2'],
        contactId: 'some-contact',
        contactDetailsText: 'some contact details text',
        noEmail: false,
        pitchText: 'some pitch text',
        showBillRate: false,
        showContactDetails: true
      })
    })
  })

  describe('when `showCustomClosing` is `false`', () => {
    it('returns adjusted attributes', () => {
      expect(
        adjustPitchStepFormValues({
          title: 'some title',
          ccAdditional: defaultCcAdditional,
          ccSuggested: defaultCcSuggested,
          ccExternal: defaultCcExternal,
          billRateText: 'some bill rate text',
          contactDetailsText: 'some contact details text',
          customClosing: 'some custom closing text',
          pitchText: 'some pitch text',
          senderId: '123',
          showBillRate: true,
          showContactDetails: true,
          showCustomClosing: false,
          to: 'some-contact'
        })
      ).toEqual({
        senderId: '123',
        title: 'some title',
        cc: [
          'cc-suggested-1',
          'cc-suggested-2',
          'cc-additional-1',
          'cc-additional-2'
        ],
        externalCc: ['cc-external-1', 'cc-external-2'],
        billRateText: 'some bill rate text',
        contactId: 'some-contact',
        contactDetailsText: 'some contact details text',
        noEmail: false,
        pitchText: 'some pitch text',
        showBillRate: true,
        showContactDetails: true,
        showCustomClosing: false
      })
    })
  })

  describe('when `showScheduleInterview` is `false`', () => {
    describe('when `senderId` field is set', () => {
      it('returns adjusted attributes', () => {
        expect(
          adjustPitchStepFormValues({
            title: 'some title',
            ccAdditional: defaultCcAdditional,
            ccSuggested: defaultCcSuggested,
            ccExternal: defaultCcExternal,
            billRateText: 'some bill rate text',
            contactDetailsText: 'some contact details text',
            customClosing: 'some custom closing text',
            pitchText: 'some pitch text',
            senderId: '123',
            showBillRate: true,
            showContactDetails: true,
            showCustomClosing: true,
            showScheduleInterview: false,
            to: 'some-contact'
          })
        ).toEqual({
          senderId: '123',
          title: 'some title',
          cc: [
            'cc-suggested-1',
            'cc-suggested-2',
            'cc-additional-1',
            'cc-additional-2'
          ],
          externalCc: ['cc-external-1', 'cc-external-2'],
          billRateText: 'some bill rate text',
          contactId: 'some-contact',
          contactDetailsText: 'some contact details text',
          customClosing: 'some custom closing text',
          noEmail: false,
          pitchText: 'some pitch text',
          showBillRate: true,
          showContactDetails: true,
          showCustomClosing: true,
          showScheduleInterview: false
        })
      })
    })
  })
})
