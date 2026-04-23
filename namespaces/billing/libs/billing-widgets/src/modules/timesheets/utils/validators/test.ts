import MockDate from 'mockdate'

import { getValidatorTimesheetEditForm } from '.'

describe('Form Helpers', () => {
  beforeEach(() => MockDate.set('2015-05-05'))

  afterEach(() => MockDate.reset())

  describe('#getValidatorTimesheetForm', () => {
    it('when object is valid', () => {
      expect.assertions(1)

      const validation = getValidatorTimesheetEditForm({
        timesheetRecords: [
          { date: '2015-05-05', hours: '00', isBreak: true, minutes: '00' },
          { date: '2015-05-06', hours: '00', isBreak: false, minutes: '15' },
          { date: '2015-05-07', hours: '23', isBreak: false, minutes: '59' },
          { date: '2015-05-08', hours: '55', isBreak: true, minutes: '0' },
          { date: '2015-05-09', hours: '55', isBreak: true, minutes: '65' },
          { date: '2015-05-10', hours: '55', isBreak: false, minutes: '65' },
          { date: '2015-05-11', hours: '15', isBreak: false, minutes: '65' },
          { date: '2015-05-12', hours: '00', isBreak: false, minutes: '10' }
        ]
      })

      expect(validation).toEqual({
        timesheetRecords: [
          {},
          {},
          {},
          { hours: 'Hours must be equal to 0' },
          {
            hours: 'Hours must be equal to 0',
            minutes: 'Minutes must be equal to 0'
          },
          { hours: 'Hours must be less than or equal to 24' },
          { minutes: 'Minutes must be less than or equal to 59' },
          { minutes: 'Minutes must be greater than or equal to 15' }
        ]
      })
    })
  })
})
