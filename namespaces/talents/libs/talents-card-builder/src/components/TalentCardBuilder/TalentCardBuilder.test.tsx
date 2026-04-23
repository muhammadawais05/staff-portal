import React, { ReactNode } from 'react'
import { FinalForm } from '@toptal/picasso-forms'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import { emptyFormState } from '../../utils/emptyFormState'
import { getVerticalSpecificContext } from '../../utils/validationVerticalContext'
import TalentCardBuilder from './TalentCardBuilder'

const initialValues = { ...emptyFormState, submissionAttempted: false }

const TestComponent = ({ children }: { children: ReactNode }) => {
  return (
    <FinalForm
      onSubmit={jest.fn()}
      validate={jest.fn()}
      initialValues={initialValues}
    >
      {() => children}
    </FinalForm>
  )
}

describe('TalentCardBuilder', () => {
  it('renders in the edit mode', async () => {
    const handleToggle = jest.fn()

    render(
      <TestWrapperWithMocks mocks={[]}>
        <TestComponent>
          <TalentCardBuilder
            roleId={123}
            talentProfile={{
              id: '123',
              fullName: 'John Doe',
              type: 'Developer',
              profileV2: {
                id: '123',
                city: 'New York',
                certifications: {
                  nodes: []
                },
                educations: {
                  nodes: []
                },
                employments: {
                  nodes: []
                },
                industries: {
                  nodes: []
                },
                portfolioItems: {
                  nodes: []
                },
                skillSets: {
                  nodes: []
                }
              }
            }}
            inEdit
            cardValidationContext={getVerticalSpecificContext('developer')}
            onCardPreviewToggle={handleToggle}
          />
        </TestComponent>
      </TestWrapperWithMocks>
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('New York')).toBeInTheDocument()
    expect(screen.getByTestId('talentCardEditor')).toBeInTheDocument()
  })
})
