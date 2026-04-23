import Picasso from '@toptal/picasso-provider'
import React, { ReactNode } from 'react'

export const withPicasso = (children: ReactNode) => (
  <Picasso>{children}</Picasso>
)
