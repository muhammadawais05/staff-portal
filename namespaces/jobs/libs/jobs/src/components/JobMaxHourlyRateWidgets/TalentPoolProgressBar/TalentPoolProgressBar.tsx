import React from 'react'
import { Container, ProgressBar, Typography } from '@toptal/picasso'

import * as S from './styles'

interface Props {
  isVisible?: boolean
  applicableTalentPool: number
}

const TalentPoolProgressBar = ({ isVisible, applicableTalentPool }: Props) => {
  return (
    <Container
      alignItems='center'
      data-testid='TalentPoolProgressBar'
      flex
      css={[
        S.talentPoolProgressBar,
        isVisible && S.talentPoolProgressBarVisible
      ]}
    >
      <ProgressBar value={applicableTalentPool} showPercentage />
      <Typography size='xsmall' color='dark-grey' css={S.talentPoolLabel}>
        of talent pool
      </Typography>
    </Container>
  )
}

TalentPoolProgressBar.defaultProps = {
  isVisible: false
}

export default TalentPoolProgressBar
