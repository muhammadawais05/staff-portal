import { BATCH_KEY, useQuery } from '@staff-portal/data-layer-service'

import { TALENT_APPLICANT_ITEM_BATCH_KEY } from '../../../config'
import { GetTalentApplicantItemDocument } from '../data/get-talent-applicant-item'

const useGetTalentApplicantData = (talentId: string) => {
  return useQuery(GetTalentApplicantItemDocument, {
    variables: {
      talentId
    },
    context: { [BATCH_KEY]: TALENT_APPLICANT_ITEM_BATCH_KEY }
  })
}

export default useGetTalentApplicantData
