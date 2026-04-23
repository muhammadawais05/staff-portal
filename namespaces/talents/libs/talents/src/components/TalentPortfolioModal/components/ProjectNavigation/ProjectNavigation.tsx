import React from 'react'
import {
  Container,
  Button,
  ArrowLongRight16,
  ArrowLongLeft16
} from '@toptal/picasso'

import * as S from './styles'

type Props = {
  navigationIndex: number
  totalCount: number
  onNextClick?: () => void
  onPreviousClick?: () => void
}

const ProjectNavigation = ({
  navigationIndex,
  totalCount,
  onPreviousClick,
  onNextClick
}: Props) => {
  const showPrevious = navigationIndex > 0
  const showNext = navigationIndex < totalCount - 1

  if (totalCount === 1) {
    return null
  }

  return (
    <>
      <div css={S.navigationOverlay}>
        <Container flex css={S.navigationContainer} padded='large'>
          {showPrevious && (
            <Container flex justifyContent='flex-start' css={S.previousButton}>
              <Button
                onClick={onPreviousClick}
                icon={<ArrowLongLeft16 />}
                data-testid='navigation-previous'
              >
                Previous project
              </Button>
            </Container>
          )}
          {showNext && (
            <Container flex justifyContent='flex-end' css={S.nextButton}>
              <Button
                onClick={onNextClick}
                iconPosition='right'
                icon={<ArrowLongRight16 />}
                data-testid='navigation-next'
              >
                Next project
              </Button>
            </Container>
          )}
        </Container>
      </div>
    </>
  )
}

export default ProjectNavigation
