import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getActiveJobPositionQuestionTemplatesResponse = () => ({
  data: {
    activeJobPositionQuestionTemplates: {
      nodes: [
        {
          id: encodeEntityId('123', 'JobPositionQuestionTemplate'),
          question:
            "The client's time zone is {{ client_timezone }}, and their working hours are {{ client_working_hours }} in your time zone {{ talent_timezone }}. How many hours of overlap can you provide during their workday?",
          sticky: true,
          __typename: 'JobPositionQuestionTemplate'
        }
      ],
      __typename: 'JobPositionQuestionTemplateConnection'
    }
  }
})
