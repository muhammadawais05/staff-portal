import React from 'react'
import { Container, Typography, TypographyOverflow } from '@toptal/picasso'
import { DEBOUNCE_LIMIT } from '@staff-portal/config'
import { decodeEntityId, encodeGid } from '@staff-portal/data-layer-service'
import { AsyncTooltipWrapper } from '@staff-portal/ui'

import { getDisputeReasonDataHook } from '../../data'
import { DisputeReason } from '../DisputeReason'
import * as S from './styles'

interface Props {
  taskId: string
  description: string
  lineThrough?: boolean
  disputed: boolean
  status: string
}

const DescriptionWithTooltip = ({
  taskId,
  description,
  lineThrough,
  disputed,
  status
}: Props) => {
  const { id, type } = decodeEntityId(taskId)
  const taskGID = encodeGid(type, id)
  const useGetTooltipContentDataHook = getDisputeReasonDataHook({
    feeds: [[taskGID]],
    limit: 1,
    actions: ['disputed']
  })
  const isUseTooltip = disputed

  return (
    <AsyncTooltipWrapper
      useFetchData={useGetTooltipContentDataHook}
      maxWidth='default'
      loadedTooltipDelay={DEBOUNCE_LIMIT}
      tooltipContent={(data, loading) =>
        !loading &&
        !!data && (
          <Container>
            <Typography color='inherit'>{description}</Typography>
            <Container top='small'>
              <DisputeReason status={status} disputeReason={data[0]?.comment} />
            </Container>
          </Container>
        )
      }
      enableTooltip={isUseTooltip}
    >
      <Container css={S.descriptionWrapper}>
        {/**
         * We can't use here  just `TypographyOverflow`
         * with `disableTooltip` instead of ternary operator,
         * because in this case we will have problems with
         * tooltips when we scroll fast enough with hover over this element.
         */}
        {isUseTooltip ? (
          <Typography noWrap lineThrough={lineThrough}>
            {description}
          </Typography>
        ) : (
          <TypographyOverflow tooltipDelay='long' lineThrough={lineThrough}>
            {description}
          </TypographyOverflow>
        )}
      </Container>
    </AsyncTooltipWrapper>
  )
}

export default DescriptionWithTooltip
