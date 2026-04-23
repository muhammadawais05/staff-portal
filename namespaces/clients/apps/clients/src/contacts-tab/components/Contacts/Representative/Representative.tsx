import React from 'react'
import { Avatar, Container, TypographyOverflow } from '@toptal/picasso'
import { WebResourceLink } from '@staff-portal/ui'
import {
  RepresentativeFragment,
  ActionsDropdown,
  EditButton,
  MainSubsidiaryFlags,
  useNavigateToUpdateRepresentativePage
} from '@staff-portal/client-representatives'

import RepresentativeContent from './containers/RepresentativeContent'
import * as S from './styles'

type Props = {
  representative: RepresentativeFragment
  isSubsidiary?: boolean
}

const Representative = ({
  representative,
  representative: { webResource: repLink },
  isSubsidiary = false
}: Props) => {
  const { fullName, photo, main, operations } = representative

  const navigateToUpdateRepresentativePage =
    useNavigateToUpdateRepresentativePage(representative)

  return (
    <Container>
      <Container flex justifyContent='space-between'>
        <Container right='small'>
          <Avatar size='small' name={fullName} src={photo?.small || ''} />
        </Container>
        <Container css={S.title} right={1}>
          <TypographyOverflow weight='semibold' tooltipContent={repLink.text}>
            <WebResourceLink link={repLink} />
          </TypographyOverflow>
          <MainSubsidiaryFlags main={main} isSubsidiary={isSubsidiary} />
        </Container>
        <Container flex css={S.actions}>
          <EditButton
            representativeId={representative.id}
            operation={operations?.updateCompanyRepresentativeProfile}
            onClick={navigateToUpdateRepresentativePage}
          />
          <ActionsDropdown representative={representative} />
        </Container>
      </Container>
      <Container top={1.5}>
        <RepresentativeContent representative={representative} />
      </Container>
    </Container>
  )
}

export default Representative
