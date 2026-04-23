import { GetJobHeaderQuery } from '../data/getJobHeader.graphql.types'

type Engagements = Exclude<
  GetJobHeaderQuery['node'],
  null | undefined
>['engagements']

const defaultEngagements = { nodes: [{ id: '', talent: { fullName: '' } }] }

const mapEngagementToListOption = (engagements: Engagements) => {
  return (engagements || defaultEngagements).nodes.map(({ talent, id }) => ({
    text: talent?.fullName ?? '',
    value: id
  }))
}

export default mapEngagementToListOption
