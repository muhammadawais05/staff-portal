import { ContactType, Contact } from '@staff-portal/graphql/staff'
import { Link } from '@staff-portal/navigation'
import { Container, Typography } from '@toptal/picasso'
import React, { useMemo } from 'react'
import { PhoneLink } from '@staff-portal/communication'
import { NO_VALUE } from '@staff-portal/config'

export type Props = {
  contact?: {
    id: string
    fullName: string
    contacts?: {
      nodes: {
        id: string
        primary: boolean
        type: ContactType
        value: string
      }[]
    }
  } | null
}

const sortByPrimary: (...args: Partial<Contact>[]) => number = (
  { primary: pA },
  { primary: pB }
) => Number(pB) - Number(pA)

const PrimaryContactTooltipContent = ({ contact }: Props) => {
  const contactPhone = useMemo(
    () =>
      contact?.contacts?.nodes
        .filter(({ type }) => type === ContactType.PHONE)
        .sort(sortByPrimary)[0],
    [contact]
  )

  const contactEmail = useMemo(
    () =>
      contact?.contacts?.nodes
        .filter(({ type }) => type === ContactType.EMAIL)
        .sort(sortByPrimary)[0],
    [contact]
  )

  const contactId = contact?.id || ''
  const contactPhoneId = contactPhone?.id || ''

  return (
    <>
      <Container flex>
        <Typography color='inherit' size='medium'>
          Phone Number:
        </Typography>
        <Container left='xsmall'>
          {contactPhone?.value ? (
            <PhoneLink
              roleId={contactId}
              phoneContactId={contactPhoneId}
              renderPhoneContact={() => (
                <Typography size='medium' color='inherit' as='span'>
                  {contactPhone.value}
                </Typography>
              )}
            />
          ) : (
            NO_VALUE
          )}
        </Container>
      </Container>
      <Container flex>
        <Typography color='inherit' size='medium'>
          Email:
        </Typography>
        <Container left='xsmall'>
          {contactEmail?.value ? (
            <Link href={`mailto:${contactEmail.value}`}>
              <Typography color='inherit' size='medium' as='span'>
                {contactEmail.value}
              </Typography>
            </Link>
          ) : (
            NO_VALUE
          )}
        </Container>
      </Container>
    </>
  )
}

export default PrimaryContactTooltipContent
