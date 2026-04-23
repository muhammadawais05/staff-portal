/* eslint-disable no-restricted-globals */
import { ChangeEvent } from 'react'

import { Requirements } from '../../types'
import { errorMessages } from './error-messages'

export const getImageSize = (file: File) =>
  new Promise<{ width: number; height: number }>(resolve => {
    const image = new Image()

    image.src = URL.createObjectURL(file)
    image.onload = () => {
      resolve({ width: image.width, height: image.height })
      URL.revokeObjectURL(image.src)
    }
  })

const validateResolution = async (
  file: File,
  minWidth: number,
  minHeight: number
) => {
  const { width, height } = await getImageSize(file)

  return width >= minWidth && height >= minHeight
}

export const getImageValidator =
  ({ filetypes, sizeLimitMB, minDimension: minSize }: Requirements) =>
  async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      throw errorMessages.noFile
    }

    const file = event.target.files[0]

    // validate filetype
    // removing "image/" prefix
    const extension = file.type.slice(6)

    if (!filetypes.includes(extension)) {
      throw errorMessages.type(filetypes)
    }

    // validate size
    if (file.size > sizeLimitMB * 10e6) {
      throw errorMessages.size(sizeLimitMB)
    }

    if (!(await validateResolution(file, minSize.width, minSize.height))) {
      throw errorMessages.resolution(minSize.width, minSize.height)
    }
  }
