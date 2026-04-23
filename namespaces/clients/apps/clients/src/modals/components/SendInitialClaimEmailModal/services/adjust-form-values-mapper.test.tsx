import { adjustFormValuesMapper } from './adjust-form-values-mapper'

describe('adjustFormValuesMapper', () => {
  it('should map values to an expected form', () => {
    expect(
      adjustFormValuesMapper('nodeId')({
        to: 'to',
        title: 'title',
        body: 'body',
        ccAdditional: [
          { value: 'first-additional-cc' },
          { value: 'second-additional-cc' }
        ],
        ccSuggested: ['first-suggested-cc', 'second-suggested-cc'],
        template: 'templateId',
        pendingTasks: []
      })
    ).toMatchObject({
      clientId: 'nodeId',
      contactId: 'to',
      title: 'title',
      body: 'body',
      cc: [
        'first-suggested-cc',
        'second-suggested-cc',
        'first-additional-cc',
        'second-additional-cc'
      ],
      emailTemplateId: 'templateId',
      taskIds: []
    })
  })
})
