import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Vertical } from '@staff-portal/graphql/staff'

export const getJobCreateVerticalsResponse = (verticals?: Vertical[]) => ({
  data: {
    verticals: {
      nodes: verticals ?? [
        {
          id: encodeEntityId('123', 'Vertical'),
          name: 'Developer',
          jobType: {
            hint: 'Choose if you need a software developer, QA engineer, etc.',
            __typename: 'JobType'
          },
          __typename: 'Vertical'
        }
      ],
      __typename: 'VerticalConnection'
    }
  }
})
