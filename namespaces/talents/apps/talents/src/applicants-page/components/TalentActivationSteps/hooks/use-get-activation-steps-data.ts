import { BATCH_KEY, useQuery } from '@staff-portal/data-layer-service'

import { TALENT_APPLICANT_ITEM_BATCH_KEY } from '../../../config'
import { GetTalentActivationDataDocument } from '../data/get-activation-data'

const useGetActivationStepsData = (talentId: string) => {
  return useQuery(GetTalentActivationDataDocument, {
    variables: {
      talentId
    },
    context: { [BATCH_KEY]: TALENT_APPLICANT_ITEM_BATCH_KEY }
  })
}

export default useGetActivationStepsData
