import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTalentScreeningDataResponse = () => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      screeningRoleSteps: {
        nodes: [
          {
            id: 'VjEtUm9sZVN0ZXAtMTU5NDU4Nw',
            status: 'approved',
            claimer: {
              id: encodeEntityId('123', 'Staff'),
              __typename: 'Staff'
            },
            mainAction: {
              actionName: null,
              status: 'HIDDEN',
              tooltip:
                'Approved by Danita Kunde: "This part was obfuscated, some content was here."',
              __typename: 'RoleStepMainAction'
            },
            step: {
              id: 'VjEtU3RlcC0xOA',
              title: 'English',
              __typename: 'Step'
            },
            __typename: 'RoleStep'
          }
        ],
        __typename: 'TalentScreeningRoleStepConnection'
      },
      __typename: 'Talent'
    }
  }
})
