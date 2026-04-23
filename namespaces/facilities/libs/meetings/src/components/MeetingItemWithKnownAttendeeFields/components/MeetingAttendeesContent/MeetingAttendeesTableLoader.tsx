import React from 'react'
import { TableSkeleton, TableSkeletonColumn } from '@staff-portal/ui'

const cols: TableSkeletonColumn[] = [
  {
    title: 'Name'
  },
  {
    title: 'Country'
  },
  {
    title: 'Join Time'
  },
  {
    title: 'Leave Time'
  }
]

const MeetingAttendeesTableLoader = () => {
  return (
    <TableSkeleton
      rows={4}
      cols={cols}
      dataTestId='attendees-table-loader'
      spacing='narrow'
    />
  )
}

export default MeetingAttendeesTableLoader
