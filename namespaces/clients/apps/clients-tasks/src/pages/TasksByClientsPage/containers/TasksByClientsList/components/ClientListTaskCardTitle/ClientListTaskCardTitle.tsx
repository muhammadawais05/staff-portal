import React from 'react'
import { LinkOverflow } from '@staff-portal/client-representatives'

import { TasksByClientClientFragment } from '../../data/get-clients-names-and-total-count/get-clients-names-and-total-count.staff.gql.types'

type Props = {
  client: TasksByClientClientFragment
}

export const ClientListTaskCardTitle = ({ client }: Props) => {
  const { fullName, mainSkillsNeeded, contact, webResource } = client

  const url = webResource?.url ?? undefined
  const skillNames = mainSkillsNeeded?.nodes?.map(skill => skill.name)
  const titleSkills = skillNames?.length ? ` (${skillNames?.join(', ')})` : ''
  const titleContact = contact ? ` [${contact.fullName}]` : ''
  const title = `${fullName}${titleContact}${titleSkills}`

  return <LinkOverflow link={{ url, text: title }} />
}
