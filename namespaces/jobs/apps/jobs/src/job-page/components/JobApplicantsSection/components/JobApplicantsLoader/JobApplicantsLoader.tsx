import { Table, SkeletonLoader } from '@toptal/picasso'
import React from 'react'

import * as TableStyles from '../JobApplicantsTable/styles'
export interface Props {
  rows?: number
}

const renderRows = (numberOfRows: number) =>
  [...Array(numberOfRows)].map((_, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <Table.Row css={TableStyles.tableRow} key={index}>
      <Table.Cell css={TableStyles.checkboxCol}>
        <SkeletonLoader.Typography />
      </Table.Cell>
      <Table.Cell css={TableStyles.talentCol}>
        <SkeletonLoader.Typography />
      </Table.Cell>
      <Table.Cell css={TableStyles.appliedCol}>
        <SkeletonLoader.Typography />
      </Table.Cell>
      <Table.Cell css={TableStyles.bestMatchCol}>
        <SkeletonLoader.Typography />
      </Table.Cell>
      <Table.Cell css={TableStyles.ratesCol}>
        <SkeletonLoader.Typography />
      </Table.Cell>
      <Table.Cell css={TableStyles.availabilityCol}>
        <SkeletonLoader.Typography />
      </Table.Cell>
      <Table.Cell css={TableStyles.actionsCol}>
        <SkeletonLoader.Typography />
      </Table.Cell>
    </Table.Row>
  ))

const JobApplicantsLoader = ({ rows = 5 }: Props) => {
  return <Table data-testid='job-applicants-loader'>
    <Table.Head>{renderRows(1)}</Table.Head>
    <Table.Body>{renderRows(rows)}</Table.Body>
  </Table>
}

export default JobApplicantsLoader
