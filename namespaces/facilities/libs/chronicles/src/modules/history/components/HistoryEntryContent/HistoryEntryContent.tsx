import React from 'react'

import { resolveToJSX, Literal } from '../../../template-compiler'

type Props = {
  literals: Literal[]
}

const HistoryEntryContent = ({ literals }: Props) => {
  return <>{resolveToJSX(literals)}</>
}

export default HistoryEntryContent
