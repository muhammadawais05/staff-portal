import React, { ReactNode } from 'react'
import { Section, Table } from '@toptal/picasso'

import HiredTalentTableCells from '../HiredTalentTableCells'

interface Props {
  'data-testid'?: string
  children?: ReactNode
}

const HiredTalentTable = ({ children, 'data-testid': dataTestId }: Props) => {
  return (
    <Section
      title='Hired Talent'
      variant='withHeaderBar'
      data-testid={dataTestId}
    >
      <Table>
        <Table.Head>
          <Table.Row>
            <HiredTalentTableCells
              talent='Talent'
              status='Status'
              actions='Actions'
            />
          </Table.Row>
        </Table.Head>
        <Table.Body>{children}</Table.Body>
      </Table>
    </Section>
  )
}

export default HiredTalentTable
