import React from 'react'
import { Table } from '@toptal/picasso'

import { Header, Item } from './components'
import { CandidateIntroDraftItem } from '../../types'

interface Props {
  candidates?: CandidateIntroDraftItem[]
}

const CandidateIntroDraftsTable = ({ candidates }: Props) => {
  return (
    <Table>
      <Header />

      <Table.Body>
        {candidates?.map((candidate, index) => (
          <Item key={candidate.id} candidate={candidate} index={index} />
        ))}
      </Table.Body>
    </Table>
  )
}

export default CandidateIntroDraftsTable
