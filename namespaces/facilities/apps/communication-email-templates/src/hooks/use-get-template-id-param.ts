import { useParams } from '@staff-portal/navigation'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { useMemo } from 'react'

export const useGetTemplateIdParam = () => {
  const { id: templateLegacyId } = useParams<{ id: string }>()
  const templateId = useMemo(
    () => encodeEntityId(templateLegacyId, 'EmailTemplate'),
    [templateLegacyId]
  )

  return { templateId }
}
