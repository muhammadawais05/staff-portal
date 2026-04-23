import React from 'react'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { Tooltip } from '@toptal/picasso'
import { TestWrapper } from '@staff-portal/test-utils'

import TagItem, { TagItemProps } from './TagItem'

const renderComponent = (
  props: Pick<TagItemProps, 'disabled' | 'maxLimitWarning'> &
    Partial<Pick<TagItemProps, 'onClick'>> = {
    disabled: false,
    maxLimitWarning: undefined,
    onClick: jest.fn
  }
) => {
  TooltipMock.mockImplementation(({ children }) => children)

  return render(
    <TestWrapper>
      <TagItem
        name='Skill Name'
        selected={false}
        onClick={jest.fn}
        {...props}
      />
    </TestWrapper>
  )
}

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Tooltip: jest.fn()
}))

const TooltipMock = Tooltip as unknown as jest.Mock

describe('TagItem', () => {
  it('renders skill data', () => {
    renderComponent()

    expect(screen.getByText('Skill Name')).toBeInTheDocument()
  })

  it('calls onClick callback on click', () => {
    const handleClick = jest.fn()

    renderComponent({ onClick: handleClick })

    fireEvent.click(screen.getByText('Skill Name'))

    expect(handleClick).toHaveBeenCalled()
  })

  it('displays tooltip when `disabled` and `maxLimitWarning` is set', () => {
    renderComponent({
      disabled: true,
      maxLimitWarning: 'Action not allowed'
    })

    fireEvent.mouseOver(screen.getByText('Skill Name'))

    expect(TooltipMock).toHaveBeenCalledWith(
      expect.objectContaining({
        disableListeners: false,
        content: 'Action not allowed'
      }),
      {}
    )
  })

  it('does not display tooltip when `disabled` is `true` and there is no `maxLimitWarning`', () => {
    renderComponent({
      disabled: true,
      maxLimitWarning: undefined
    })

    fireEvent.mouseOver(screen.getByText('Skill Name'))

    expect(TooltipMock).toHaveBeenCalledWith(
      expect.objectContaining({ disableListeners: true, content: undefined }),
      {}
    )
  })

  it('does not display tooltip when `enabled` and `maxLimitWarning` is set', async () => {
    renderComponent({
      disabled: false,
      maxLimitWarning: 'Action not allowed'
    })

    fireEvent.mouseOver(screen.getByText('Skill Name'))

    expect(TooltipMock).toHaveBeenCalledWith(
      expect.objectContaining({
        disableListeners: true,
        content: 'Action not allowed'
      }),
      {}
    )
  })

  it('does not display tooltip when `enabled` and there is no `maxLimitWarning`', () => {
    renderComponent({
      disabled: true,
      maxLimitWarning: undefined
    })

    fireEvent.mouseOver(screen.getByText('Skill Name'))

    expect(TooltipMock).toHaveBeenCalledWith(
      expect.objectContaining({
        disableListeners: true,
        content: undefined
      }),
      {}
    )
  })
})
