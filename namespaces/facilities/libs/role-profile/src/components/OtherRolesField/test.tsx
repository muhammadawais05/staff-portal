import React from 'react'
import { render, screen } from '@testing-library/react'
import { TalentCumulativeStatus, RoleStatus } from '@staff-portal/graphql/staff'
import { getTalentProfilePath } from '@staff-portal/routes'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import { OtherRoleFragment } from '../../data/other-role-fragment'
import OtherRoles, { Props } from './OtherRolesField'

const arrangeTest = ({ otherRoles }: Props) =>
  render(
    <TestWrapper>
      <OtherRoles otherRoles={otherRoles} />
    </TestWrapper>
  )

describe('OtherRolesField', () => {
  describe('when there are other roles', () => {
    it('shows single role', () => {
      const otherRole = {
        id: 'VjEtVGFsZW50LTExNDE1OTI',
        type: 'Staff',
        __typename: 'Staff',
        client: {
          fullName: 'Full name'
        },
        cumulativeStatus: RoleStatus.APPLIED,
        webResource: {
          url: 'https://staging.toptal.net/platform/staff/staff/1317466',
          __typename: 'Link'
        }
      } as OtherRoleFragment

      arrangeTest({ otherRoles: [otherRole] })

      expect(screen.getByTestId('other-roles-field')).toBeInTheDocument()
      expect(
        screen.getByText('Full name - Staff (applied)')
      ).toBeInTheDocument()
    })

    it('shows multiple roles', () => {
      const URL_OTHER_ROLE_1 =
        'https://staging.toptal.net/platform/link-to-talent-1'

      const ID_OTHER_ROLE_2 = 'VjEtVGFsZW50LTI5MTYyOQ'

      const otherRole1 = {
        id: 'VjEtVGFsZW50LTExNDE1OTI',
        type: 'FinanceExpert',
        __typename: 'Staff',
        cumulativeStatus: RoleStatus.APPLIED,
        webResource: {
          url: URL_OTHER_ROLE_1,
          __typename: 'Link'
        }
      } as OtherRoleFragment

      const otherRole2 = {
        id: ID_OTHER_ROLE_2,
        type: 'Developer',
        __typename: 'Talent',
        talentCumulativeStatus: TalentCumulativeStatus.ACTIVE,
        webResource: {
          url: 'https://staging.toptal.net/platform/link-to-talent-2',
          __typename: 'Link'
        }
      } as OtherRoleFragment

      arrangeTest({ otherRoles: [otherRole1, otherRole2] })

      const role1 = screen.getByText('Finance Expert (applied)')
      const role2 = screen.getByText('Developer (active)')

      expect(screen.getByTestId('other-roles-field')).toBeInTheDocument()
      expect(role1).toHaveAttribute('href', URL_OTHER_ROLE_1)
      expect(role2).toHaveAttribute(
        'href',
        getTalentProfilePath(decodeEntityId(ID_OTHER_ROLE_2).id)
      )
    })
  })

  describe('when there are no other roles', () => {
    it('is hidden', () => {
      arrangeTest({ otherRoles: undefined })

      expect(screen.queryByText('Other roles')).not.toBeInTheDocument()
    })
  })

  describe('when there are empty other roles list', () => {
    it('is hidden', () => {
      arrangeTest({ otherRoles: [] })

      expect(screen.queryByText('Other roles')).not.toBeInTheDocument()
    })
  })
})
