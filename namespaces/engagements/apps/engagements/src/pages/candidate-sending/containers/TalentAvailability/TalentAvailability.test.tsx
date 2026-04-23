import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'

import { AvailabilityStepTalentAvailabilityDataFragment } from '../../data/get-availability-step-talent-availability-data'
import TalentAvailability, { Props } from './TalentAvailability'

jest.mock('@staff-portal/talents-workload', () => ({
  ...jest.requireActual('@staff-portal/talents-workload'),
  TalentAllocatedHours: () => <div data-testid='talent-allocated-hours' />
}))

jest.mock('@staff-portal/talents', () => ({
  AvailabilityStatus: () => <div data-testid='availability-status' />
}))

jest.mock('../../components', () => ({
  CalendarAvailability: () => <div data-testid='calendar-availability' />
}))

const renderComponent = ({ availabilityData }: Props) =>
  render(
    <TestWrapper>
      <TalentAvailability availabilityData={availabilityData} />
    </TestWrapper>
  )

describe('TalentAvailability', () => {
  describe('when talent is missing', () => {
    it('hides the talent availability section', () => {
      renderComponent({ availabilityData: { talent: null, job: { id: '1' } } })

      expect(
        screen.queryByTestId('talent-availability')
      ).not.toBeInTheDocument()
    })
  })

  describe('when job is missing', () => {
    it('hides the talent availability section', () => {
      renderComponent({
        availabilityData: {
          talent: {} as AvailabilityStepTalentAvailabilityDataFragment['talent']
        }
      })

      expect(
        screen.queryByTestId('talent-availability')
      ).not.toBeInTheDocument()
    })
  })

  describe('when talent and job are available', () => {
    it('shows the talent availability section', () => {
      renderComponent({
        availabilityData: {
          talent: {
            operations: { updateTalentAllocatedHours: {} }
          } as AvailabilityStepTalentAvailabilityDataFragment['talent'],
          job: {} as AvailabilityStepTalentAvailabilityDataFragment['job'],
          talentCalendarAvailability: [{ date: '2022-02-02', slotsCount: 1 }]
        }
      })

      expect(screen.getByText('Allocated hours')).toBeInTheDocument()
      expect(screen.getByText('Current availability')).toBeInTheDocument()
      expect(screen.getByText('Required for this job')).toBeInTheDocument()
      expect(screen.getByText('Calendar Availability')).toBeInTheDocument()
    })
  })

  describe('when calendar availability is empty', () => {
    it('hides the talent calendar availability', () => {
      renderComponent({
        availabilityData: {
          talent: {
            operations: { updateTalentAllocatedHours: {} }
          } as AvailabilityStepTalentAvailabilityDataFragment['talent'],
          job: {} as AvailabilityStepTalentAvailabilityDataFragment['job'],
          talentCalendarAvailability: []
        }
      })

      expect(
        screen.queryByText('Calendar Availability')
      ).not.toBeInTheDocument()
    })
  })
})
