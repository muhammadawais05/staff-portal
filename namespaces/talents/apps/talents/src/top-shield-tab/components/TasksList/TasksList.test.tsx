import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import {
  createTopShieldApplicationMock
} from '@staff-portal/talents-top-shield/src/mocks'

import TasksList from '.'
jest.unmock('@staff-portal/editable')

const arrangeTest = (props: ComponentProps<typeof TasksList>) => {
  return render(
    <TestWrapperWithMocks mocks={[]}>
      <TasksList
        talentTopShield={props.talentTopShield}
        refetch={props.refetch}
      />
    </TestWrapperWithMocks>
  )
}

describe('TasksList', () => {
  it('renders generic tasks list', () => {
    const talentTopShield = createTopShieldApplicationMock()

    arrangeTest({ talentTopShield, refetch: () => null })

    expect(screen.getByTestId('tasks-section')).toBeInTheDocument()
    expect(screen.getByText('Task description')).toBeInTheDocument()
  })
})
