import {
  CreateSourcingRequestInput,
  UpdateSourcingRequestInput
} from '@staff-portal/graphql/staff'

import {
  BooleanAsString,
  CreateSourcingRequestFormInput,
  UpdateSourcingRequestFormInput
} from '../../../types'
import {
  prepareCreateSourcingRequestInput,
  prepareUpdateSourcingRequestInput
} from '.'

describe('prepareCreateSourcingRequestInput', () => {
  it('returns correct CreateSourcingRequestInput with optional boolean fields', () => {
    const input: CreateSourcingRequestFormInput = {
      canIncreaseRate: BooleanAsString.TRUE,
      canShareCompanyName: BooleanAsString.TRUE,
      canShareRate: BooleanAsString.TRUE,
      citizenshipRequirements: BooleanAsString.TRUE,
      extraInformation: BooleanAsString.TRUE,
      furtherQualificationInterviews: BooleanAsString.TRUE,
      jobId: '1',
      mustHaveSkills: ['1'],
      noTalentHourlyRateLimit: true,
      positions: 1,
      sellingPoints: 'Good job',
      timeZonePreference: BooleanAsString.TRUE,
      useJobDesiredStartDate: false,
      useJobTimezoneAndHoursOverlap: false
    }

    const expectedResult: CreateSourcingRequestInput = {
      canIncreaseRate: true,
      canShareCompanyName: true,
      canShareRate: true,
      citizenshipRequirements: true,
      extraInformation: true,
      furtherQualificationInterviews: true,
      jobId: '1',
      mustHaveSkills: ['1'],
      noTalentHourlyRateLimit: true,
      positions: 1,
      sellingPoints: 'Good job',
      timeZonePreference: true,
      useJobDesiredStartDate: false,
      useJobTimezoneAndHoursOverlap: false
    }

    expect(prepareCreateSourcingRequestInput(input)).toEqual(expectedResult)
  })

  it('returns correct CreateSourcingRequestInput without optional boolean fields', () => {
    const input: CreateSourcingRequestFormInput = {
      canIncreaseRate: BooleanAsString.TRUE,
      canShareCompanyName: BooleanAsString.TRUE,
      canShareRate: BooleanAsString.TRUE,
      citizenshipRequirements: BooleanAsString.TRUE,
      extraInformation: BooleanAsString.TRUE,
      furtherQualificationInterviews: BooleanAsString.TRUE,
      jobId: '1',
      mustHaveSkills: ['1'],
      positions: 1,
      sellingPoints: 'Good job',
      timeZonePreference: BooleanAsString.TRUE
    }

    const expectedResult: CreateSourcingRequestInput = {
      canIncreaseRate: true,
      canShareCompanyName: true,
      canShareRate: true,
      citizenshipRequirements: true,
      extraInformation: true,
      furtherQualificationInterviews: true,
      jobId: '1',
      mustHaveSkills: ['1'],
      positions: 1,
      sellingPoints: 'Good job',
      timeZonePreference: true
    }

    expect(prepareCreateSourcingRequestInput(input)).toEqual(expectedResult)
  })
})

describe('prepareUpdateSourcingRequestInput', () => {
  it('returns correct UpdateSourcingRequestInput with optional boolean fields', () => {
    const input: UpdateSourcingRequestFormInput = {
      additionalNotes: 'Some notes',
      canIncreaseRate: BooleanAsString.TRUE,
      canShareCompanyName: BooleanAsString.TRUE,
      canShareRate: BooleanAsString.TRUE,
      citizenshipRequirements: BooleanAsString.TRUE,
      extraInformation: BooleanAsString.TRUE,
      furtherQualificationInterviews: BooleanAsString.TRUE,
      sourcingRequestId: '1',
      noTalentHourlyRateLimit: true,
      useJobDesiredStartDate: false,
      useJobTimezoneAndHoursOverlap: false
    }

    const expectedResult: UpdateSourcingRequestInput = {
      additionalNotes: 'Some notes',
      canIncreaseRate: true,
      canShareCompanyName: true,
      canShareRate: true,
      citizenshipRequirements: true,
      extraInformation: true,
      furtherQualificationInterviews: true,
      noTalentHourlyRateLimit: true,
      sourcingRequestId: '1',
      useJobDesiredStartDate: false,
      useJobTimezoneAndHoursOverlap: false
    }

    expect(prepareUpdateSourcingRequestInput(input)).toEqual(expectedResult)
  })

  it('returns correct UpdateSourcingRequestInput without optional boolean fields', () => {
    const input: UpdateSourcingRequestFormInput = {
      additionalNotes: 'Some notes',
      sourcingRequestId: '1'
    }

    const expectedResult: UpdateSourcingRequestInput = {
      additionalNotes: 'Some notes',
      sourcingRequestId: '1'
    }

    expect(prepareUpdateSourcingRequestInput(input)).toEqual(expectedResult)
  })
})
