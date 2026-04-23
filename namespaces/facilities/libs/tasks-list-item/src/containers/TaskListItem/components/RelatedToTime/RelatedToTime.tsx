import { Container, Info16, Typography } from '@toptal/picasso'
import React from 'react'
import { DEBOUNCE_LIMIT } from '@staff-portal/config'
import {
  DEFAULT_TIME_FORMAT,
  formatDate,
  getDateWithoutTimezone
} from '@staff-portal/date-time-utils'
import { useQuery } from '@staff-portal/data-layer-service'
import {
  AsyncTooltipWrapper,
  AsyncTooltipWrapperDataHookOptions
} from '@staff-portal/ui'

import RelatedToTimeTooltip from '../RelatedToTimeTooltip'
import { GetTaskEngagedSubjectsDocument } from './data'

export interface Props {
  taskId: string
  dateTime: string
  isCompleted: boolean
  hasEngagedSubjects: boolean
}

const RelatedToTime = ({
  taskId,
  dateTime,
  isCompleted,
  hasEngagedSubjects
}: Props) => {
  const useGetTooltipContentDataHook = (
    options: AsyncTooltipWrapperDataHookOptions
  ) =>
    useQuery(GetTaskEngagedSubjectsDocument, {
      variables: {
        taskId
      },
      ...options
    })

  return (
    <Container flex alignItems='center'>
      <AsyncTooltipWrapper
        useFetchData={useGetTooltipContentDataHook}
        loadedTooltipDelay={DEBOUNCE_LIMIT}
        enableTooltip={hasEngagedSubjects}
        tooltipContent={data =>
          !!data?.node?.engagedSubjects.totalCount && (
            <RelatedToTimeTooltip
              engagedSubjects={data.node.engagedSubjects.nodes}
            />
          )
        }
      >
        <Container flex alignItems='center'>
          <Typography inline noWrap lineThrough={isCompleted}>
            {formatDate(getDateWithoutTimezone(dateTime), {
              dateFormat: DEFAULT_TIME_FORMAT
            })}
          </Typography>

          {hasEngagedSubjects && (
            <Container
              flex
              alignItems='center'
              left='xsmall'
              data-testid='RelatedToTime-info'
            >
              <Info16 />
            </Container>
          )}
        </Container>
      </AsyncTooltipWrapper>
    </Container>
  )
}

export default RelatedToTime
