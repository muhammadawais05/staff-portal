import React, { FunctionComponent } from 'react'
import { Tag, Table, TypographyOverflow } from '@toptal/picasso'
import { titleize } from '@staff-portal/string'
import { TALENT_STATUS_MAPPING } from '@staff-portal/talents'
import { Talent } from '@staff-portal/talents-screening-specialists'

import TalentTableRowActions from '../TalentTableRowActions'
import SpecialistAssignmentStatus from '../SpecialistAssignmentStatus'
import AssigneeCellContent from '../AssigneeCellContent'
import NameCellContent from '../NameCellContent'
import VerticalCellContent from '../VerticalCellContent'
import * as S from './styles'

export interface Props {
  talent: Talent
  selected: boolean
  index: number
  onTalentSelectionToggled: (checked: boolean, talent: Talent) => void
}

interface TalentProps {
  talent: Talent
}

const talentStatus = (cumulativeStatus: string) =>
  TALENT_STATUS_MAPPING[cumulativeStatus].text

const TalentDataCells = ({ talent }: TalentProps) => {
  const {
    cumulativeStatus,
    screeningRank,
    currentSpecialistAssignment,
    detailedStatus
  } = talent

  return (
    <>
      {/* Rank column */}
      <Table.Cell data-testid='talent-rank-cell'>
        {screeningRank && <Tag variant='light-grey'>{screeningRank}</Tag>}
      </Table.Cell>
      {/* Name column */}
      <Table.Cell data-testid='talent-name-cell'>
        <NameCellContent talent={talent} />
      </Table.Cell>
      {/* Assignee column */}
      <Table.Cell data-testid='talent-assignee-cell'>
        <AssigneeCellContent
          assignee={currentSpecialistAssignment?.assignee}
          talent={talent}
        />
      </Table.Cell>
      {/* Vertical column */}
      <Table.Cell data-testid='talent-vertical-cell'>
        <VerticalCellContent talent={talent} />
      </Table.Cell>
      {/* Current Step */}
      <Table.Cell>
        <TypographyOverflow lines={2}>
          {detailedStatus && titleize(detailedStatus)}
        </TypographyOverflow>
      </Table.Cell>
      {/* Talent Status */}
      <Table.Cell data-testid='talent-status-cell'>
        <TypographyOverflow lines={2}>
          {talentStatus(cumulativeStatus)}
        </TypographyOverflow>
      </Table.Cell>
      {/* TSS status */}
      <Table.Cell align='right' data-testid='talent-tss-status-cell'>
        <SpecialistAssignmentStatus
          specialistAssignment={currentSpecialistAssignment}
        />
      </Table.Cell>
      <Table.Cell data-testid='talent-operations-cell' css={S.cellLast}>
        <TalentTableRowActions talent={talent} />
      </Table.Cell>
    </>
  )
}

const TalentTableRowDataCells: FunctionComponent<TalentProps> =
  React.memo(TalentDataCells)

export default TalentTableRowDataCells
