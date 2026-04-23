import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import HistoryEntry, { Props } from './HistoryEntry'

const defaultProps = {
  entry: {
    performedAction: {
      id: '1',
      action: 'updated_legal_name',
      subjectGID: 'gid://platform/Staff/590016',
      performerGID: 'gid://platform/Talent/590018',
      payload: '{}',
      subjectName: null,
      occurredAt: '2019-07-29T09:31:41+03:00',
      template:
        '%{performer} updated legal name to University of Colorado for the client %{subject}',
      comment: null
    },
    literals: []
  }
}

const renderComponent = ({ entry, icon }: Props = defaultProps) =>
  render(
    <TestWrapper>
      <HistoryEntry entry={entry} icon={icon} />
    </TestWrapper>
  )

describe('HistoryEntry', () => {
  it('default render', () => {
    const id = '2'
    const { getByTestId } = renderComponent({
      ...defaultProps,
      entry: {
        ...defaultProps.entry,
        performedAction: {
          ...defaultProps.entry.performedAction,
          id
        }
      }
    })

    expect(getByTestId(`entry-row-${id}`)).toBeInTheDocument()
  })

  it('renders with icon', () => {
    const iconText = 'icon'

    renderComponent({
      ...defaultProps,
      icon: <div>{iconText}</div>
    })

    expect(screen.getByText(iconText)).toBeInTheDocument()
  })

  it('renders without comment', () => {
    renderComponent({
      ...defaultProps,
      entry: {
        ...defaultProps.entry,
        performedAction: {
          ...defaultProps.entry.performedAction,
          comment: null
        }
      }
    })

    expect(screen.queryByTestId('entry-comment')).not.toBeInTheDocument()
  })

  it('renders with comment', () => {
    const comment = 'test comment'

    renderComponent({
      ...defaultProps,
      entry: {
        ...defaultProps.entry,
        performedAction: {
          ...defaultProps.entry.performedAction,
          comment
        }
      }
    })

    expect(screen.getByTestId('entry-comment')).toHaveTextContent(comment)
  })

  it(`formats comment by replacing '\n' and '\r' with '<br>'`, () => {
    const comment = 'test\ncomment\rformatted'
    const expectedContent = 'test<br>comment<br>formatted'

    renderComponent({
      ...defaultProps,
      entry: {
        ...defaultProps.entry,
        performedAction: {
          ...defaultProps.entry.performedAction,
          comment
        }
      }
    })
    const content = screen.getByTestId('entry-comment').innerHTML

    expect(content).toBe(expectedContent)
  })

  it('escapes html when there is a performerGID', () => {
    const comment = '<a href="/test-url">danger link</a>'
    const expectedContent = '&lt;a href="/test-url"&gt;danger link&lt;/a&gt;'

    renderComponent({
      ...defaultProps,
      entry: {
        ...defaultProps.entry,
        performedAction: {
          ...defaultProps.entry.performedAction,
          performerGID: 'test',
          comment
        }
      }
    })
    const content = screen.getByTestId('entry-comment').innerHTML

    expect(content).toBe(expectedContent)
  })

  it('does not escape html when there is not a performerGID (aka system comment)', () => {
    const comment = '<a href="/test-url">danger link</a>'
    const expectedContent = '<a href="/test-url">danger link</a>'

    renderComponent({
      ...defaultProps,
      entry: {
        ...defaultProps.entry,
        performedAction: {
          ...defaultProps.entry.performedAction,
          performerGID: null,
          comment
        }
      }
    })
    const content = screen.getByTestId('entry-comment').innerHTML

    expect(content).toBe(expectedContent)
  })
})
