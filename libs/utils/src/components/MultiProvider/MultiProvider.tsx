import React, { PropsWithChildren, ReactElement } from 'react'

import { nest } from './services/nest/nest'

type Props = PropsWithChildren<{
  providers: ReactElement[]
}>

const MultiProvider = ({ children, providers }: Props) => (
  <>{providers.reduceRight(nest, children)}</>
)

export default MultiProvider
