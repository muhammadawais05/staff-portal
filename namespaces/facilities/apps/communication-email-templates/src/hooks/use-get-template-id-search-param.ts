import { useQueryParams } from '@staff-portal/navigation'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { useMemo } from 'react'

export const useGetTemplateIdSearchParam = () => {
  const [{ template_id: templateLegacyId }] = useQueryParams({
    template_id: 'string'
  })

  const templateId = useMemo(
    () =>
      templateLegacyId
        ? encodeEntityId(templateLegacyId, 'EmailTemplate')
        : undefined,
    [templateLegacyId]
  )

  return { templateId }
}
