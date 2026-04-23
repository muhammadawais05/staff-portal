import React from 'react'
import { EmptyState, Table, Typography } from '@toptal/picasso'
import { RepresentativeFragment } from '@staff-portal/client-representatives'

import { Opportunity } from '../Opportunity'

interface Props {
  representative?: RepresentativeFragment
}

const COLUMNS = ['Name', 'Company', 'Role', 'Stage', 'Actions']
const NO_RESULTS_MESSAGE = 'No related opportunities.'

const OpportunitiesContent = ({ representative }: Props) => {
  if (!representative?.opportunities?.nodes.length) {
    return <EmptyState.Collection>{NO_RESULTS_MESSAGE}</EmptyState.Collection>
  }

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          {COLUMNS.map(column => (
            <Table.Cell key={column}>
              <Typography variant='heading' weight='semibold'>
                {column}
              </Typography>
            </Table.Cell>
          ))}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {representative?.opportunities?.nodes.map(opportunity => (
          <Opportunity
            key={opportunity.id}
            representative={representative}
            opportunity={opportunity}
          />
        ))}
      </Table.Body>
    </Table>
  )
}

export default OpportunitiesContent
