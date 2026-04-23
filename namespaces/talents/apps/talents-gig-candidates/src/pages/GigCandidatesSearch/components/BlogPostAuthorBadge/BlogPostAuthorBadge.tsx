import { Container, Link, Tooltip, Typography } from '@toptal/picasso'
import React from 'react'

import BlogPostAuthorIcon from '../BlogPostAuthorIcon/BlogPostAuthorIcon'

export interface Props {
  fullName: string
  url: string
}

const BlogPostAuthorBadge = ({ fullName, url }: Props) => {
  const [firstName] = fullName.split(' ')

  return (
    <Tooltip
      interactive
      content={
        <Container>
          <Container bottom='small'>
            <Typography variant='heading' size='medium'>
              Toptal Product Blog Author
            </Typography>
          </Container>
          <Typography>
            {firstName}’s work has been published on the Toptal Product Blog.
            Check out{' '}
            <Link href={url} target='_blank' rel='noopener noreferrer'>
              {firstName}’s latest post.
            </Link>
          </Typography>
        </Container>
      }
    >
      <span data-testid='author-icon'>
        <BlogPostAuthorIcon />
      </span>
    </Tooltip>
  )
}

export default BlogPostAuthorBadge
