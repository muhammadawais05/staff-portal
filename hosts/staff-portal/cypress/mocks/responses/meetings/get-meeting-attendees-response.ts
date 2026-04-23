export const getMeetingAttendeesResponse = () => ({
  data: {
    meetingEndpoints: {
      nodes: [
        {
          id: 'some-id',
          name: 'some name',
          countryName: 'Poland',
          meetingJoinTime: '2021-08-23T19:52:13.506Z',
          meetingLeaveTime: '2021-08-23T20:52:13.506Z',
          __typename: 'MeetingEndpoint'
        }
      ],
      totalCount: 1,
      __typename: 'MeetingEndpointsConnection'
    }
  }
})
