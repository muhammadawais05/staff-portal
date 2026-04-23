import React, { ComponentProps } from 'react'
import { Table } from '@toptal/picasso'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import JobListRow from '.'
import { GetJobListItemFragment } from '../../../data/getJobListItemFragment.graphql.types'

const render = (props: ComponentProps<typeof JobListRow>) =>
  renderComponent(
    <Table>
      <Table.Body>
        <JobListRow {...props} />
      </Table.Body>
    </Table>
  )

describe('JobListRow', () => {
  it('default render', () => {
    const { queryByTestId } = render({
      index: 1,
      job: {
        ...(fixtures.MockJobList.nodes[0] as GetJobListItemFragment)
      },
      showJob: true,
      showEngagement: true
    })

    expect(queryByTestId('JobsListRow-job-title')).toHaveTextContent(
      'Chief Research Developer (223944)'
    )
    expect(queryByTestId('JobsListRow-job-id')).toHaveTextContent('223944')
    expect(queryByTestId('JobsListRow-engagement-id')).toHaveTextContent(
      '220745'
    )
  })

  it('`showJob`:false hides the job', () => {
    const { queryByTestId } = render({
      index: 1,
      job: {
        ...(fixtures.MockJobList.nodes[0] as GetJobListItemFragment)
      },
      showJob: false,
      showEngagement: true
    })

    expect(queryByTestId('JobsListRow-job-title')).toHaveTextContent(
      'Chief Research Developer (223944)'
    )
    expect(queryByTestId('JobsListRow-job-id')).toHaveTextContent('')
    expect(queryByTestId('JobsListRow-engagement-id')).toHaveTextContent(
      '220745'
    )
  })

  it('`showEngagement`:false hides the engagement', () => {
    const { queryByTestId } = render({
      index: 1,
      job: {
        ...(fixtures.MockJobList.nodes[0] as GetJobListItemFragment)
      },
      showJob: true,
      showEngagement: false
    })

    expect(queryByTestId('JobsListRow-job-title')).toHaveTextContent(
      'Chief Research Developer (223944)'
    )
    expect(queryByTestId('JobsListRow-job-id')).toHaveTextContent('223944')
    expect(queryByTestId('JobsListRow-engagement-id')).toHaveTextContent('')
  })
})
