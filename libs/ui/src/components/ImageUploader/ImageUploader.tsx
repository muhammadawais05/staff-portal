import React from 'react'

import { ImageEditor } from '../ImageEditor/ImageEditor'
import type { ImageUploaderProps } from './types'

const ImageUploader = ({
  imageInputRef,
  onCropChange,
  onImageInputChange,
  imageSrc,
  initialCrop,
  cropMinHeight,
  cropMinWidth,
  acceptedFormats,
  loading,
  viewOnly
}: ImageUploaderProps) => {
  return (
    <>
      <input
        hidden
        ref={imageInputRef}
        type='file'
        accept={acceptedFormats}
        onChange={onImageInputChange}
        data-testid='image-uploader-input'
      />
      <ImageEditor
        viewOnly={viewOnly}
        initialCrop={initialCrop}
        loading={loading}
        src={imageSrc}
        onChange={onCropChange}
        minCropWidth={cropMinWidth}
        minCropHeight={cropMinHeight}
        selectionOverlay={<ImageEditor.FaceGuide />}
      />
    </>
  )
}

export default ImageUploader
