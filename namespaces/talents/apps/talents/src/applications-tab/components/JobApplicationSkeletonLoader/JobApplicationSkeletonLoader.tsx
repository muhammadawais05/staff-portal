import React from 'react'
import { Container, Table, SkeletonLoader } from '@toptal/picasso'

import * as S from './styles'

const renderRow = (numberOfColumns: number) =>
  [...Array(numberOfColumns)].map((_, index) => (
    // TODO: replaced by a reusable Component
    // Skeleton loader, no unique id
    // eslint-disable-next-line react/no-array-index-key
    <Table.Cell key={index}>
      <SkeletonLoader.Typography />
    </Table.Cell>
  ))

const renderRows = (numberOfRows: number, numberOfColumns: number) =>
  [...Array(numberOfRows)].map((_, index) => (
    // TODO: replaced by a reusable Component
    // Skeleton loader, no unique id
    // eslint-disable-next-line react/no-array-index-key
    <Table.Row key={index}>{renderRow(numberOfColumns)}</Table.Row>
  ))

const JobApplicationlist = () => {
  return (
    <>
      <SkeletonLoader.Typography css={S.container} />
      <Container top='small'>
        <Table>
          <Table.Head>{renderRows(1, 4)}</Table.Head>
          <Table.Body>{renderRows(4, 4)}</Table.Body>
        </Table>
      </Container>
    </>
  )
}

export default JobApplicationlist
