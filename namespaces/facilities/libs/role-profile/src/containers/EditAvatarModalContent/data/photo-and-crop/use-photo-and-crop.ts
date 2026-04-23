import { useQuery } from '@staff-portal/data-layer-service'

import { PhotoAndCropDocument } from './photo-and-crop.staff.gql.types'

export const usePhotoAndCrop = (roleId: string) => {
  const { data, loading } = useQuery(PhotoAndCropDocument, {
    variables: {
      roleId
    }
  })

  return {
    loading,
    originalImageUrl: data?.staffNode?.photo?.original,
    originalImageCrop: data?.staffNode?.photo?.transformations?.cropped
  }
}
