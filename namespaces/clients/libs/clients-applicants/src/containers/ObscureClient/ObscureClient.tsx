import { Company24, Container, Section } from '@toptal/picasso'
import React from 'react'
import { ClientFragment } from '@staff-portal/clients'

import ObscureClientTitle from './components/ObscureClientTitle/ObscureClientTitle'
import ObscureClientActions from '../../containers/ObscureClientActions/ObscureClientActions'
import ObscureClientContent from './components/ObscureClientContent/ObscureClientContent'
import ObscureClientBadges from './components/ObscureClientBadges/ObscureClientBadges'

export interface Props {
  company: ClientFragment
}

const ObscureClient = ({ company }: Props) => {
  return (
    <Container top='medium' bottom='small'>
      <Section
        variant='withHeaderBar'
        title={<ObscureClientTitle company={company} />}
        actions={<ObscureClientActions company={company} />}
        data-testid='company-item'
      >
        <Container flex alignItems='center' bottom='small'>
          <Container right='small'>
            <Company24 color='blue' />
          </Container>
          <ObscureClientBadges company={company} />
        </Container>

        <ObscureClientContent company={company} />
      </Section>
    </Container>
  )
}

export default ObscureClient
