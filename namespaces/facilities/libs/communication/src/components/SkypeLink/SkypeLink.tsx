import React, { ComponentProps } from 'react'
import type { Props as TypographyOverflowProps } from '@toptal/picasso/TypographyOverflow/TypographyOverflow'
import { Link } from '@staff-portal/navigation'
import { TypographyOverflowLink } from '@staff-portal/ui'

export type Props = Omit<TypographyOverflowProps, 'children'> &
  Pick<ComponentProps<typeof Link>, 'color'> & {
    skypeId: string
  }

/**
 * Must be used to call by skype links only
 * DO NOT EVER use to call phone numbers.
 *
 * To call via contact entity use `PhoneLink` component (mutation: callContact),
 * to call via TopCall widget to role use `RolePhoneLink` component (mutation: callRole),
 * to call via string numbers without contact entity use `ClientPhoneLink` component (mutation: callClient),
 * to call via raw string number without any corresponding entity use `StartCallLink` component (mutation: startCall)
 */
const SkypeLink = ({ skypeId, color, ...rest }: Props) => {
  const skypeLink = `skype:${skypeId}`

  return (
    <TypographyOverflowLink tooltipContent={skypeId} {...rest}>
      <Link href={skypeLink} color={color} data-testid='skype-id'>
        {skypeId}
      </Link>
    </TypographyOverflowLink>
  )
}

export default SkypeLink
