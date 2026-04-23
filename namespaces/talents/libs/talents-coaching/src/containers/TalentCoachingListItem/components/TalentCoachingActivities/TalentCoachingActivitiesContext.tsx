import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  ReactNode
} from 'react'

interface ContextValue {
  setShowCreateNoteForm: Dispatch<SetStateAction<boolean>>
  setShowCreateCoachingEngagementNoteForm: Dispatch<SetStateAction<boolean>>
  setTabIndex: Dispatch<SetStateAction<number>>
  setIsExpanded: Dispatch<SetStateAction<boolean>>
  showCreateNoteForm: boolean
  showCreateCoachingEngagementNoteForm: boolean
  tabIndex: number
  isExpanded: boolean
}

const TalentCoachingActivitiesContext = createContext<ContextValue>(
  undefined as unknown as ContextValue
)

export const TalentCoachingActivitiesProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const [tabIndex, setTabIndex] = useState(0)
  const [showCreateNoteForm, setShowCreateNoteForm] = useState(false)
  const [
    showCreateCoachingEngagementNoteForm,
    setShowCreateCoachingEngagementNoteForm
  ] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <TalentCoachingActivitiesContext.Provider
      value={{
        isExpanded,
        setIsExpanded,
        tabIndex,
        setTabIndex,
        showCreateNoteForm,
        setShowCreateNoteForm,
        showCreateCoachingEngagementNoteForm,
        setShowCreateCoachingEngagementNoteForm
      }}
    >
      {children}
    </TalentCoachingActivitiesContext.Provider>
  )
}

export const useTalentCoachingActivitiesContext = () =>
  useContext(TalentCoachingActivitiesContext)
