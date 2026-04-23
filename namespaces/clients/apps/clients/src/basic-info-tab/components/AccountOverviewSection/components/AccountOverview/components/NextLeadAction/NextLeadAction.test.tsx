import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { Tooltip } from '@toptal/picasso'
import { TestWrapper } from '@staff-portal/test-utils'
import { NO_VALUE } from '@staff-portal/config'

import NextLeadAction from '.'

jest.mock('@toptal/picasso/Tooltip')
const TooltipMock = Tooltip as unknown as jest.Mock

const renderComponent = ({
  comment = 'comment',
  status
}: ComponentProps<typeof NextLeadAction>) => {
  return render(
    <TestWrapper>
      <NextLeadAction status={status} comment={comment} />
    </TestWrapper>
  )
}

describe('NextLeadAction', () => {
  beforeEach(() => {
    TooltipMock.mockImplementation(({ children }) => (
      <div data-testid='tooltip'>{children}</div>
    ))
  })

  it('renders status value', () => {
    renderComponent({ status: 'status', comment: '' })

    expect(screen.getByTestId('NextLeadAction-status')).toHaveTextContent(
      'status'
    )
  })

  describe('when no status', () => {
    it.each([
      { status: null, comment: '' },
      { status: undefined, comment: 'comment' },
      { status: '', comment: null }
    ])('renders dash', props => {
      renderComponent(props)

      expect(screen.getByText(NO_VALUE)).toBeInTheDocument()
      expect(screen.getByTestId('NextLeadAction-status')).toHaveTextContent(
        NO_VALUE
      )
    })
  })

  describe('when comment available', () => {
    it('shows icon and tooltip with comment', () => {
      const status = 'status'
      const comment = 'comment'

      renderComponent({ status, comment })

      expect(TooltipMock).toHaveBeenCalledTimes(1)
      expect(TooltipMock).toHaveBeenCalledWith(
        expect.objectContaining({
          content: comment
        }),
        {}
      )
      expect(screen.getByTestId('tooltip')).toBeInTheDocument()
      expect(screen.getByTestId('NextLeadAction-status')).toHaveTextContent(
        status
      )
      expect(screen.getByTestId('NextLeadAction-icon')).toBeInTheDocument()
    })
  })

  describe('when no comment', () => {
    it("doesn't show icon and tooltip", () => {
      renderComponent({ status: 'status', comment: '' })

      expect(screen.queryByTestId('tooltip')).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('NextLeadAction-icon')
      ).not.toBeInTheDocument()
    })
  })
})
