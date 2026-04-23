import { Button, Facebook24, Linkedin24, Twitter24 } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import React, { useState, ReactNode } from 'react'
import { PLATFORM_API_URL } from '@staff-portal/config'
import { windowOpen } from '@staff-portal/navigation'

import { Social } from '../../../../../../types'
import { getShareUrl } from '../../services/social-share/social-share'

interface Props {
  type: Social
}

const ICON_MAPPING: Record<Social, ReactNode> = {
  facebook: <Facebook24 color='dark-grey' />,
  twitter: <Twitter24 color='dark-grey' />,
  linkedin: <Linkedin24 color='dark-grey' />
}

const SocialButton = ({ type }: Props) => {
  const { showError } = useNotifications()
  const [loading, setLoading] = useState(false)

  const openShareWindow = async () => {
    setLoading(true)

    try {
      const url = await getShareUrl(type, PLATFORM_API_URL)

      windowOpen(url, undefined, 'toolbar=0,status=0,width=625,height=435')
    } catch (error) {
      showError('Error sharing URL, please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button.Circular loading={loading} variant='flat' onClick={openShareWindow}>
      {ICON_MAPPING[type]}
    </Button.Circular>
  )
}

export default SocialButton
