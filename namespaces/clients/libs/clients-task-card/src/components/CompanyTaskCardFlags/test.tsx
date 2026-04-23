import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import { companyMock } from '../../data/company-task-card-fragment/mocks'
import CompanyTaskCardFlags from './CompanyTaskCardFlags'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const arrangeTest = (customOptions: any = {}) => {
  const flags = {
    ...companyMock.flags,
    ...customOptions
  }

  const {
    container: { textContent, innerHTML }
  } = render(
    <TestWrapperWithMocks addTypename={false}>
      <CompanyTaskCardFlags flags={flags} />
    </TestWrapperWithMocks>
  )

  return { textContent, innerHTML }
}

describe('CompanyTaskCardFlags', () => {
  it('does not have flags', () => {
    const { textContent } = arrangeTest({ nodes: [] })

    expect(textContent).toBe('')
  })

  it('shows given flags', () => {
    const { textContent } = arrangeTest({
      nodes: [
        {
          id: 'id1',
          flag: {
            title: 'First Tag'
          },
          comment: 'First Tag comment.',
          flaggedBy: null,
          createdAt: '2019-04-10T21:35:01-05:00',
          updatedAt: '2019-04-10T21:35:01-05:00'
        },
        {
          id: 'id2',
          flag: {
            title: 'Second Tag'
          },
          comment: 'Second Tag comment.',
          flaggedBy: null,
          createdAt: '2019-04-10T21:35:01-05:00',
          updatedAt: '2019-04-10T21:35:01-05:00'
        }
      ]
    })

    expect(textContent).toContain('First Tag')
    expect(textContent).toContain('Second Tag')
  })
})
