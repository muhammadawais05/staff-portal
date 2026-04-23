import { useQuery } from '@staff-portal/data-layer-service'

import { GetEmailTemplateDataDocument } from '../data/use-get-email-template'

export const useGetTemplateData = ({ templateId }: { templateId?: string }) => {
  const { data, loading } = useQuery(GetEmailTemplateDataDocument, {
    skip: !templateId,
    variables: {
      templateId
    },
    throwOnError: true
  })

  return { data, loading }
}
