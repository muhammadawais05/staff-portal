import React, { useEffect, useRef, useState } from 'react'
import Image, { ImageProps } from '@toptal/picasso/Image'
import { Loader } from '@toptal/picasso'

import * as S from './styles'

const ImageWithLoader = ({ src, ...rest }: ImageProps) => {
  const imageLoadRef = useRef(src)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (imageLoadRef.current !== src) {
      setIsLoading(true)
    }
  }, [src])

  return (
    <>
      {isLoading && <Loader css={S.loader} />}
      <Image
        src={src}
        onLoad={() => setIsLoading(false)}
        {...rest}
        css={[S.image, !isLoading && S.imageVisible]}
      />
    </>
  )
}

export default ImageWithLoader
