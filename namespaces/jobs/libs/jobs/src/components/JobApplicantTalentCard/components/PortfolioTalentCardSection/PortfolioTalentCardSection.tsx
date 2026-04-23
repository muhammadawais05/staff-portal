import React from 'react'
import {
  Section,
  Container,
  Image,
  Grid,
  Typography,
  AddDocument24
} from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'

import { PortfolioItemsTalentPitchFragment } from '../../data/get-job-application-talent-card'
import * as S from './styles'

type Props = {
  portfolioItems?:
    | PortfolioItemsTalentPitchFragment['designPortfolioItems']
    | null
}

const PortfolioTalentCardSection = ({ portfolioItems }: Props) => {
  const items = portfolioItems?.nodes

  if (!items?.length) {
    return null
  }

  return (
    <Section
      data-testid='portfolio-talent-card-section'
      title='Portfolio'
      titleSize='small'
    >
      <Grid wrap='wrap'>
        {items.map(portfolio => (
          <Grid.Item css={S.itemWrapper} small={4} key={portfolio.directUrl}>
            <Link href={portfolio.directUrl}>
              <Container
                bordered
                bottom='xsmall'
                padded='xsmall'
                css={S.imageWrapper}
              >
                {portfolio?.coverThumbImageUrlWithFallback ? (
                  <Image
                    src={portfolio?.coverThumbImageUrlWithFallback}
                    alt={portfolio.title}
                    title={portfolio.title}
                    css={S.image}
                    data-testid='portfolio-cover-image'
                  />
                ) : (
                  <Container
                    flex
                    css={S.fallbackImage}
                    alignItems='center'
                    justifyContent='center'
                  >
                    <AddDocument24 color='black' />
                  </Container>
                )}
                <Container
                  css={[S.itemOverlay, S.itemOverlayDesigner]}
                  alignItems='center'
                  justifyContent='center'
                  flex
                >
                  <Typography
                    variant='heading'
                    size='medium'
                    invert
                    css={[S.itemTitle]}
                    id='portfolio-title'
                    data-testid='portfolio-title'
                  >
                    {portfolio.title}
                  </Typography>
                </Container>
              </Container>
            </Link>
          </Grid.Item>
        ))}
      </Grid>
    </Section>
  )
}

export default PortfolioTalentCardSection
