import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { TopShieldApplicationOutreachStage } from '@staff-portal/graphql/staff'

import TopShieldOutreachStage from '.'

jest.unmock('@staff-portal/editable')

jest.mock('./hooks/use-update-outreach-stage', () => ({
  useUpdateOutreachStage: () => [jest.fn()]
}))

const arrangeTest = (
  props: Partial<ComponentProps<typeof TopShieldOutreachStage>> = {}
) => {
  return render(
    <TestWrapper>
      <TopShieldOutreachStage
        talentId='123'
        applicationId='123'
        outreachStage={TopShieldApplicationOutreachStage.CALL_SCHEDULED}
        operationDisabled={props.operationDisabled ?? false}
      />
    </TestWrapper>
  )
}

describe('TopShieldOutreachStage', () => {
  describe('when operation is disabled', () => {
    it('renders non-editable value', () => {
      arrangeTest({ operationDisabled: true })

      expect(screen.queryByText('Call scheduled')).toBeInTheDocument()
      expect(
        screen.queryByTestId('EditableField-toggle-button-outreachStage')
      ).not.toBeInTheDocument()
    })
  })

  describe('when operation is enabled', () => {
    it('renders editable value', () => {
      arrangeTest({ operationDisabled: false })

      expect(screen.queryByText('Call scheduled')).toBeInTheDocument()
      expect(
        screen.getByTestId('EditableField-toggle-button-outreachStage')
      ).toBeEnabled()
    })
  })
})
