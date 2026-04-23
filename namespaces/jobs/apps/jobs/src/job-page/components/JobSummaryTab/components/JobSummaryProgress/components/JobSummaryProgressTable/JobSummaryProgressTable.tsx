import React from 'react'
import { TypographyOverflow, Container } from '@toptal/picasso'
import { JobCreatedThrough } from '@staff-portal/graphql/staff'
import { DetailedList as DL, LinkWrapper } from '@staff-portal/ui'
import { NO_VALUE } from '@staff-portal/config'

import { CREATED_THROUGH_MAPPING } from '../../utils'
import { LABEL_COLUMN_WIDTH } from '../../../../../../config'

interface Props {
  createdThrough?: JobCreatedThrough | null
  author?: { webResource: { url?: string | null; text: string } } | null
}

const JobSummaryProgressTable = ({ createdThrough, author }: Props) => (
  <Container top='small'>
    <DL defaultValue={NO_VALUE} labelColumnWidth={LABEL_COLUMN_WIDTH}>
      <DL.Row>
        <DL.Item
          label='Created through'
          data-testid='JobSummaryProgress-created-through'
        >
          {createdThrough && (
            <Container
              as='span'
              data-testid='JobSummaryProgress-created-through'
            >
              {CREATED_THROUGH_MAPPING[createdThrough]}
            </Container>
          )}
        </DL.Item>
      </DL.Row>
      <DL.Row>
        <DL.Item label='Created by'>
          {author && (
            <LinkWrapper
              wrapWhen={Boolean(author?.webResource.url)}
              href={author?.webResource.url as string}
              data-testid='JobSummaryProgress-created-by-link'
            >
              <TypographyOverflow
                as='span'
                size='inherit'
                weight='inherit'
                color='inherit'
              >
                {author?.webResource.text}
              </TypographyOverflow>
            </LinkWrapper>
          )}
        </DL.Item>
      </DL.Row>
    </DL>
  </Container>
)

export default JobSummaryProgressTable
