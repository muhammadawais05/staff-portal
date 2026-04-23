import React, { ComponentProps } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@testing-library/react'
import { EngagementCommitmentEnum } from '@staff-portal/graphql/staff'
import { Form } from '@toptal/picasso-forms'

import { useCandidateSendingContext } from '../../../../../../hooks'
import CommitmentCreateHoursItem from './CommitmentCreateHoursItem'

jest.mock(
  '../../../../../../hooks',
  () => ({
    useCandidateSendingContext: jest.fn()
  })
)

const useCandidateSendingContextMock = useCandidateSendingContext as jest.Mock

const renderComponent = ({
  props,
  commitment
}: {
  props?: ComponentProps<typeof CommitmentCreateHoursItem>
  commitment?: EngagementCommitmentEnum | null
} = {}) => {
  useCandidateSendingContextMock.mockReturnValue({
    stepsAttributes: {
      commitment
    }
  })

  return render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <CommitmentCreateHoursItem {...props} />
      </Form>
    </TestWrapper>
  )
}

describe('CommitmentCreateHoursItem', () => {
  describe('when `commitment` is `undefined`', () => {
    it('does not render content', () => {
      renderComponent({ commitment: undefined })

      expect(screen.queryByText('Minimum Commitment')).not.toBeInTheDocument()
      expect(
        screen.queryByText('Minimum Commitment Change Reason')
      ).not.toBeInTheDocument()
    })
  })

  describe('when `commitmentSettingsApplicable` is falsy', () => {
    it('does not render content', () => {
      renderComponent({ props: { commitmentSettingsApplicable: false } })

      expect(screen.queryByText('Minimum Commitment')).not.toBeInTheDocument()
      expect(
        screen.queryByText('Minimum Commitment Change Reason')
      ).not.toBeInTheDocument()
    })
  })

  describe('when `commitment` is not `HOURLY`', () => {
    it('does not render content', () => {
      renderComponent({
        props: { commitmentSettingsApplicable: true },
        commitment: EngagementCommitmentEnum.FULL_TIME
      })

      expect(screen.queryByText('Minimum Commitment')).not.toBeInTheDocument()
      expect(
        screen.queryByText('Minimum Commitment Change Reason')
      ).not.toBeInTheDocument()
    })
  })

  describe('when `commitmentSettingsApplicable` is truthy & `commitment` is `HOURLY`', () => {
    it('renders content', () => {
      renderComponent({
        props: { commitmentSettingsApplicable: true },
        commitment: EngagementCommitmentEnum.HOURLY
      })

      expect(screen.getByText('Minimum Commitment')).toBeInTheDocument()
      expect(
        screen.getByText('Minimum Commitment Change Reason')
      ).toBeInTheDocument()
    })
  })
})
