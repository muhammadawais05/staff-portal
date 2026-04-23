import React from 'react'
import { Checkbox, Table, Container } from '@toptal/picasso'
import { NoSearchResultsMessage } from '@staff-portal/ui'
import { Talent } from '@staff-portal/talents-screening-specialists'

import TalentTableRowDataCells from '../TalentTableRowDataCells'
import TalentTableLoader from './TalentTableLoader'
import * as S from './styles'

export interface Props {
  talents: Talent[]
  loading?: boolean
  selectedTalentIds: Set<string>
  onAllTalentSelectionToggled: (checked: boolean) => void
  onTalentSelectionToggled: (checked: boolean, talent: Talent) => void
}

const NO_RESULTS_MESSAGE = 'There are no talents for this search criteria'

const TalentTable = ({
  talents,
  loading = false,
  selectedTalentIds,
  onAllTalentSelectionToggled,
  onTalentSelectionToggled
}: Props) => {
  const renderRow = (talent: Talent) => {
    const selected = selectedTalentIds.has(talent.id)

    return (
      <Table.Row selected={selected} key={talent.id}>
        <Table.Cell css={S.cellFirst} data-testid='select-talent-cell'>
          <Checkbox
            checked={selected}
            onChange={(_, checked) => onTalentSelectionToggled(checked, talent)}
          />
        </Table.Cell>
        <TalentTableRowDataCells talent={talent} />
      </Table.Row>
    )
  }

  const renderTable = () => {
    if (loading) {
      return <TalentTableLoader />
    }

    return (
      <Table data-testid='tss-talent-list' variant='striped' spacing='narrow'>
        <Table.Head>
          <Table.Row>
            <Table.Cell css={S.cellFirst}>
              <Checkbox
                checked={selectedTalentIds.size === talents.length}
                onChange={(_, checked) => onAllTalentSelectionToggled(checked)}
              />
            </Table.Cell>
            <Table.Cell>Rank</Table.Cell>
            <Table.Cell>Name</Table.Cell>
            <Table.Cell>Assignee</Table.Cell>
            <Table.Cell>Vertical</Table.Cell>
            <Table.Cell css={S.noWrap}>Current Step</Table.Cell>
            <Table.Cell css={S.noWrap}>Talent Status</Table.Cell>
            <Table.Cell css={[S.noWrap, S.cellLast]} colSpan={2}>
              TSS Status
            </Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>{talents.map(renderRow)}</Table.Body>
      </Table>
    )
  }

  if (!loading && !talents.length) {
    return <NoSearchResultsMessage message={NO_RESULTS_MESSAGE} />
  }

  return (
    <Container css={S.container}>
      <Container css={loading ? S.disabledContainer : undefined}>
        {renderTable()}
      </Container>
    </Container>
  )
}

export default TalentTable
