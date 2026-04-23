import { createContext, useContext } from 'react'

import { SkillPair } from '../types'

const INITIAL_DATA = {
  selectedSkills: []
}

export const GigCandidatesContext =
  createContext<{ selectedSkills: SkillPair[] }>(INITIAL_DATA)

export const useGigsContext = () => useContext(GigCandidatesContext)
