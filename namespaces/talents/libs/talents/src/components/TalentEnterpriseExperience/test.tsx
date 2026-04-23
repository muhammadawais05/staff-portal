import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import TalentEnterpriseExperience, { Props } from './TalentEnterpriseExperience'

const arrangeTest = (props: Props = {}) =>
  render(
    <TestWrapper>
      <TalentEnterpriseExperience {...props} />
    </TestWrapper>
  )

describe('TalentEnterpriseExperience', () => {
  it('shows more than 1 year of experience', () => {
    arrangeTest({
      yearsOfEnterpriseExperience: '2.7'
    })

    expect(screen.getByText('3 years')).toBeInTheDocument()
  })

  it('shows 1 year of experience', () => {
    arrangeTest({
      yearsOfEnterpriseExperience: '1.2'
    })

    expect(screen.getByText('1 year')).toBeInTheDocument()
  })

  it('shows less than a year of experience', () => {
    arrangeTest({
      yearsOfEnterpriseExperience: '0.5'
    })

    expect(screen.getByText('less than a year')).toBeInTheDocument()
  })

  it('shows no experience in enterprise companies', () => {
    arrangeTest({
      yearsOfEnterpriseExperience: '0'
    })

    expect(screen.getByText('No')).toBeInTheDocument()
  })

  it('shows years of experience for empty value', () => {
    arrangeTest()

    expect(screen.getByText('No')).toBeInTheDocument()
  })
})
