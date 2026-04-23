import React, { Fragment } from 'react'
import {
  Grid,
  Typography,
  Tooltip,
  QuestionMark16,
  Container
} from '@toptal/picasso'
import { NO_VALUE } from '@staff-portal/config'
import { LinkWrapper } from '@staff-portal/ui'
import {
  parseAndFormatDate,
  formatDuration
} from '@staff-portal/date-time-utils'

import { TalentProfileWorkingPeriodFragment } from '../../data'

interface Props {
  workingPeriods?: TalentProfileWorkingPeriodFragment[]
}

const IconWithTooltip = ({ tooltipContent }: { tooltipContent: string }) => (
  <Tooltip interactive placement='top' maxWidth='none' content={tooltipContent}>
    <Container as='span' flex left='xsmall' data-testid='tooltip-icon'>
      <QuestionMark16 color='dark-grey' />
    </Container>
  </Tooltip>
)

const TalentWorkingPeriods = ({ workingPeriods }: Props) => {
  if (!workingPeriods?.length) {
    return null
  }

  return (
    <>
      {workingPeriods.map(
        ({ workingHours, activeEngagements, start, stop }, index) => (
          <Grid
            key={`${workingHours}${start}${stop}`}
            data-testid='working-period'
            alignItems='center'
          >
            <Grid.Item small={3}>
              <Typography size='medium' weight='semibold'>
                <Container flex as='span' alignItems='center' inline>
                  {formatDuration({ hours: workingHours }, { zero: true })}{' '}
                  {index === 0 && (
                    <IconWithTooltip tooltipContent='Total hours billed across all active engagements for given week.' />
                  )}
                </Container>
              </Typography>
            </Grid.Item>
            <Grid.Item small={3} data-testid='active-engagements'>
              <Typography size='medium' weight='semibold'>
                <Container flex as='span' alignItems='center' inline>
                  {activeEngagements.edges.length
                    ? activeEngagements.edges.map(
                        (
                          {
                            workingHours: activeEngagementsWorkingHours,
                            node: { job }
                          },
                          _index
                        ) => (
                          <Fragment key={activeEngagementsWorkingHours}>
                            {_index !== 0 && ' / '}
                            <LinkWrapper
                              wrapWhen={Boolean(job?.webResource.url)}
                              href={job?.webResource.url as string}
                            >
                              <Tooltip interactive content={job?.title || ''}>
                                <span>{activeEngagementsWorkingHours}</span>
                              </Tooltip>
                            </LinkWrapper>
                          </Fragment>
                        )
                      )
                    : NO_VALUE}{' '}
                  {index === 0 && (
                    <IconWithTooltip tooltipContent='Number of hours billed from each active job for given week.' />
                  )}
                </Container>
              </Typography>
            </Grid.Item>
            <Grid.Item small={6}>
              <Typography size='medium' weight='semibold'>
                {index === 0
                  ? 'Last week'
                  : `${parseAndFormatDate(start)} — ${parseAndFormatDate(
                      stop
                    )}`}
              </Typography>
            </Grid.Item>
          </Grid>
        )
      )}
    </>
  )
}

export default TalentWorkingPeriods
