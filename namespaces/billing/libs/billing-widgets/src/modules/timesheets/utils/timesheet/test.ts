import MockDate from 'mockdate'

import {
  getSubmissionOverdueLeft,
  getTimesheetEditTotal,
  getTimesheetInputEmptyInitValues,
  getTimesheetInputInitValues,
  getTimesheetSubmitChanges,
  useCallbackDayEditHandleOnBlur,
  useCallbackDayEditHandleOnChange,
  useCallbackDayEditHandleOnFocus
} from '.'

let mockEventTarget: any,
  mockHandle: any,
  mockHandleFinalFormOnBlur: any,
  mockHandleFinalFormOnChange: any,
  mockHandleFinalFormOnFocus: any

describe('Timesheet helpers', () => {
  beforeEach(() => MockDate.set('2019/05/20 19:00'))

  afterEach(() => MockDate.reset())

  describe('#handlers', () => {
    beforeEach(() => {
      mockEventTarget = { target: { select: jest.fn() } }
      mockEventTarget = { target: { select: jest.fn() } }
      mockHandle = jest.fn()
      mockHandleFinalFormOnBlur = jest.fn()
      mockHandleFinalFormOnChange = jest.fn()
      mockHandleFinalFormOnFocus = jest.fn()
    })

    describe('#useCallbackDayEditHandleOnBlur', () => {
      describe('if value is not defined', () => {
        it('invoke fns properly', () => {
          // @ts-ignore
          useCallbackDayEditHandleOnBlur(
            mockHandleFinalFormOnChange,
            mockHandleFinalFormOnBlur,
            mockHandle
          )({ target: { value: '' } })

          expect(mockHandleFinalFormOnChange).toHaveBeenCalledTimes(1)
          expect(mockHandleFinalFormOnChange).toHaveBeenCalledWith('00')

          expect(mockHandle).toHaveBeenCalledTimes(1)
          expect(mockHandle).toHaveBeenCalledWith(false)

          expect(mockHandleFinalFormOnBlur).toHaveBeenCalledTimes(1)
          expect(mockHandleFinalFormOnBlur).toHaveBeenCalledWith({
            target: { value: '' }
          })
        })
      })

      describe('if value is defined', () => {
        describe('if value length is less than 2', () => {
          it('invoke fns properly', () => {
            // @ts-ignore
            useCallbackDayEditHandleOnBlur(
              mockHandleFinalFormOnChange,
              mockHandleFinalFormOnBlur,
              mockHandle
            )({ target: { value: '5' } })

            expect(mockHandleFinalFormOnChange).toHaveBeenCalledTimes(1)
            expect(mockHandleFinalFormOnChange).toHaveBeenCalledWith('05')

            expect(mockHandle).toHaveBeenCalledTimes(1)
            expect(mockHandle).toHaveBeenCalledWith(false)

            expect(mockHandleFinalFormOnBlur).toHaveBeenCalledTimes(1)
            expect(mockHandleFinalFormOnBlur).toHaveBeenCalledWith({
              target: { value: '5' }
            })
          })
        })

        describe('if value length is 2', () => {
          it('invoke fns properly', () => {
            // @ts-ignore
            useCallbackDayEditHandleOnBlur(
              mockHandleFinalFormOnChange,
              mockHandleFinalFormOnBlur,
              mockHandle
            )({ target: { value: '15' } })

            expect(mockHandleFinalFormOnChange).not.toHaveBeenCalled()

            expect(mockHandle).toHaveBeenCalledTimes(1)
            expect(mockHandle).toHaveBeenCalledWith(false)

            expect(mockHandleFinalFormOnBlur).toHaveBeenCalledTimes(1)
            expect(mockHandleFinalFormOnBlur).toHaveBeenCalledWith({
              target: { value: '15' }
            })
          })
        })
      })
    })

    describe('#useCallbackDayEditHandleOnFocus', () => {
      it('invoke fns properly', () => {
        // @ts-ignore
        useCallbackDayEditHandleOnFocus(
          mockHandleFinalFormOnFocus,
          mockHandle
        )(mockEventTarget)

        expect(mockEventTarget.target.select).toHaveBeenCalledTimes(1)

        expect(mockHandle).toHaveBeenCalledTimes(1)
        expect(mockHandle).toHaveBeenCalledWith(true)

        expect(mockHandleFinalFormOnFocus).toHaveBeenCalledTimes(1)
        expect(mockHandleFinalFormOnFocus).toHaveBeenCalledWith(mockEventTarget)
      })
    })

    describe('#useCallbackDayEditHandleOnChange', () => {
      describe('if value length larger than 2', () => {
        it('invoke fns properly', () => {
          // @ts-ignore
          useCallbackDayEditHandleOnChange(mockHandleFinalFormOnChange)({
            target: { value: '155' }
          })

          expect(mockHandleFinalFormOnChange).toHaveBeenCalledTimes(1)
          expect(mockHandleFinalFormOnChange).toHaveBeenCalledWith('15')
        })
      })

      describe('if value length less than 2', () => {
        it('invoke fns properly', () => {
          // @ts-ignore
          useCallbackDayEditHandleOnChange(mockHandleFinalFormOnChange)({
            target: { value: '15' }
          })

          expect(mockHandleFinalFormOnChange).toHaveBeenCalledTimes(1)
          expect(mockHandleFinalFormOnChange).toHaveBeenCalledWith('15')
        })
      })

      describe('if value includes a letter', () => {
        it('invoke fns properly', () => {
          // @ts-ignore
          useCallbackDayEditHandleOnChange(mockHandleFinalFormOnChange)({
            target: { value: '1a' }
          })

          expect(mockHandleFinalFormOnChange).toHaveBeenCalledTimes(1)
          expect(mockHandleFinalFormOnChange).toHaveBeenCalledWith('1')
        })
      })
    })
  })

  it('#getTimesheetInputInitValues', () => {
    expect(
      getTimesheetInputInitValues(
        [
          { date: '2018-05-14', duration: 554.5 },
          { date: '2018-05-15', duration: 1785.55 },
          { date: '2018-05-16', duration: 0.875 }
        ],
        ['2018-05-15']
      )
    ).toEqual([
      { date: '2018-05-14', hours: '09', isBreak: false, minutes: '15' },
      { date: '2018-05-15', hours: '29', isBreak: true, minutes: '46' },
      { date: '2018-05-16', hours: '00', isBreak: false, minutes: '01' }
    ])
  })

  it('#getTimesheetInputEmptyInitValues', () => {
    expect(
      getTimesheetInputEmptyInitValues('2018-05-15', '2018-06-01', [
        '2018-05-15'
      ])
    ).toEqual([
      {
        date: '2018-05-15',
        hours: '00',
        isBreak: true,
        minutes: '00',
        note: ''
      },
      {
        date: '2018-05-16',
        hours: '00',
        isBreak: false,
        minutes: '00',
        note: ''
      },
      {
        date: '2018-05-17',
        hours: '00',
        isBreak: false,
        minutes: '00',
        note: ''
      },
      {
        date: '2018-05-18',
        hours: '00',
        isBreak: false,
        minutes: '00',
        note: ''
      },
      {
        date: '2018-05-19',
        hours: '00',
        isBreak: false,
        minutes: '00',
        note: ''
      },
      {
        date: '2018-05-20',
        hours: '00',
        isBreak: false,
        minutes: '00',
        note: ''
      },
      {
        date: '2018-05-21',
        hours: '00',
        isBreak: false,
        minutes: '00',
        note: ''
      },
      {
        date: '2018-05-22',
        hours: '00',
        isBreak: false,
        minutes: '00',
        note: ''
      },
      {
        date: '2018-05-23',
        hours: '00',
        isBreak: false,
        minutes: '00',
        note: ''
      },
      {
        date: '2018-05-24',
        hours: '00',
        isBreak: false,
        minutes: '00',
        note: ''
      },
      {
        date: '2018-05-25',
        hours: '00',
        isBreak: false,
        minutes: '00',
        note: ''
      },
      {
        date: '2018-05-26',
        hours: '00',
        isBreak: false,
        minutes: '00',
        note: ''
      },
      {
        date: '2018-05-27',
        hours: '00',
        isBreak: false,
        minutes: '00',
        note: ''
      },
      {
        date: '2018-05-28',
        hours: '00',
        isBreak: false,
        minutes: '00',
        note: ''
      },
      {
        date: '2018-05-29',
        hours: '00',
        isBreak: false,
        minutes: '00',
        note: ''
      },
      {
        date: '2018-05-30',
        hours: '00',
        isBreak: false,
        minutes: '00',
        note: ''
      },
      {
        date: '2018-05-31',
        hours: '00',
        isBreak: false,
        minutes: '00',
        note: ''
      },
      {
        date: '2018-06-01',
        hours: '00',
        isBreak: false,
        minutes: '00',
        note: ''
      }
    ])
  })

  it('#getTimesheetSubmitChanges', () => {
    expect(
      getTimesheetSubmitChanges({
        timesheetComment: 'example comment',
        timesheetRecords: [
          {
            date: '2018-05-14',
            hours: '9',
            isBreak: false,
            minutes: '15',
            note: 'note 1'
          },
          {
            date: '2018-05-15',
            hours: '29',
            isBreak: true,
            minutes: '46',
            note: 'note 2'
          },
          {
            date: '2018-05-16',
            hours: '00',
            isBreak: false,
            minutes: '01',
            note: 'note 3'
          }
        ]
      })
    ).toEqual({
      comment: 'example comment',
      timesheetRecords: [
        { date: '2018-05-14', duration: '555', note: 'note 1' },
        { date: '2018-05-16', duration: '1', note: 'note 3' }
      ]
    })
  })

  it('#getTimesheetEditTotal', () => {
    expect(
      getTimesheetEditTotal([
        { date: '2018-05-14', hours: '9', isBreak: false, minutes: '15' },
        { date: '2018-05-15', hours: '29', isBreak: false, minutes: '46' },
        { date: '2018-05-16', hours: '00', isBreak: false, minutes: '01' }
      ])
    ).toEqual({
      hours: 39,
      minutes: 2
    })
  })

  describe('#getSubmissionOverdueLeft', () => {
    it('when its less than a day', () => {
      expect(
        getSubmissionOverdueLeft({
          timesheetSubmissionDeadline: '2019-05-20T14:00:00.000+00:00'
        })
      ).toBe('less than a day')
    })

    it('when its more than a day', () => {
      expect(
        getSubmissionOverdueLeft({
          timesheetSubmissionDeadline: '2019-05-27T19:00:00.000+00:00'
        })
      ).toBe('7 days')
    })
  })
})
