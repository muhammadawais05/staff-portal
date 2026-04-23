import { Table } from '@toptal/picasso'
import React, { ReactNode } from 'react'

import * as S from './styles'

interface Props {
  talent: ReactNode
  status: ReactNode
  actions: ReactNode
}

const HiredTalentTableCells = ({ talent, status, actions }: Props) => {
  return <>
    <Table.Cell css={S.talentColumn}>{talent}</Table.Cell>
    <Table.Cell>{status}</Table.Cell>
    <Table.Cell css={S.actionsColumn}>{actions}</Table.Cell>
  </>
}

export default HiredTalentTableCells
