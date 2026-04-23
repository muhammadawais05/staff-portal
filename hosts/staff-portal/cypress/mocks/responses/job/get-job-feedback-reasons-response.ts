export const getJobFeedbackReasonsResponse = () => ({
  data: {
    feedbackReasons: {
      nodes: [
        {
          id: 'VjEtRmVlZGJhY2tSZWFzb24tMTIxNg',
          identifier: 'budget',
          name: 'Budget restrictions',
          group: null,
          __typename: 'FeedbackReason'
        },
        {
          id: 'VjEtRmVlZGJhY2tSZWFzb24tMTIyMQ',
          identifier: 'client_unresponsive',
          name: 'Client became unresponsive',
          group: null,
          __typename: 'FeedbackReason'
        },
        {
          id: 'VjEtRmVlZGJhY2tSZWFzb24tMTIyOQ',
          identifier: 'client_has_unreasonable_expectations',
          name: 'Client has unreasonable expectations',
          group: null,
          __typename: 'FeedbackReason'
        }
      ],
      __typename: 'FeedbackReasonConnection'
    }
  }
})

export const getJobFeedbackCanceledReasonsResponse = () => ({
  data: {
    feedbackReasons: {
      nodes: [
        {
          id: 'VjEtRmVlZGJhY2tSZWFzb24tMTI5Mg',
          identifier: 'client_budget_is_too_small',
          name: 'Client budget is too small',
          description:
            "The client's overall budget for the project was insufficient whether because of internal restrictions or because of the need for further fundraising. This reason should only be selected if neither rate-related nor scope-related reasons apply.",
          group: {
            id: 'VjEtRmVlZGJhY2tSZWFzb24tMTI5MA',
            name: 'Client has budget restrictions',
            __typename: 'FeedbackReason'
          },
          __typename: 'FeedbackReason'
        }
      ]
    }
  }
})
