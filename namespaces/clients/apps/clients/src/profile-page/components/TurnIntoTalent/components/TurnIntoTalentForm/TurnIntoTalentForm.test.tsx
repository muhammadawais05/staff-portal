import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import TurnIntoTalentForm from '.'

jest.mock('@staff-portal/mutation-result-handlers', () => ({
  useModalFormChangeHandler: () => ({
    handleSubmit: () => null,
    loading: false
  })
}))

const renderComponent = () => {
  return render(
    <TestWrapper>
      <TurnIntoTalentForm
        verticals={[]}
        companyId='1'
        fullName='FullName'
        hideModal={() => null}
      />
    </TestWrapper>
  )
}

describe('TurnIntoTalentForm', () => {
  it('renders fields and submit button', () => {
    renderComponent()

    expect(screen.getByTestId('TurnIntoTalent-vertical')).toBeInTheDocument()
    expect(screen.getByTestId('TurnIntoTalent-fullName')).toBeInTheDocument()
    expect(screen.getByTestId('TurnIntoTalent-comment')).toBeInTheDocument()
    expect(screen.getByTestId('TurnIntoTalent-submit')).toHaveTextContent(
      'Turn Into Talent'
    )
  })
})
