/* eslint-disable no-restricted-globals */
import { useRef, useState, useMemo, useEffect, useCallback } from 'react'

import type { Crop } from '../../../ImageEditor/types'
import { Requirements, ImageUploaderProps } from '../../types'
import useImageInput from '../use-image-input/use-image-input'

export type Props = {
  originalImageSrc?: string | null
  initialCrop?: Crop | null
  imageRequirements: Requirements
  viewOnly?: boolean
}

type ReturnValue = {
  props: ImageUploaderProps
  browseImage: () => void
  imageFile: File | null
  imageCrop: Crop | null
}

const useImageUploader = ({
  originalImageSrc,
  imageRequirements,
  initialCrop,
  viewOnly
}: Props): ReturnValue => {
  const { inputRef, imageFile, onImageInputChange } =
    useImageInput(imageRequirements)

  const browseImage = useCallback(() => {
    inputRef.current?.click()
  }, [inputRef])

  const [imageCrop, setImageCrop] = useState<Crop | null>(null)

  const prevUrl = useRef<string | null>(null)
  const imageSrc = useMemo(() => {
    if (prevUrl.current) {
      URL.revokeObjectURL(prevUrl.current)
      prevUrl.current = null
    }

    let src = originalImageSrc

    if (imageFile) {
      src = URL.createObjectURL(imageFile)
      prevUrl.current = src
    }

    return src
  }, [originalImageSrc, imageFile])

  useEffect(() => {
    return () => {
      if (prevUrl.current) {
        URL.revokeObjectURL(prevUrl.current)
      }
    }
  }, [])

  const { minDimension, filetypes } = imageRequirements

  const acceptedFormats = useMemo(
    () =>
      filetypes
        .split(' ')
        .map(format => `image/${format}`)
        .join(', '),
    [filetypes]
  )

  return {
    props: {
      imageInputRef: inputRef,
      onImageInputChange,
      imageSrc,
      initialCrop,
      onCropChange: setImageCrop,
      cropMinHeight: minDimension.height,
      cropMinWidth: minDimension.width,
      acceptedFormats,
      viewOnly
    },
    browseImage,
    imageFile,
    imageCrop
  }
}

export default useImageUploader
