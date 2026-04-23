import React from 'react'
import { Container, TypographyOverflow } from '@toptal/picasso'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { LinkWrapper } from '@staff-portal/ui'
import { TaskStatus } from '@staff-portal/tasks'

import { isTaskCompleted } from '../is-task-completed'
import { TaskColRenderProps } from '../../types'
import * as S from './styles'

export const renderRelatedToCol = ({
  task: { relatedTo, status }
}: TaskColRenderProps) => {
  if (!relatedTo) {
    return
  }

  const { id, type } = decodeEntityId(relatedTo.id)
  const message =
    type === 'PurchaseOrder'
      ? `Purchase Order #${id}`
      : relatedTo.webResource.text

  return (
    <LinkWrapper
      wrapWhen={Boolean(relatedTo.webResource.url)}
      href={relatedTo.webResource.url as string}
    >
      <Container
        flex
        alignItems='center'
        css={S.relatedToWrapper}
        data-testid='related-to'
      >
        <TypographyOverflow
          noWrap
          color='inherit'
          tooltipDelay='long'
          lineThrough={isTaskCompleted(status as TaskStatus)}
          className='focused-link'
        >
          {message}
        </TypographyOverflow>
      </Container>
    </LinkWrapper>
  )
}
