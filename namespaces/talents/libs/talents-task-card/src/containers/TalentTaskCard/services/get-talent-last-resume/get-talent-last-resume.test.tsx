import { render, screen } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { TaskTalentFragment } from '../../../../data/talent-fragment'
import { getTalentLastResume } from './get-talent-last-resume'

const arrangeTest = (params: TaskTalentFragment['profile']) =>
  render(<TestWrapper>{getTalentLastResume(params)}</TestWrapper>)

describe('getTalentLastResume', () => {
  it('returns nothing when there is no profile', () => {
    const result = getTalentLastResume(null)

    expect(result).toBeUndefined()
  })

  it('returns only identifier', () => {
    const IDENTIFIER = '1'
    const URL = 'test'

    arrangeTest({
      id: 'a',
      resumeFiles: { nodes: [{ identifier: IDENTIFIER, url: URL }] }
    })

    expect(screen.getByText(IDENTIFIER)).toBeInTheDocument()
    expect(screen.getByText(IDENTIFIER).closest('a')).toHaveAttribute(
      'href',
      URL
    )
    expect(screen.queryByTestId('uploaded-at-info')).not.toBeInTheDocument()
  })

  it('returns both date and identifier', () => {
    const IDENTIFIER = '1'
    const DATE = '2020-04-16T00:00:00+00:00'
    const DATE_FORMATTED = 'Apr 16, 2020'

    const { container } = arrangeTest({
      id: 'a',
      resumeFiles: {
        nodes: [{ identifier: IDENTIFIER, uploadedAt: DATE, url: 'test' }]
      }
    })

    expect(container).toHaveTextContent(`${DATE_FORMATTED} - ${IDENTIFIER}`)
    expect(screen.getByTestId('uploaded-at-info')).toBeInTheDocument()
  })
})
