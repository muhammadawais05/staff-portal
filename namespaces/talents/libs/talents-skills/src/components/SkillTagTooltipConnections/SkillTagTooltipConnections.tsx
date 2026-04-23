import { Container, Link16, List, Typography } from '@toptal/picasso'
import React from 'react'

import { SkillConnection } from '../../types'

interface Props {
  skillConnections: SkillConnection[]
}

const SkillTagTooltipConnections = ({ skillConnections }: Props) => (
  <Container flex direction='column' gap='small'>
    {skillConnections.map(({ title, count, items }) => (
      <Container key={title}>
        <Container flex justifyContent='space-between' alignItems='center'>
          <Typography variant='heading' size='small'>
            {title}
          </Typography>
          <Container flex alignItems='center'>
            <Container as='span' flex alignItems='center' right='xsmall'>
              <Link16 color='dark-grey' />
            </Container>
            <Typography size='xsmall'>{count}</Typography>
          </Container>
        </Container>
        {items?.length && (
          <Container top='xsmall'>
            <List>
              {items.map((description, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <List.Item key={index}>{description}</List.Item>
              ))}
            </List>
          </Container>
        )}
      </Container>
    ))}
  </Container>
)

export default SkillTagTooltipConnections
