import {
  PixelCrop,
  PercentCrop,
  centerCrop,
  makeAspectCrop,
  convertToPixelCrop
} from 'react-image-crop'

/** Calculates maximum centered crop */
export const getCenteredPercentCrop = (
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
): PercentCrop => {
  const size = mediaWidth > mediaHeight ? { height: 100 } : { width: 100 }

  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        ...size
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  ) as PercentCrop
}

/** Calculates maximum possible inscribed integer crop for given aspect */
export const getMaxInscribedCrop = (
  maxWidth: number,
  maxHeight: number,
  aspect: { width: number; height: number }
) => {
  const { width, height } = aspect

  const divisor = greatestCommonDivisor(width, height)
  const minWidth = width / divisor
  const minHeight = height / divisor

  const scale = Math.floor(Math.min(maxWidth / minWidth, maxHeight / minHeight))

  return { width: minWidth * scale, height: minHeight * scale }
}

const greatestCommonDivisor = (num1: number, num2: number): number => {
  if (!num2) {
    return num2 === 0 ? num1 : NaN
  }

  return greatestCommonDivisor(num2, num1 % num2)
}

type calculateFullSizeIntegerCropProps = {
  percentCrop: PercentCrop
  naturalWidth: number
  naturalHeight: number
  minCropWidth: number
  minCropHeight: number
}

/** Safely transforms percent crop to pixel prop. Respects size constraints and aspect */
export const toIntegerPixelCrop = ({
  percentCrop,
  naturalWidth,
  naturalHeight,
  minCropWidth,
  minCropHeight
}: calculateFullSizeIntegerCropProps): PixelCrop => {
  const naturalPixelCrop = convertToPixelCrop(
    percentCrop,
    naturalWidth,
    naturalHeight
  )

  const maxPossibleWidth = calculateMaxIntegerDimension(
    naturalPixelCrop.x,
    naturalPixelCrop.width,
    naturalWidth
  )
  const maxPossibleHeight = calculateMaxIntegerDimension(
    naturalPixelCrop.y,
    naturalPixelCrop.height,
    naturalHeight
  )

  const maxCropSize = getMaxInscribedCrop(maxPossibleWidth, maxPossibleHeight, {
    width: minCropWidth,
    height: minCropHeight
  })

  return {
    unit: 'px',
    x: Math.round(naturalPixelCrop.x),
    y: Math.round(naturalPixelCrop.y),
    width: maxCropSize.width,
    height: maxCropSize.height
  }
}

const calculateMaxIntegerDimension = (
  sidePadding: number,
  sideLength: number,
  imageSideSize: number
) => {
  const otherSidePadding = imageSideSize - Math.round(sidePadding + sideLength)

  return imageSideSize - Math.round(sidePadding) - otherSidePadding
}

export const isOutOfBorders = (crop: PercentCrop) =>
  crop.x < 0 ||
  crop.y < 0 ||
  crop.x + crop.width > 100 ||
  crop.y + crop.height > 100
