import React, { useState, ReactNode } from 'react'
import { Grid, Container, Typography } from '@toptal/picasso'
import Picasso from '@toptal/picasso-provider'

import AmountRangeInput, { AmountRange } from '../AmountRangeInput'

export default {
  title: 'AmountRangeInput',
  component: AmountRangeInput
}

export const Default = () => {
  const [value, setValue] = useState<AmountRange>()

  return (
    <StoryWrapper>
      <AmountRangeInput
        name={NAME}
        value={value}
        onReset={setValue}
        onChange={setValue}
        onBlur={setValue}
      />
      <StorySnippet label='Value' snippet={value} />
    </StoryWrapper>
  )
}

export const WithError = () => {
  const [value, setValue] = useState<AmountRange>()

  return (
    <StoryWrapper>
      <AmountRangeInput
        name={NAME}
        value={value}
        hasError
        onReset={setValue}
        onChange={setValue}
        onBlur={setValue}
      />
      <StorySnippet label='Value' snippet={value} />
    </StoryWrapper>
  )
}

const NAME = 'amount'

const StoryWrapper = ({ children }: { children: ReactNode }) => (
  <Picasso>
    <Container top='small' left='small'>
      <Grid>
        <Grid.Item small={4}>{children}</Grid.Item>
      </Grid>
    </Container>
  </Picasso>
)

const StorySnippet = ({
  label,
  snippet
}: {
  label: string
  snippet: ReactNode
}) =>
  snippet ? (
    <Container top='small'>
      <Typography as='pre'>
        <Typography as='code'>
          {label}: {JSON.stringify(snippet, undefined, 2)}
        </Typography>
      </Typography>
    </Container>
  ) : null
