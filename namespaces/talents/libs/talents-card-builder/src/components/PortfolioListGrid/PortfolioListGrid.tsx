import React, { ReactNode } from 'react'

import * as S from './styles'

const PortfolioListGrid = ({ children }: { children: ReactNode }) => {
  return <div css={S.grid}>{children}</div>
}

export default PortfolioListGrid
