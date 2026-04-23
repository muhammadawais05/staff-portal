import React, { ComponentProps } from 'react'
import { Button } from '@toptal/picasso'
import { navigateExternallyTo } from '@staff-portal/navigation'

type Props = ComponentProps<'button'> & {
  skypeId: string
}

const SkypeButton = ({ skypeId }: Props) => {
  return (
    <Button
      data-testid='skype-button'
      titleCase={false}
      onClick={() => navigateExternallyTo(`skype:${skypeId}`)}
    >
      {skypeId}
    </Button>
  )
}

export default SkypeButton
