export default {
  // Queries
  GetRelatedTasks: {
    data: {
      staffNode: {
        id: 'VjEtSW52b2ljZS0zODA2MDA',
        relatedTasks: {
          completedCount: 0,
          nodes: [],
          __typename: 'RelatedTasksConnection'
        },
        __typename: 'Invoice'
      }
    },
    extensions: {
      tracing: {
        version: 1,
        startTime: '2020-10-09T16:19:53.985Z',
        endTime: '2020-10-09T16:19:54.534Z',
        duration: 549419326,
        execution: { resolvers: [] }
      }
    }
  },
  GetCreateTaskOperation: {
    data: {
      operations: {
        createTask: {
          callable: 'ENABLED',
          messages: [],
          __typename: 'Operation'
        },
        __typename: 'QueryOperations'
      }
    },
    extensions: {
      tracing: {
        version: 1,
        startTime: '2020-10-09T16:19:53.985Z',
        endTime: '2020-10-09T16:19:54.219Z',
        duration: 234003775,
        execution: { resolvers: [] }
      }
    }
  }
}
