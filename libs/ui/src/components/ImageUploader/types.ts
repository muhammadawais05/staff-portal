import { ChangeEvent, RefObject } from 'react'

import { Crop } from '../ImageEditor/types'

export type Requirements = {
  filetypes: string
  sizeLimitMB: number
  minDimension: { width: number; height: number }
}

export type ImageUploaderProps = {
  imageInputRef: RefObject<HTMLInputElement>
  imageSrc?: string | null
  onImageInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  onCropChange: (crop: Crop) => void
  cropMinHeight: number
  cropMinWidth: number
  acceptedFormats: string
  loading?: boolean
  viewOnly?: boolean
  initialCrop?: Crop | null
}
