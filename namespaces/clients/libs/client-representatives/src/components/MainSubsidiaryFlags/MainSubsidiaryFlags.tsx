import React from 'react'
import { Container, Tag } from '@toptal/picasso'

type Props = {
  main?: boolean | null
  isSubsidiary?: boolean
}

const MainSubsidiaryFlags = ({ main = false, isSubsidiary = false }: Props) => (
  <Container>
    {main && !isSubsidiary && (
      <Tag.Rectangular indicator='blue' css={{ marginRight: '.25rem' }}>
        Primary
      </Tag.Rectangular>
    )}

    {isSubsidiary && (
      <Tag.Rectangular indicator='light-grey'>Subsidiary</Tag.Rectangular>
    )}
  </Container>
)

export default MainSubsidiaryFlags
