import { Typography, Container } from '@toptal/picasso'
import React from 'react'

import { ProfileCertification } from '../../types'
import ApplicationCardListItem from '../ApplicationCardListItem'
import CertificationDate from '../CertificationDate'
import * as S from './styles'

export interface CertificationItemProps {
  certification: ProfileCertification
  selected: boolean
  onClick: (e: React.MouseEvent) => void
}

const CertificationItem = ({
  certification,
  selected,
  onClick,
  ...rest
}: CertificationItemProps) => (
  <ApplicationCardListItem highlighted={selected} onClick={onClick} {...rest}>
    <Container css={S.content}>
      <Typography size='xsmall' color='black' weight='semibold'>
        {certification.certificate}
      </Typography>
      <Typography size='xsmall'>{certification.institution}</Typography>
    </Container>
    <Container css={S.aside}>
      <Typography size='xsmall'>
        <CertificationDate {...certification} />
      </Typography>
    </Container>
  </ApplicationCardListItem>
)

export default CertificationItem
