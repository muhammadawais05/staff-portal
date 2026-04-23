import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import JobsList from '.'
import { GetJobListItemFragment } from '../data/getJobListItemFragment.graphql.types'

jest.mock('./components/JobsListHeader')
jest.mock('./components/JobsListRow')

const render = (props: ComponentProps<typeof JobsList>) =>
  renderComponent(<JobsList {...props} />)

describe('JobsList', () => {
  describe('when its loading', () => {
    it('default render', () => {
      const { getByTestId } = render({
        jobs: [],
        loading: true,
        initialLoading: false
      })

      expect(getByTestId('LoaderOverlay')).toBeInTheDocument()
    })
  })

  describe('when its loading initially', () => {
    it('default render', () => {
      const { getByTestId } = render({
        jobs: [],
        loading: false,
        initialLoading: true
      })

      expect(getByTestId('JobsListSkeleton')).toBeInTheDocument()
    })
  })

  describe('when its not loading', () => {
    it('default render', () => {
      const { getByTestId } = render({
        jobs: [
          {
            job: fixtures.MockJobList.nodes[0] as GetJobListItemFragment,
            showJob: true,
            showEngagement: true
          }
        ],
        loading: false,
        initialLoading: false
      })

      expect(getByTestId('JobsList-title')).toBeInTheDocument()
    })

    describe('when the data is empty', () => {
      it('renders empty state', () => {
        const { getByTestId } = render({
          jobs: [],
          loading: false,
          initialLoading: false
        })

        expect(getByTestId('JobsList-empty')).toBeInTheDocument()
      })
    })
  })
})
