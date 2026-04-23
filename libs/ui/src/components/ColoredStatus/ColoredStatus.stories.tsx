import React from 'react'
import { ColorType, Container, Info24, TypographyProps } from '@toptal/picasso'
import { titleize } from '@staff-portal/string'
import Picasso from '@toptal/picasso-provider'
import { Meta, ComponentStory } from '@storybook/react'

import { ColoredStatus } from './ColoredStatus'
import ColoredStatusDocs from './ColoredStatus.mdx'

export default {
  title: 'UI/ColoredStatus',
  component: ColoredStatus,
  decorators: [Story => <Picasso>{Story()}</Picasso>],
  parameters: {
    docs: {
      page: ColoredStatusDocs
    },
    viewMode: 'docs'
  }
} as Meta

export const Default: ComponentStory<typeof ColoredStatus> = args => (
  <ColoredStatus {...args} status='Some Status Text' />
)

export const Color: ComponentStory<typeof ColoredStatus> = args => {
  const colors = [
    'green',
    'red',
    'yellow',
    'light-grey',
    'grey',
    'dark-grey',
    'black',
    'light-blue',
    'inherit'
  ]

  return (
    <>
      {colors.map(color => (
        <Container key={color}>
          <ColoredStatus
            {...args}
            color={color as ColorType}
            status={titleize(color)}
          />
        </Container>
      ))}
    </>
  )
}

export const Weight: ComponentStory<typeof ColoredStatus> = args => {
  const weights = ['regular', 'semibold', 'inherit']

  return (
    <>
      {weights.map(weight => (
        <Container key={weight}>
          <ColoredStatus
            {...args}
            weight={weight as TypographyProps['weight']}
            status={titleize(weight)}
          />
        </Container>
      ))}
    </>
  )
}

export const Size: ComponentStory<typeof ColoredStatus> = args => {
  const sizes = [
    'inherit',
    'xxsmall',
    'xsmall',
    'small',
    'medium',
    'large',
    'xlarge'
  ]

  return (
    <>
      {sizes.map(size => (
        <Container key={size}>
          <ColoredStatus
            {...args}
            size={size as TypographyProps['size']}
            status={titleize(size)}
          />
        </Container>
      ))}
    </>
  )
}

export const TooltipContent: ComponentStory<typeof ColoredStatus> = args => (
  <Container top='xlarge' bottom='xlarge'>
    <ColoredStatus
      {...args}
      status='Status Message with tooltip content'
      tooltipContent='Tooltip content'
    />
  </Container>
)

export const TooltipIcon: ComponentStory<typeof ColoredStatus> = args => (
  <Container top='xlarge' bottom='xlarge'>
    <ColoredStatus
      {...args}
      status='Status Message with custom tooltip icon'
      tooltipContent='Tooltip content'
      tooltipIcon={<Info24 />}
    />
  </Container>
)
