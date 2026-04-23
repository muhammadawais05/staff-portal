import React, { createContext, ReactNode, useContext } from 'react'
import { ApolloError } from '@staff-portal/data-layer-service'

import { StaffProfileFragment } from '../data/get-staff-profile.staff.gql.types'

type StaffContextProps = {
  staffProfile?: StaffProfileFragment | null
  error?: ApolloError
  children?: ReactNode
}

const StaffContext = createContext<StaffContextProps>({})

export const useStaffContext = () => useContext(StaffContext)

export const StaffContextProvider = ({ staffProfile, error, children }: StaffContextProps) => {
  return (
    <StaffContext.Provider value={{
      staffProfile,
      error
    }}
    >
      {children}
    </StaffContext.Provider>
  )
}
