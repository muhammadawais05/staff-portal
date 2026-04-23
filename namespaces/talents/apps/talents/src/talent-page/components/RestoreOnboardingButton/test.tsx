import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { TalentFragment } from '@staff-portal/talents'

import RestoreOnboardingButton from './RestoreOnboardingButton'

const arrangeTest = ({
  restoreOnboardingTalent = OperationCallableTypes.ENABLED,
  messages = []
}: {
  restoreOnboardingTalent?: OperationCallableTypes
  messages?: string[]
} = {}) => {
  const talent = {
    operations: {
      restoreOnboardingTalent: {
        callable: restoreOnboardingTalent,
        messages
      }
    }
  }

  return render(
    <TestWrapper>
      <RestoreOnboardingButton talent={talent as unknown as TalentFragment} />
    </TestWrapper>
  )
}

describe('RestoreOnboardingButton', () => {
  it('shows the restore onboarding button', () => {
    arrangeTest()

    expect(screen.getByText('Restore Onboarding')).toBeInTheDocument()
  })

  it('hides the restore onboarding button', () => {
    arrangeTest({ restoreOnboardingTalent: OperationCallableTypes.HIDDEN })

    expect(screen.queryByText('Restore Onboarding')).not.toBeInTheDocument()
  })

  it('disables the restore onboarding button', async () => {
    arrangeTest({
      restoreOnboardingTalent: OperationCallableTypes.DISABLED,
      messages: ['Test tooltip']
    })

    fireEvent.focus(await screen.findByText('Restore Onboarding'))

    expect(screen.getByText('Test tooltip')).toBeInTheDocument()
  })
})
