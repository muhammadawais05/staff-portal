import React from 'react'
import { Container, Grid, Typography, Image } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'

import * as S from './styles'
import { TalentPublishableFragment } from '../../data/get-talent-resume-publications/get-talent-resume-publications.staff.gql.types'

interface Props {
  publications?: TalentPublishableFragment[]
}

const ResumePublications = ({ publications }: Props) => {
  if (!publications) {
    return null
  }

  return (
    <Container>
      {publications.map(({ imageUrl, url, title }) => (
        <Grid direction='row' wrap='nowrap' key={title}>
          {imageUrl && (
            <Grid.Item>
              <Link href={url} target='_blank'>
                <Image
                  src={imageUrl}
                  alt={title}
                  css={S.publicationImage}
                  data-testid='publication-image'
                />
              </Link>
            </Grid.Item>
          )}
          <Grid.Item>
            <Typography size='large' variant='heading'>
              {title}
            </Typography>
            <Typography size='medium'>
              <Link href={url} target='_blank'>
                {url}
              </Link>
            </Typography>
          </Grid.Item>
        </Grid>
      ))}
    </Container>
  )
}

export default ResumePublications
