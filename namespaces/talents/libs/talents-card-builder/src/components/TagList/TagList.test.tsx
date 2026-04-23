import React from 'react'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import TagList, { TagListProps } from './TagList'
import getTagItemMock from '../../mocks/get-tag-item-mock/get-tag-item-mock'

const renderComponent = (
  props: Pick<
    TagListProps,
    'data' | 'toggleItem' | 'maxLimit' | 'maxLimitWarning'
  >
) =>
  render(
    <TestWrapper>
      <TagList value={[]} title='Skills' testId='skillItem' {...props} />
    </TestWrapper>
  )

describe('TagList', () => {
  it('renders skills data', () => {
    const skill1 = getTagItemMock({
      id: 'skill-1',
      name: 'Skill Name 1'
    })

    const skill2 = getTagItemMock({
      id: 'skill-2',
      name: 'Skill Name 2'
    })

    renderComponent({
      data: [skill1, skill2],
      toggleItem: jest.fn()
    })

    expect(screen.getByText('Skill Name 1')).toBeInTheDocument()
    expect(screen.getByText('Skill Name 2')).toBeInTheDocument()
  })

  it('toggles the item on click', () => {
    const skill = getTagItemMock({
      id: 's1',
      name: 'Skill Name'
    })

    const toggleItem = jest.fn()

    renderComponent({
      data: [skill],
      toggleItem
    })

    fireEvent.click(screen.getByText('Skill Name'))

    expect(toggleItem).toHaveBeenCalledWith('s1')
  })

  it('displays tooltip over disabled items when maxLimit is reached', async () => {
    const skills = Array.from({ length: 4 }).map((_, index) =>
      getTagItemMock({
        id: `skill-${index + 1}`,
        name: `Skill Name ${index + 1}`
      })
    )

    renderComponent({
      data: skills,
      toggleItem: jest.fn(),
      maxLimit: 2,
      maxLimitWarning: 'Action not allowed'
    })

    const disabledTag = screen.getByText('Skill Name 3')

    fireEvent.mouseOver(disabledTag)

    expect(await screen.queryByText('Action not allowed')).toBeInTheDocument()
  })
})
