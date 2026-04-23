import { css } from 'styled-components'

interface CellTall {
  isTall: boolean
}

const baseCellStyle = ({ isTall }: CellTall) => css`
  ${isTall && 'vertical-align: top;'}
`

const cellIcon = ({ isTall }: CellTall) => css`
  && {
    ${baseCellStyle({ isTall })}

    padding: 0;
    width: 3.2rem;
  }
`

const cellDueDate = ({ isTall }: CellTall) => css`
  && {
    ${baseCellStyle({ isTall })}

    width: 15%;
    white-space: nowrap;
  }
`

const cellCompany = ({ isTall }: CellTall) => css`
  && {
    ${baseCellStyle({ isTall })}

    width: 20%;
  }
`

const cellCommissions = ({ isTall }: CellTall) => css`
  && {
    ${baseCellStyle({ isTall })}

    width: 30%;
  }
`

const cellDescription = ({ isTall }: CellTall) => css`
  && {
    ${baseCellStyle({ isTall })}

    width: 35%;
  }
`

export { cellCommissions, cellCompany, cellDescription, cellDueDate, cellIcon }
