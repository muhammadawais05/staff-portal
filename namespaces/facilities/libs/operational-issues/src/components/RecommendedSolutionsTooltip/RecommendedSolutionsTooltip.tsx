import { Container, List, Typography, Tooltip } from '@toptal/picasso'
import React, { ReactNode } from 'react'
import { Maybe } from '@staff-portal/graphql/staff'

interface Props {
  recommendedSolutions?: Maybe<string>
  disabled: boolean
  children?: ReactNode
}

const RecommendedSolutionsTooltip = ({
  recommendedSolutions,
  disabled,
  children
}: Props) => {
  const tooltipContent = (
    <Container>
      <Typography weight='semibold' size='medium' color='light-grey'>
        Recommended Solutions
      </Typography>

      <Container top='xsmall'>
        <List variant='unordered'>
          {recommendedSolutions
            ?.replace(/\n/gi, '')
            .split('* ')
            .filter(solution => !!solution)
            .map(solution => (
              <List.Item key={solution}>
                <Typography size='medium' color='light-grey' as='span'>
                  {solution}
                </Typography>
              </List.Item>
            ))}
        </List>
      </Container>
    </Container>
  )

  return (
    <Tooltip
      interactive
      placement='left'
      disableListeners={disabled || !recommendedSolutions}
      delay='long'
      content={tooltipContent}
    >
      {children}
    </Tooltip>
  )
}

export default RecommendedSolutionsTooltip
