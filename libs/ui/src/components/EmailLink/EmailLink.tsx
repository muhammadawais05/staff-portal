import React from 'react'
import { Link } from '@staff-portal/navigation'

type Props = {
  email: string
}

const EmailLink = ({ email }: Props) => (
  <Link href={`mailto:${email}`}>{email}</Link>
)

export default EmailLink
