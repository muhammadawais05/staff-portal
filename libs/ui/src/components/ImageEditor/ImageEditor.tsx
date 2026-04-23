import 'react-image-crop/dist/ReactCrop.css'
import React, { useState, useCallback, useEffect, useRef } from 'react'
import { PixelCrop, PercentCrop, convertToPercentCrop } from 'react-image-crop'

import { LoadingOverlay } from './components/LoadingOverlay/LoadingOverlay'
import { FaceGuide } from './components/FaceGuide/FaceGuide'
import { PreviewContainer, Cropper } from './styles'
import { PREVIEW_WIDTH, PREVIEW_HEIGHT } from './constants'
import { Crop } from './types'
import {
  getCenteredPercentCrop,
  toIntegerPixelCrop,
  isOutOfBorders
} from './services/crop-calculation-helpers/crop-calculation-helpers'

type Props = {
  src?: string | null
  initialCrop?: Crop | null
  showGrid?: boolean
  minCropWidth: number
  minCropHeight: number
  overlay?: React.ReactChild
  onChange: (crop: Crop) => void
  selectionOverlay?: React.ReactChild
  loading?: boolean
  previewWidth?: number
  previewHeight?: number
  error?: boolean
  viewOnly?: boolean
}

export const ImageEditor = ({
  src,
  initialCrop,
  showGrid,
  minCropWidth,
  minCropHeight,
  onChange,
  overlay,
  loading,
  selectionOverlay,
  previewWidth = PREVIEW_WIDTH,
  previewHeight = PREVIEW_HEIGHT,
  error,
  viewOnly
}: Props) => {
  const [crop, setCrop] = useState<PercentCrop>()
  const [finalCrop, setFinalCrop] = useState<Crop | undefined>()
  const [scaleFactor, setScaleFactor] = useState(1)
  const imageRef = useRef<HTMLImageElement>(null as unknown as HTMLImageElement)

  const aspect = minCropWidth / minCropHeight

  const needToApplyInitialCrop = Boolean(!crop && initialCrop)

  const initialize = useCallback(
    ({ width, height, naturalWidth, naturalHeight }: HTMLImageElement) => {
      setScaleFactor(Math.min(naturalWidth / width, naturalHeight / height))

      if (needToApplyInitialCrop && initialCrop) {
        setCrop(
          convertToPercentCrop(
            {
              unit: 'px',
              x: initialCrop.cropX,
              y: initialCrop.cropY,
              width: initialCrop.cropW,
              height: initialCrop.cropH
            },
            naturalWidth,
            naturalHeight
          )
        )
        setFinalCrop(initialCrop)

        return
      }

      const centeredPercentCrop = getCenteredPercentCrop(
        naturalWidth,
        naturalHeight,
        aspect
      )

      const fullSizeCrop = toIntegerPixelCrop({
        percentCrop: centeredPercentCrop,
        naturalWidth,
        naturalHeight,
        minCropWidth,
        minCropHeight
      })

      setCrop(centeredPercentCrop)
      setFinalCrop({
        cropX: fullSizeCrop.x,
        cropY: fullSizeCrop.y,
        cropW: fullSizeCrop.width,
        cropH: fullSizeCrop.height
      })
    },
    [aspect, minCropHeight, minCropWidth, initialCrop, needToApplyInitialCrop]
  )

  const onComplete = useCallback(
    (_pixelCrop: PixelCrop, percentCrop: PercentCrop) => {
      const { naturalWidth, naturalHeight } = imageRef.current

      const fullSizeCrop = toIntegerPixelCrop({
        percentCrop,
        naturalWidth,
        naturalHeight,
        minCropWidth,
        minCropHeight
      })

      setFinalCrop({
        cropX: fullSizeCrop.x,
        cropY: fullSizeCrop.y,
        cropW: fullSizeCrop.width,
        cropH: fullSizeCrop.height
      })
    },
    [minCropHeight, minCropWidth]
  )

  useEffect(() => {
    if (finalCrop) {
      onChange(finalCrop)
    }
  }, [finalCrop, onChange])

  const onCropChange = useCallback(
    (_pixelCrop: PixelCrop, percentCrop: PercentCrop) => {
      if (
        isOutOfBorders(percentCrop) ||
        percentCrop.width === 0 ||
        percentCrop.height === 0
      ) {
        return
      }

      setCrop(percentCrop)
    },
    []
  )

  const renderSelectionAddon = useCallback(
    () => selectionOverlay,
    [selectionOverlay]
  )

  const conditionalProps = viewOnly ? {} : { crop, renderSelectionAddon }

  return (
    <PreviewContainer
      error={error}
      data-testid='image-editor'
      previewWidth={previewWidth}
      previewHeight={previewHeight}
    >
      {Boolean(src) && (
        <Cropper
          width={previewWidth}
          height={previewHeight}
          minWidth={minCropWidth / scaleFactor}
          minHeight={minCropHeight / scaleFactor}
          aspect={aspect}
          onChange={onCropChange}
          onComplete={onComplete}
          ruleOfThirds={showGrid}
          {...conditionalProps}
          disabled={loading || viewOnly}
        >
          <img
            ref={imageRef}
            src={src as string}
            onLoad={e => {
              initialize(e.currentTarget as HTMLImageElement)
            }}
          />
        </Cropper>
      )}
      {loading ? <LoadingOverlay /> : overlay}
    </PreviewContainer>
  )
}

ImageEditor.FaceGuide = FaceGuide
