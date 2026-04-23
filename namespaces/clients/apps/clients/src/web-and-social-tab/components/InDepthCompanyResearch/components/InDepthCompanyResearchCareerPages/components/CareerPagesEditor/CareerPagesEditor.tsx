import React from 'react'
import { EditableFieldArray } from '@staff-portal/editable'

import { UpdateClientCareerPagesInputType } from '../../types'
import { getNewCareerPageData } from '../../utils'
import CareerPagesEditorItem from '../CareerPagesEditorItem'

type Props = {
  onReset?: () => void
  name: keyof UpdateClientCareerPagesInputType
}

const CareerPagesEditor = ({ onReset, name }: Props) => (
  <EditableFieldArray
    editor={CareerPagesEditorItem}
    getNewItem={getNewCareerPageData}
    handleReset={onReset}
    formName={name}
    itemLabel='Career Page'
  />
)

export default CareerPagesEditor
