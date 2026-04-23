import React, { ReactNode } from 'react'
import {
  Container,
  Typography,
  Tooltip,
  Info16,
  TypographyOverflow
} from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import {
  DEFAULT_FULL_DATE_FORMAT,
  getDateDistanceFromNow
} from '@staff-portal/date-time-utils'
import { useUserDateFormatter } from '@staff-portal/current-user'

import { TalentPortfolioFileFragment } from '../../data/talent-portfolio-fragment'
import * as S from './styles'

type Props = {
  file: TalentPortfolioFileFragment
  children?: ReactNode
}

const InfoIconWithTooltip = ({
  createdAt
}: {
  createdAt: string | null | undefined
}) => {
  const formatDate = useUserDateFormatter()

  if (!createdAt) {
    return null
  }

  const tooltipDate = formatDate(createdAt, DEFAULT_FULL_DATE_FORMAT)
  const tooltipSemanticDate = getDateDistanceFromNow(createdAt).toLowerCase()

  const tooltipContent = (
    <>
      <Typography size='medium'>{`Added on ${tooltipDate}`}</Typography>
      <Typography size='medium'>{`(${tooltipSemanticDate})`}</Typography>
    </>
  )

  return (
    <Tooltip content={tooltipContent}>
      <Container as='span' left='xsmall'>
        <Info16 />
      </Container>
    </Tooltip>
  )
}

const TalentPortfolioDescription = ({ file, children }: Props) => {
  const formatDate = useUserDateFormatter()
  const { createdAt, specializationApplication, webResource } = file

  const specializationTitle = specializationApplication?.specialization?.title

  const specializationName = specializationTitle ? (
    <Typography weight='semibold' size='medium' noWrap>
      {specializationTitle}
    </Typography>
  ) : null

  const descriptionDate = formatDate(createdAt)
  const fileName = webResource.text
  const fileLink = webResource.url || ''

  const description = (
    <Container flex alignItems='center'>
      <Link
        target='_blank'
        href={fileLink}
        data-testid='portfolio-url'
        css={S.childrenContainer}
      >
        <TypographyOverflow
          as='span'
          weight='semibold'
          color='inherit'
          size='medium'
        >
          {`${descriptionDate} - ${fileName}`}
        </TypographyOverflow>
      </Link>
      <InfoIconWithTooltip createdAt={createdAt} />
    </Container>
  )

  return (
    <Container flex>
      <Container right='xsmall'>{specializationName}</Container>
      <Container flex direction='column' css={S.childrenContainer}>
        {description}
        {children}
      </Container>
    </Container>
  )
}

export default TalentPortfolioDescription
