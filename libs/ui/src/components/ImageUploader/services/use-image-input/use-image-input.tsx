import { useState, useMemo, useRef, useCallback, ReactNode } from 'react'
import { useNotifications } from '@toptal/picasso/utils'

import { getImageValidator } from '../validate-image/validate-image'
import { Requirements } from '../../types'

const useImageInput = (imageRequirements: Requirements) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [imageFile, setFile] = useState<File | null>(null)

  const { showError } = useNotifications()

  const validateImage = useMemo(
    () => getImageValidator(imageRequirements),
    [imageRequirements]
  )

  const onImageInputChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files?.length) {
        return
      }
      const targetFile = event.target.files[0]

      try {
        await validateImage(event)

        setFile(targetFile)
      } catch (error) {
        ;(inputRef.current as HTMLInputElement).value = ''
        showError(error as ReactNode)
      }
    },
    [showError, validateImage]
  )

  return {
    inputRef,
    imageFile,
    onImageInputChange
  }
}

export default useImageInput
