import { Container } from '@toptal/picasso'
import React from 'react'

import { Social } from '../../../../../../types'
import SocialButton from '../SocialButton/SocialButton'

const SOCIALS: Social[] = ['twitter', 'facebook', 'linkedin']

const SocialButtons = () => {
  return (
    <Container>
      {SOCIALS.map(type => (
        <SocialButton key={type} type={type} />
      ))}
    </Container>
  )
}

export default SocialButtons
