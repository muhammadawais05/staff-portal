import React, { ReactNode } from 'react'

import TalentApplicantItem from '../../components/TalentApplicantItem'
import TalentApplicantSearch from '../../components/TalentApplicantSearch'

export const renderItem = ({ id }: { id: string }, index: number) => (
  <TalentApplicantItem talentId={id} itemIndex={index} />
)
export const getItemKey = ({ id }: { id: string }) => id

export const getTalentApplicantsSearch = (nestedControls: ReactNode) => (
  <TalentApplicantSearch nestableControls={nestedControls} />
)
