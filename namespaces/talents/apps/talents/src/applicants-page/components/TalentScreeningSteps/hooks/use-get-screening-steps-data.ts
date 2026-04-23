import { BATCH_KEY, useQuery } from '@staff-portal/data-layer-service'

import { TALENT_APPLICANT_ITEM_BATCH_KEY } from '../../../config'
import { GetTalentScreeningDataDocument } from '../data/get-screening-data'

const useGetScreeningStepsData = (talentId: string) => {
  return useQuery(GetTalentScreeningDataDocument, {
    variables: {
      talentId
    },
    context: { [BATCH_KEY]: TALENT_APPLICANT_ITEM_BATCH_KEY }
  })
}

export default useGetScreeningStepsData
