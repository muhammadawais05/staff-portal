export const performedActionTemplateFixture = {
  payload: {
    id: '0005898f-c0d7-11b4-0000-000001b308c5',
    occurredAt: '2019-05-23T11:29:52-04:00',
    action: 'kinship_updated',
    subjectGID: 'gid://platform/Ability/1471',
    subjectName: null,
    performerGID: 'gid://platform/Staff/757839',
    comment: null,
    payload:
      '{"changes":[{"$type":"template","template":"%{abilities} was removed","variables":{"abilities":[{"gid":"gid://platform/Ability/69","reference":"Sales"}]}}],"direction":"parents","affected_abilities":[{"gid":"gid://platform/Ability/69"}]}',
    template:
      '%{performer} updated ability %{subject}: %{payload.changes} as %{payload.direction}'
  },
  modelDescriptions: [
    {
      gid: 'gid://platform/Ability/69',
      associationReferences: [],
      designation: 'ability',
      reference: {
        text: 'Sales',
        accessible: false,
        options: [],
        path: null
      }
    },
    {
      gid: 'gid://platform/Ability/1471',
      associationReferences: [],
      designation: 'ability',
      reference: {
        text: 'Client: Manage Parent',
        accessible: false,
        options: [],
        path: null
      }
    },
    {
      gid: 'gid://platform/Staff/757839',
      associationReferences: [],
      designation: 'staff member',
      reference: {
        text: 'Grzegorz Kaczorek',
        accessible: false,
        options: [],
        path: null
      }
    }
  ]
}

export const modelDescriptionTemplateFixture = {
  payload: {
    id: '00059a5f-289b-6464-0000-0000023279c9',
    occurredAt: '2019-12-23T16:39:37+03:00',
    action: 'finished',
    subjectGID: 'gid://platform/Task/6994237',
    subjectName: null,
    performerGID: 'gid://platform/Staff/289076',
    comment: null,
    payload: '{}',
    template: '%{performer} %{action} %{subject.designation} %{subject}'
  },

  modelDescriptions: [
    {
      gid: 'gid://platform/Task/6994237',
      associationReferences: [],
      designation: 'task',
      reference: {
        __typename: 'ModelDescriptionTemplate',
        template: '%{description} on %{related_to}',
        variables: [
          {
            name: 'description',
            value: {
              __typename: 'ModelDescriptionLabel',
              text: '"Check attitude and pass to tech 1 screener"'
            },
            __typename: 'ModelDescriptionTemplateVariable'
          },
          {
            name: 'related_to',
            value: {
              __typename: 'ModelDescriptionLink',
              text: 'Rose Streich',
              accessible: true,
              options: [],
              path: '/platform/staff/talents/1680879'
            },
            __typename: 'ModelDescriptionTemplateVariable'
          }
        ]
      },
      __typename: 'ModelDescription'
    },
    {
      gid: 'gid://platform/Staff/289076',
      associationReferences: [],
      designation: 'staff member',
      reference: {
        __typename: 'ModelDescriptionLink',
        text: 'Barbara Horvat',
        accessible: true,
        options: [],
        path: '/platform/staff/staff/289076'
      },
      __typename: 'ModelDescription'
    }
  ]
}
