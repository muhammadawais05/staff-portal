import React, { ComponentProps, memo, ReactElement } from 'react'
import {
  SkeletonLoader,
  Container,
  Table,
  SpacingType,
  OverviewBlock
} from '@toptal/picasso'
import { DashboardItemWrapper } from '@staff-portal/ui'

const TableExpandableRow = Table.ExpandableRow

const LIST_SKELETON_ROWCOUNT = 50

interface Props {
  isEven: boolean
}

interface ListContentProps {
  header?: ReactElement
  columnsCount: number
  rowsCount?: number
}

const HeaderButtons = () => (
  <>
    <SkeletonLoader.Button />
    <Container inline flex left='xsmall'>
      <SkeletonLoader.Button />
    </Container>
  </>
)

const ListSearch = () => <SkeletonLoader.Typography />

const ListContent = ({ header, columnsCount, rowsCount }: ListContentProps) => (
  <>
    <ListTable
      columnsCount={columnsCount}
      rowsCount={rowsCount}
      header={header}
    />
    <ListPagination />
  </>
)

const ListPagination = () => (
  <>
    <Container inline flex right={40}>
      <SkeletonLoader.Typography style={{ marginLeft: '1rem' }} />
      <SkeletonLoader.Typography style={{ marginLeft: '1rem' }} />
      <SkeletonLoader.Typography style={{ marginLeft: '1rem' }} />
    </Container>
  </>
)

const Row = memo(({ isEven }: Props) => (
  <TableExpandableRow content={null} stripeEven={isEven}>
    <Table.Cell>
      <SkeletonLoader.Typography />
    </Table.Cell>
    <Table.Cell>
      <SkeletonLoader.Typography />
    </Table.Cell>
    <Table.Cell>
      <SkeletonLoader.Typography />
    </Table.Cell>
    <Table.Cell>
      <SkeletonLoader.Typography />
    </Table.Cell>
    <Table.Cell>
      <SkeletonLoader.Typography />
    </Table.Cell>
    <Table.Cell>
      <SkeletonLoader.Typography />
    </Table.Cell>
    <Table.Cell style={{ paddingLeft: '0.25rem' }}>
      <SkeletonLoader.Button />
    </Table.Cell>
  </TableExpandableRow>
))

const ListTotals = ({
  containerTopSpacing = 'small'
}: {
  containerTopSpacing?: SpacingType
}) => (
  <Container top={containerTopSpacing}>
    <OverviewBlock.Group>
      <OverviewBlock.Row>
        {Array.from({ length: 4 }).map((item, index) => (
          <OverviewBlock
            value={<SkeletonLoader.Typography />}
            // eslint-disable-next-line react/no-array-index-key
            key={`${item}-${index}-1`}
            label=''
          />
        ))}
      </OverviewBlock.Row>
      <OverviewBlock.Row>
        {Array.from({ length: 4 }).map((item, index) => (
          <OverviewBlock
            value={<SkeletonLoader.Typography />}
            // eslint-disable-next-line react/no-array-index-key
            key={`${item}-${index}-1`}
            label=''
          />
        ))}
      </OverviewBlock.Row>
    </OverviewBlock.Group>
  </Container>
)

const ListHeadSection = ({ columnsCount = 0 }) => (
  <Table.SectionHead>
    <Container
      flex
      padded={0}
      direction='row'
      justifyContent='space-between'
      alignItems='center'
    >
      <SkeletonLoader.Typography style={{ flex: 1, marginRight: '5rem' }} />
      {Array.from({ length: columnsCount }).map((_, index) => (
        <SkeletonLoader.Typography
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          style={{ flex: 1, marginLeft: '1rem' }}
        />
      ))}
    </Container>
  </Table.SectionHead>
)

const ListTableHeadSection = ({ columnsCount = 0 }) => (
  <Table style={{ tableLayout: 'fixed' }}>
    <ListHeadSection columnsCount={columnsCount} />
  </Table>
)

const BasicTable = ({
  header,
  rowsCount = LIST_SKELETON_ROWCOUNT,
  columnsCount
}: ListContentProps) => {
  return (
    <Table style={{ tableLayout: 'fixed' }}>
      {header}
      <Table.Body>
        {Array.from({ length: rowsCount }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Table.Row key={index} stripeEven={Boolean(index % 2)}>
            {Array.from({ length: columnsCount }).map((_1, columnIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <Table.Cell key={columnIndex}>
                <SkeletonLoader.Typography />
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

const ListTable = ({
  header,
  columnsCount,
  rowsCount = LIST_SKELETON_ROWCOUNT
}: ListContentProps) => {
  return (
    <Container top={1.5} bottom={2}>
      <Table style={{ tableLayout: 'fixed' }}>
        {header}
        <ListHeadSection columnsCount={columnsCount} />
        <Table.Body>
          {Array.from({ length: rowsCount }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Row key={index} isEven={Boolean(index % 2)} />
          ))}
        </Table.Body>
      </Table>
    </Container>
  )
}

const BillingStatsWidgetDashboard = () => (
  <>
    <ListTotals containerTopSpacing='large' />
    <ListTotals containerTopSpacing='large' />
    <Container top='large'>
      <OverviewBlock.Group>
        <OverviewBlock.Row>
          {Array.from({ length: 4 }).map((item, index) => (
            <OverviewBlock
              value={<SkeletonLoader.Typography />}
              // eslint-disable-next-line react/no-array-index-key
              key={`${item}-${index}-1`}
              label=''
            />
          ))}
        </OverviewBlock.Row>
      </OverviewBlock.Group>
    </Container>
  </>
)

const DashboardItem = ({
  gridSize
}: {
  gridSize?: ComponentProps<typeof DashboardItemWrapper>['gridSize']
}) => (
  <DashboardItemWrapper
    hasPaddingTop={false}
    title={<SkeletonLoader.Typography />}
    actions={<SkeletonLoader.Button />}
    subtitle={<SkeletonLoader.Typography />}
    gridSize={gridSize}
  >
    <Table>
      <Table.Body>
        {Array.from({ length: 5 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Table.Row key={index} stripeEven={Boolean(index % 2)}>
            <Table.Cell>
              <SkeletonLoader.Typography />
            </Table.Cell>
            <Table.Cell>
              <SkeletonLoader.Typography />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </DashboardItemWrapper>
)

export default {
  HeaderButtons,
  BasicTable,
  ListHeadSection,
  ListTableHeadSection,
  ListPagination,
  ListSearch,
  ListContent,
  ListTable,
  ListTotals,
  BillingStatsWidgetDashboard,
  DashboardItem,
  Row
}
