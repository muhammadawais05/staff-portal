import React, { useState } from 'react'
import { Checkbox, Table } from '@toptal/picasso'

import JobApplicantsTableItem from '../JobApplicantsTableItem'
import * as S from './styles'
import { JobApplicationItemFragment } from '../JobApplicantsSection/data/get-job-applications'
import JobApplicantsLoader from '../JobApplicantsLoader/JobApplicantsLoader'

export interface Props {
  jobApplications?: JobApplicationItemFragment[] | null
  selectedIds: string[]
  onItemSelect: (jobApplicantId: string) => void
  onItemDeselect: (jobApplicantId: string) => void
  onAllItemsSelect: () => void
  onAllItemsDeselect: () => void
  loading?: boolean
  jobId: string
}

const JobApplicantsTable = ({
  jobApplications = [],
  jobId,
  selectedIds,
  onItemSelect,
  onItemDeselect,
  onAllItemsSelect,
  onAllItemsDeselect,
  loading
}: Props) => {
  const [expandedJobApplicationId, setExpandedJobApplicationId] = useState<
    string | null
  >(null)

  if (loading) {
    return <JobApplicantsLoader rows={5} />
  }

  if (!jobApplications) {
    return null
  }

  const isAllSelected = selectedIds.length === jobApplications.length

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell css={S.checkboxCol}>
            <Checkbox
              checked={isAllSelected}
              onChange={e =>
                e.target.checked ? onAllItemsSelect() : onAllItemsDeselect()
              }
            />
          </Table.Cell>
          <Table.Cell css={S.talentCol}>Talent</Table.Cell>
          <Table.Cell css={S.appliedCol}>Applied</Table.Cell>
          <Table.Cell css={S.bestMatchCol}>Best Match</Table.Cell>
          <Table.Cell css={S.ratesCol}>Rates</Table.Cell>
          <Table.Cell css={S.availabilityCol}>Availability</Table.Cell>
          <Table.Cell css={S.actionsCol}>Actions</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {jobApplications.map((application, index) => (
          <JobApplicantsTableItem
            key={application.id}
            jobApplication={application}
            index={index}
            isSelected={selectedIds.includes(application.id)}
            onSelect={onItemSelect}
            onDeselect={onItemDeselect}
            isExpanded={expandedJobApplicationId === application.id}
            expandItem={setExpandedJobApplicationId}
            jobId={jobId}
          />
        ))}
      </Table.Body>
    </Table>
  )
}

export default JobApplicantsTable
