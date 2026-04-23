import React, { useState } from 'react'
import { Meta, ComponentStory } from '@storybook/react'
import { Container } from '@toptal/picasso'
import Picasso from '@toptal/picasso-provider'

import NamedPagination from './NamedPagination'
import NamedPaginationDocs from './NamedPagination.mdx'

export default {
  title: 'UI/NamedPagination',
  component: NamedPagination,
  decorators: [Story => <Picasso>{Story()}</Picasso>],
  parameters: {
    docs: {
      page: NamedPaginationDocs
    },
    viewMode: 'docs'
  }
} as Meta

export const MultiplePages: ComponentStory<typeof NamedPagination> = args => {
  const pages = ['Page 1', 'Page 2', 'Page 3']
  const [page, setPage] = useState(0)

  return (
    <Container direction='column' padded='medium'>
      <NamedPagination {...args} pages={pages} onChange={setPage} />
      {page === 0 && <Container>Content of the first page</Container>}
      {page === 1 && <Container>Content of the second page</Container>}
      {page === 2 && <Container>Content of the third page</Container>}
    </Container>
  )
}

export const OnePage: ComponentStory<typeof NamedPagination> = args => {
  const pages = ['Page 1']

  return (
    <Container padded='medium'>
      <NamedPagination {...args} pages={pages} />
    </Container>
  )
}
