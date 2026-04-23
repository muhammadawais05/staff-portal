import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import { companyMock } from '../../data/company-task-card-fragment/mocks'
import { TaskCardCompanyFragment } from '../../data/company-task-card-fragment'
import CompanyTaskCardJobs from './CompanyTaskCardJobs'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const arrangeTest = (customOptions: any = {}) => {
  const company = {
    ...companyMock,
    ...customOptions
  } as TaskCardCompanyFragment

  const {
    container: { textContent, innerHTML }
  } = render(
    <TestWrapperWithMocks addTypename={false}>
      <CompanyTaskCardJobs company={company} />
    </TestWrapperWithMocks>
  )

  return { textContent, innerHTML }
}

describe('CompanyTaskCardJobs', () => {
  describe('when one of the values is undefined', () => {
    it('returns null', () => {
      const { textContent } = arrangeTest({
        activeJobs: { totalCount: 0 },
        totalJobs: { totalCount: undefined }
      })

      expect(textContent).not.toContain('Jobs')
    })
  })

  it('has `Jobs` label and 0 / 0 value', () => {
    const { textContent } = arrangeTest({
      activeJobs: { totalCount: 0 },
      totalJobs: { totalCount: 0 }
    })

    expect(textContent).toContain('Jobs')
    expect(textContent).toContain('0 / 0')
  })

  it('shows given values', () => {
    const { textContent } = arrangeTest({
      activeJobs: { totalCount: 10 },
      totalJobs: { totalCount: 100 }
    })

    expect(textContent).toContain('Jobs')
    expect(textContent).toContain('10 / 100')
  })

  it('has a gray Info16 Icon', () => {
    const { innerHTML } = arrangeTest()

    expect(innerHTML).toContain('Info16')
    expect(innerHTML).toContain('darkGrey')
  })
})
