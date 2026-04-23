import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { screen, render } from '@testing-library/react'

import TalentCard, { Props } from './TalentCard'

const renderComponent = (props: Props) => {
  return render(
    <TestWrapper>
      <TalentCard {...props} />
    </TestWrapper>
  )
}

describe('TalentCard', () => {
  const fullName = 'Timofei Kachalov'

  it('displays talent name', () => {
    renderComponent({ fullName })

    expect(screen.getByText(fullName)).toBeInTheDocument()
    expect(screen.queryByTestId('subtitle')).not.toBeInTheDocument()
  })

  describe('when location data is passed', () => {
    it('displays location data', () => {
      renderComponent({ fullName, countryName: 'USA', cityName: 'New York' })

      expect(screen.getByText('New York, USA')).toBeInTheDocument()
    })
  })

  describe('when top skill data is passed', () => {
    it('displays top skill data', () => {
      renderComponent({ fullName, topSkillTitle: 'TypeScript Engineer' })

      expect(screen.getByText('TypeScript Engineer')).toBeInTheDocument()
    })
  })

  describe('when both top skill and location data is passed', () => {
    it('displays top skill and location data', () => {
      renderComponent({
        fullName,
        topSkillTitle: 'TypeScript Engineer',
        countryName: 'USA',
        cityName: 'New York'
      })

      expect(
        screen.getByText('TypeScript Engineer • New York, USA')
      ).toBeInTheDocument()
    })
  })
})
