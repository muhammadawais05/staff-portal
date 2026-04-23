import React from 'react'
import { ArrowLongRight16, Container, Link, Typography } from '@toptal/picasso'
import { Maybe, TopscreenStepType } from '@staff-portal/graphql/staff'
import { titleize } from '@staff-portal/string'

import * as S from './styles'

const NO_PROGRAMMING_LANGUAGE = 'UNDEFINED'

type Props = {
  nodes: TopscreenStepType[]
  jobUrl: string
  programmingLanguage?: Maybe<string>
}

const TopscreenPositionLabelTooltipContent = ({
  nodes,
  jobUrl,
  programmingLanguage
}: Props) => {
  const showProgrammingLanguage =
    !!programmingLanguage && programmingLanguage !== NO_PROGRAMMING_LANGUAGE

  return (
    <Container flex direction='column'>
      <Container as='span'>
        <Typography as='span' weight='semibold'>
          Steps:{' '}
        </Typography>
        {nodes.map((node, index) => {
          const currentNode = (
            <Typography
              as='span'
              data-testid={`topscreen-position-label-tooltip-text-${index}`}
            >
              {titleize(node)}
            </Typography>
          )

          if (index === 0) {
            return <React.Fragment key={node}>{currentNode}</React.Fragment>
          }

          return (
            <React.Fragment key={node}>
              {' '}
              <ArrowLongRight16
                data-testid={`topscreen-position-label-tooltip-icon-${index}`}
              />{' '}
              {currentNode}
            </React.Fragment>
          )
        })}
      </Container>
      <Container forwardedAs='span' direction='row' css={S.truncatedTypography}>
        <Typography as='span' weight='semibold'>
          Job URL:{' '}
        </Typography>
        <Link href={jobUrl} target='_blank' noUnderline>
          {jobUrl}
        </Link>
      </Container>
      {showProgrammingLanguage && (
        <Container as='span'>
          <Typography as='span' weight='semibold'>
            Programming Language:{' '}
          </Typography>
          <Typography as='span'>{programmingLanguage}</Typography>
        </Container>
      )}
    </Container>
  )
}

export default TopscreenPositionLabelTooltipContent
