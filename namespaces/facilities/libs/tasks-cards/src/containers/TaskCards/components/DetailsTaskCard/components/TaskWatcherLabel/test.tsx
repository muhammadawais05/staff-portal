import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { RoleOrClientFragment } from '@staff-portal/facilities'

import TaskWatcherLabel, { Props } from './TaskWatcherLabel'

const arrangeTest = (customOptions: Partial<Props>) => {
  const options = {
    performerId: 'id1',
    watcher: {
      id: 'id1',
      webResource: { url: 'http://test.com' }
    } as RoleOrClientFragment,
    displayValue: 'Value to Display',
    disabled: false,
    onDelete: () => {},
    ...customOptions
  }

  const {
    container: { textContent, innerHTML }
  } = render(
    <TestWrapperWithMocks addTypename={false}>
      <TaskWatcherLabel
        performerId={options.performerId}
        watcher={options.watcher}
        displayValue={options.displayValue}
        onDelete={() => options.onDelete()}
        disabled={options.disabled}
      />
    </TestWrapperWithMocks>
  )

  return { textContent, innerHTML }
}

const deleteButton = () => document.querySelector("span[role='button']")

describe('TaskWatcherLabel', () => {
  const onDelete = jest.fn()

  it('displays a link', () => {
    const { innerHTML, textContent } = arrangeTest({
      displayValue: 'Value to Display',
      watcher: {
        id: 'id1',
        fullName: 'Jhon',
        webResource: { url: 'http://test.com', text: 'test.com' }
      }
    })

    expect(innerHTML).toContain('http://test.com')
    expect(textContent).toContain('Value to Display')
  })

  it('does not display a link', () => {
    const { innerHTML, textContent } = arrangeTest({
      displayValue: 'Value to Display',
      watcher: {
        id: 'id1',
        fullName: 'Jhon',
        webResource: { url: undefined, text: 'test.com' }
      }
    })

    expect(innerHTML).not.toContain('http://test.com')
    expect(textContent).toContain('Value to Display')
  })

  describe('If performerId and watcherId are equal', () => {
    it('does not have a delete control', () => {
      const { innerHTML } = arrangeTest({
        performerId: 'id1',
        watcher: {
          id: 'id1',
          fullName: 'Jhon',
          webResource: { url: undefined, text: 'test.com' }
        }
      })

      expect(innerHTML).not.toContain('deleteIcon')
    })
  })

  describe('If performerId and watcherId are not equal', () => {
    it('is possible to invoke the delete action', () => {
      const { innerHTML } = arrangeTest({
        performerId: 'id1',
        watcher: {
          id: 'id2',
          fullName: 'Jhon',
          webResource: { url: undefined, text: 'test.com' }
        },
        onDelete: onDelete
      })

      expect(innerHTML).toContain('deleteIcon')

      fireEvent.click(deleteButton()!)

      expect(onDelete).toHaveBeenCalled()
    })
  })
})
