import { TalentAllocatedHoursAvailability } from '@staff-portal/graphql/staff'

import { AvailabilityStatusMode } from '../../types'
import { getTalentAvailabilityStatusSettings } from './get-talent-availability-status-settings'

const RealDateNow = Date.now

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const talentAvailability = (params: any = {}) => ({
  id: 'id1',
  type: 'Developer',
  availableHours: 40,
  availableHoursExcludingEndingEngagements: 40,
  allocatedHours: 50,
  allocatedHoursAvailability: TalentAllocatedHoursAvailability.FULL_TIME,
  allocatedHoursConfirmedAt: '2020-09-05T00:22:07+03:00',
  ...params
})

describe('getTalentAvailabilityStatusSettings', () => {
  beforeEach(() => {
    global.Date.now = () => Date.parse('2020-12-10T00:20:07+03:00')
  })

  afterEach(() => {
    global.Date.now = RealDateNow
  })

  it('returns a copy for a Full time talent', () => {
    const availabilityParams = talentAvailability()

    expect(
      getTalentAvailabilityStatusSettings(availabilityParams, 'detailed').text
    ).toBe('Developer Full-time (40 / 50 hours)')
  })

  it('returns a copy for a Part time talent', () => {
    const availabilityParams = talentAvailability({
      availableHours: 39,
      allocatedHoursAvailability: TalentAllocatedHoursAvailability.PART_TIME
    })

    expect(
      getTalentAvailabilityStatusSettings(availabilityParams, 'detailed').text
    ).toBe('Developer Part-time (39 / 50 hours)')
  })

  it('returns a copy for an Unavailable talent', () => {
    const availabilityParams = talentAvailability({
      availableHours: 0,
      allocatedHoursAvailability: TalentAllocatedHoursAvailability.UNAVAILABLE
    })

    expect(
      getTalentAvailabilityStatusSettings(availabilityParams, 'detailed').text
    ).toBe('Developer Unavailable (0 / 50 hours)')
  })

  it('returns a copy for not a developer vertical', () => {
    const availabilityParams = talentAvailability({
      type: 'FinanceExpert'
    })

    expect(
      getTalentAvailabilityStatusSettings(availabilityParams, 'detailed').text
    ).toBe('Finance Expert Full-time (40 / 50 hours)')
  })

  describe('when `allocatedHoursAvailability` values is nullable', () => {
    it.each([
      {
        mode: 'default',
        availabilityStatusText: 'Developer (39 / 50 hours)'
      },
      {
        mode: 'compact',
        availabilityStatusText: '(39/50)'
      },
      {
        mode: 'detailed',
        availabilityStatusText: 'Developer (39 / 50 hours)'
      }
    ])(
      'returns a valid default availability status text',
      ({ mode, availabilityStatusText }) => {
        const availabilityParams = talentAvailability({
          availableHours: 39,
          allocatedHoursAvailability: null
        })

        expect(
          getTalentAvailabilityStatusSettings(
            availabilityParams,
            mode as AvailabilityStatusMode
          ).text
        ).toEqual(availabilityStatusText)
      }
    )
  })

  describe('when hideAllocatedHours is true', () => {
    describe('when is compact', () => {
      it('returns a compact copy without allocated hours', () => {
        const availabilityParams = talentAvailability()

        expect(
          getTalentAvailabilityStatusSettings(availabilityParams, 'compact', {
            hideAllocatedHours: true
          }).text
        ).toBe('FT (40)')
      })
    })

    describe('when is detailed', () => {
      it('returns a copy for a Full time without allocated hours', () => {
        const availabilityParams = talentAvailability()

        expect(
          getTalentAvailabilityStatusSettings(availabilityParams, 'detailed', {
            hideAllocatedHours: true
          }).text
        ).toBe('Developer Full-time (40 hours)')
      })
    })

    describe('when is default', () => {
      it('returns a copy for a Full time without allocated hours', () => {
        const availabilityParams = talentAvailability()

        expect(
          getTalentAvailabilityStatusSettings(availabilityParams, 'default', {
            hideAllocatedHours: true
          }).text
        ).toBe('Developer Full-time (40 hours)')
      })
    })
  })

  describe('when hideRoleName is true', () => {
    describe('when is compact', () => {
      it('returns a compact copy without role name', () => {
        const availabilityParams = talentAvailability()

        expect(
          getTalentAvailabilityStatusSettings(availabilityParams, 'compact', {
            hideRoleName: true
          }).text
        ).toBe('FT (40/50)')
      })
    })

    describe('when is detailed', () => {
      it('returns a copy for a Full time without role name', () => {
        const availabilityParams = talentAvailability()

        expect(
          getTalentAvailabilityStatusSettings(availabilityParams, 'detailed', {
            hideRoleName: true
          }).text
        ).toBe('Full-time (40 / 50 hours)')
      })
    })

    describe('when is default', () => {
      it('returns a copy for a Full time without role name', () => {
        const availabilityParams = talentAvailability()

        expect(
          getTalentAvailabilityStatusSettings(availabilityParams, 'default', {
            hideRoleName: true
          }).text
        ).toBe('Full-time (40 / 50 hours)')
      })
    })
  })
})
