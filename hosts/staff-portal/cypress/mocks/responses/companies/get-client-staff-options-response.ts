import { Staff } from '@staff-portal/graphql/staff'

export const getClientStaffOptionsResponse = (staff: Partial<Staff> = {}) => ({
  data: {
    accountManagers: {
      nodes: [
        {
          id: 'VjEtU3RhZmYtMjY1NDU1Mw',
          fullName: 'Alex Khudyakov',
          type: 'Staff',
          __typename: 'Staff',
          ...staff
        }
      ],
      __typename: 'QueryRolesConnection'
    },
    claimers: {
      nodes: [
        {
          id: 'VjEtU3RhZmYtMTc5MTkxNA',
          fullName: 'Aaron Younger',
          type: 'Staff',
          __typename: 'Staff',
          ...staff
        }
      ],
      __typename: 'QueryRolesConnection'
    },
    clientPartners: {
      nodes: [
        {
          id: 'VjEtU3RhZmYtMTc5MTkxNA',
          fullName: 'Aaron Younger',
          type: 'Staff',
          __typename: 'Staff',
          ...staff
        }
      ],
      __typename: 'QueryRolesConnection'
    },
    financeTeamMembers: {
      nodes: [
        {
          id: 'VjEtU3RhZmYtMzEwNzkyNQ',
          fullName: 'Allie Incze',
          type: 'Staff',
          __typename: 'Staff',
          ...staff
        }
      ],
      __typename: 'QueryRolesConnection'
    },
    deliveryManagers: {
      nodes: [
        {
          id: 'VjEtU3RhZmYtNjA5OTQ1',
          fullName: 'Brad DeFrank',
          type: 'Staff',
          __typename: 'Staff',
          ...staff
        }
      ],
      __typename: 'QueryRolesConnection'
    },
    salesSpecialists: {
      nodes: [
        {
          id: 'VjEtU3RhZmYtMTczNTA2NA',
          fullName: 'Aileen Toy',
          type: 'Staff',
          __typename: 'Staff',
          ...staff
        }
      ],
      __typename: 'QueryRolesConnection'
    },
    projectRelationshipManagers: {
      nodes: [
        {
          id: 'VjEtU3RhZmYtNjA5OTQ1',
          fullName: 'Brad DeFrank',
          type: 'Staff',
          __typename: 'Staff',
          ...staff
        }
      ],
      __typename: 'QueryRolesConnection'
    },
    relationshipManagers: {
      nodes: [
        {
          id: 'VjEtU3RhZmYtMjU3Nzkz',
          fullName: 'Alex Vaziri',
          type: 'Staff',
          __typename: 'Staff',
          ...staff
        }
      ],
      __typename: 'QueryRolesConnection'
    }
  }
})
