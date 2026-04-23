import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import {
  Client,
  CompanyRepresentative,
  Skill,
  SkillConnection
} from '@staff-portal/graphql/staff'
import { LinkOverflow } from '@staff-portal/client-representatives'

import { ClientListTaskCardTitle } from './ClientListTaskCardTitle'

jest.mock('@staff-portal/client-representatives', () => ({
  LinkOverflow: jest.fn()
}))

const LinkOverflowMock = LinkOverflow as jest.Mock

const skill1Mock = {
  name: 'Skill 1 name'
} as Skill

const skill2Mock = {
  name: 'Skill 2 name'
} as Skill

const contactMock = {
  fullName: 'Contact Name'
} as CompanyRepresentative

const mainSkillsNeededMock = (skills?: Skill[]) =>
  ({
    nodes: skills ? [skill1Mock].concat(skills) : [skill1Mock]
  } as SkillConnection)

const clientMock = (data?: Partial<Client>) =>
  ({
    fullName: 'Client Name',
    mainSkillsNeeded: null,
    contact: null,
    webResource: {
      url: Symbol()
    },
    ...data
  } as Client)

describe('ClientListTaskCardTitle', () => {
  it('default render', () => {
    LinkOverflowMock.mockReturnValue(null)

    const client = clientMock()

    render(<ClientListTaskCardTitle client={client} />)

    expect(LinkOverflowMock).toHaveBeenCalledWith(
      {
        link: {
          url: client.webResource.url,
          text: 'Client Name'
        }
      },
      {}
    )
  })

  it('renders skill names when skills are supplied', () => {
    LinkOverflowMock.mockReturnValue(null)

    const client = clientMock({ mainSkillsNeeded: mainSkillsNeededMock() })

    render(<ClientListTaskCardTitle client={client} />)

    expect(LinkOverflowMock).toHaveBeenCalledWith(
      {
        link: {
          url: client.webResource.url,
          text: 'Client Name (Skill 1 name)'
        }
      },
      {}
    )
  })

  it('renders contact name when contact is supplied', () => {
    LinkOverflowMock.mockReturnValue(null)

    const client = clientMock({ contact: contactMock })

    render(<ClientListTaskCardTitle client={client} />)

    expect(LinkOverflowMock).toHaveBeenCalledWith(
      {
        link: {
          url: client.webResource.url,
          text: 'Client Name [Contact Name]'
        }
      },
      {}
    )
  })

  it('renders contact name and skill names when both are supplied', () => {
    LinkOverflowMock.mockReturnValue(null)

    const client = clientMock({
      contact: contactMock,
      mainSkillsNeeded: mainSkillsNeededMock([skill2Mock])
    })

    render(<ClientListTaskCardTitle client={client} />)

    expect(LinkOverflowMock).toHaveBeenCalledWith(
      {
        link: {
          url: client.webResource.url,
          text: 'Client Name [Contact Name] (Skill 1 name, Skill 2 name)'
        }
      },
      {}
    )
  })
})
