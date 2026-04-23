import { GetClientMissionAndOperationQuery } from '../data'

const extractMission = (
  data: GetClientMissionAndOperationQuery | undefined
) => {
  return data?.node?.mission || ''
}

export default extractMission
