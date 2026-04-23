import React, { ReactNode } from 'react'
import { SearchBar, createInputCategory } from '@staff-portal/filters'

export interface Props {
  nestableControls: ReactNode
}

const EmailTemplatesListSearchBar = ({ nestableControls }: Props) => (
  <SearchBar
    name='badges'
    categories={[createInputCategory({ name: 'names' })]}
    nestableControls={nestableControls}
    shouldRenderLogicOperatorControls={false}
  />
)

export default EmailTemplatesListSearchBar
