import React, { ReactNode, ComponentProps } from 'react'
import { Section, Table } from '@toptal/picasso'

import * as S from './styles'
import { HistoryWidgetVariant } from '../../types'
import Timeline from '../Timeline'

type Props = {
  title: string
  children?: ReactNode
  variant?: HistoryWidgetVariant
}

const HistoryGroup = ({ children, title, variant }: Props) => {
  const props: ComponentProps<typeof Section> = {
    title,
    titleSize: 'small',
    'data-testid': 'history-group'
  }

  if (variant === 'table') {
    return (
      <Section variant='withHeaderBar' css={S.historyGroupTable} {...props}>
        <Table>
          <Table.Body css={S.tableBody}>{children}</Table.Body>
        </Table>
      </Section>
    )
  }

  return (
    <Section css={S.historyGroupTimeline} {...props}>
      <Timeline>{children}</Timeline>
    </Section>
  )
}

export default HistoryGroup
