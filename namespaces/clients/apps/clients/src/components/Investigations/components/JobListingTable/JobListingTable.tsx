import React from 'react'
import { Table } from '@toptal/picasso'
import {
  SelectableTableHeaderCheckboxCell,
  SelectableTableRowCheckboxCell
} from '@staff-portal/forms'
import { JobStatus } from '@staff-portal/jobs'

import { Investigation } from '../../types'
import { Talent, Job, Claimer } from './components'
import * as S from './styles'

interface Props {
  jobs: Investigation['jobs']['nodes']
  selectable?: boolean
  showStatusTooltips?: boolean
  ignoreInvestigationStatus?: boolean
}

const JobListingTable = ({
  jobs,
  selectable = false,
  showStatusTooltips = true,
  ignoreInvestigationStatus = false
}: Props) => {
  return (
    <Table width='full'>
      <Table.Head>
        <Table.Row>
          {selectable && (
            <SelectableTableHeaderCheckboxCell
              data-testid='JobListingTable-checkbox-header'
              fieldName='jobIds'
              selectableIds={jobs.map(job => job.id)}
            />
          )}
          <Table.Cell data-testid='JobListingTable-header-job'>Job</Table.Cell>
          <Table.Cell data-testid='JobListingTable-header-talent'>
            Talent
          </Table.Cell>
          <Table.Cell data-testid='JobListingTable-header-claimer'>
            Claimer
          </Table.Cell>
          <Table.Cell data-testid='JobListingTable-header-status'>
            Status
          </Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {jobs.map(job => {
          const { id, title, webResource, claimer, currentTalents } = job
          const { totalCount: talentsCount, nodes: talents } =
            currentTalents || {}

          return (
            <Table.Row key={title}>
              {selectable && (
                <SelectableTableRowCheckboxCell
                  fieldName='jobIds'
                  id={id}
                  style={S.selectableTableRowCheckboxCell}
                  data-testid={`JobListingTable-select-job-${id}`}
                />
              )}
              <Table.Cell>
                <Job title={title} webResource={webResource} />
              </Table.Cell>
              <Table.Cell>
                <Talent talents={talents} talentsCount={talentsCount} />
              </Table.Cell>
              <Table.Cell>
                <Claimer claimer={claimer} />
              </Table.Cell>
              <Table.Cell>
                <JobStatus
                  job={job}
                  showTooltip={showStatusTooltips}
                  ignoreInvestigationStatus={ignoreInvestigationStatus}
                />
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}

export default JobListingTable
