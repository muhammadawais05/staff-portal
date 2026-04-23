import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import TimesheetJobTitle from '.'

let mockJobTitle: string | undefined

const render = () => renderComponent(<TimesheetJobTitle />)

jest.mock('../../../../../engagement/context', () => ({
  useEngagementContext: () => ({
    job: { title: mockJobTitle }
  })
}))

describe('TimesheetJobTitle', () => {
  describe('when jobTitle is defined', () => {
    beforeEach(() => {
      mockJobTitle = 'test job title'
    })

    it('default render', () => {
      const { queryByTestId } = render()

      expect(queryByTestId('job-title')).toContainHTML('test job title')
    })
  })

  describe('when jobTitle is undefined', () => {
    beforeEach(() => {
      mockJobTitle = undefined
    })

    it('default render', () => {
      const { queryByTestId } = render()

      expect(queryByTestId('job-title')).not.toBeInTheDocument()
    })
  })
})
