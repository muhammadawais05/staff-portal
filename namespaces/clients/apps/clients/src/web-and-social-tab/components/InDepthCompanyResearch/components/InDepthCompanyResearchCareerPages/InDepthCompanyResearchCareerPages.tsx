import React from 'react'
import { EditableField } from '@staff-portal/editable'

import { getClientCareerPagesHook } from '../../../../utils'
import { CareerPageFragment } from '../../../../data'
import { useUpdateClientCareerPages } from './data'
import { UpdateClientCareerPagesInputType } from './types'
import { CareerPagesEditor, CareerPagesViewer } from './components'

interface Props {
  disabled?: boolean
  clientId: string
  value: CareerPageFragment[]
  name: keyof UpdateClientCareerPagesInputType
}

const InDepthCompanyResearchCareerPages = ({
  value,
  clientId,
  name,
  disabled
}: Props) => {
  const useClientCareerPages = getClientCareerPagesHook(clientId)
  const { handleChange } = useUpdateClientCareerPages(clientId)

  return (
    <EditableField<{ careerPages: CareerPageFragment[] }, CareerPageFragment[]>
      value={value}
      editor={({ onReset }) => (
        <CareerPagesEditor onReset={onReset} name={name} />
      )}
      viewer={<CareerPagesViewer nodes={value} />}
      disabled={disabled}
      name={name}
      onChange={handleChange}
      queryValue={useClientCareerPages}
      fullWidthEditor={true}
    />
  )
}

export default InDepthCompanyResearchCareerPages
