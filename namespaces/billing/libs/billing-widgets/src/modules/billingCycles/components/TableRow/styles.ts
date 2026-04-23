import { palette } from '@toptal/picasso/utils'
import { css } from 'styled-components'

const getRemovedStyle = ({ isRemoved }: { isRemoved: boolean }) =>
  isRemoved &&
  `
&& {
  text-decoration: line-through;
  color: ${palette.grey.main}
}
`

const getBackgroundColor = ({ isAltColor }: PlainRow) =>
  isAltColor ? '#f8f9f9' : 'transparent'

const getBorderColor = ({ isAltColor, isExpanded }: PlainRow) =>
  isAltColor || isExpanded ? '#dfe0e0' : 'transparent'

const typography = (isRemoved: boolean) => css`
  ${getRemovedStyle({ isRemoved })}
`

interface PlainRow {
  isAltColor: boolean
  isExpanded: boolean
}

const tablePlainRow = (params: PlainRow) => css`
  &&:nth-of-type(even),
  &&:nth-of-type(odd) {
    background-color: ${getBackgroundColor(params)};
  }

  &&:hover {
    background-color: #f0f1f1;
    color: #000;
  }

  transition: background-color 0.15s ease, color 0.15s ease;
  box-shadow: inset 0 1px 0 0 ${getBorderColor(params)};
  border-bottom: 1px solid ${getBorderColor(params)};
`

const baseCellStyle = ({ isTall }: CellTall) => css`
  ${isTall && 'vertical-align: top'};
  padding: 3px;
`

interface CellTall {
  isTall: boolean
}

interface CellExtraHours {
  isExtraHours: boolean
}

const cellIcon = ({ isTall, isExtraHours }: CellTall & CellExtraHours) => css`
  && {
    ${baseCellStyle({ isTall })};
    width: 3.2rem;
    ${isExtraHours ? 'padding: 0.3rem 0.4rem 0 0' : 'padding: 0 0.25rem 0 0'};
    ${isExtraHours ? 'text-align: right' : 'text-align: left'};
  }
`

const cellStartDate = ({ isTall }: CellTall) => css`
  && {
    ${baseCellStyle({ isTall })};
    width: 5.4rem;
    white-space: nowrap;
  }
`

const cellEndDate = ({ isTall }: CellTall) => css`
  && {
    ${baseCellStyle({ isTall })};
    width: 5.4rem;
    white-space: nowrap;
  }
`

const cellType = ({ isTall }: CellTall) => css`
  && {
    ${baseCellStyle({ isTall })};
    width: 5.8rem;
  }
`

const cellCommitment = ({ isTall }: CellTall) => css`
  && {
    ${baseCellStyle({ isTall })};
    width: 5.7rem;
  }
`

const cellHours = ({ isTall }: CellTall) => css`
  && {
    ${baseCellStyle({ isTall })};
    width: 3.9rem;
  }
`

const cellCompany = ({ isTall }: CellTall) => css`
  && {
    ${baseCellStyle({ isTall })};
    width: 6.5rem;
  }
`

const cellTalent = ({ isTall }: CellTall) => css`
  && {
    ${baseCellStyle({ isTall })};
    width: 6rem;
  }
`

const cellCommissions = ({ isTall }: CellTall) => css`
  && {
    ${baseCellStyle({ isTall })};
    width: 5.5rem;
  }
`

export {
  cellCommissions,
  cellCommitment,
  cellCompany,
  cellEndDate,
  cellHours,
  cellIcon,
  cellStartDate,
  cellTalent,
  cellType,
  tablePlainRow,
  typography
}
