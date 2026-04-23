import { createJobApplicationMock } from '@staff-portal/jobs-app/src/mocks'

export const applicationsEmptyMock = () => ({
  nodes: [],
  totalCount: 0,
  __typename: 'JobApplicationConnection'
})

export const applicationsMock = (totalCount = 5) => ({
  nodes: Array(totalCount)
    .fill('')
    .map((_, id) => createJobApplicationMock({ id: id.toString() })),
  totalCount,
  __typename: 'JobApplicationConnection'
})
