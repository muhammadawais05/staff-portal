import React, { useContext } from 'react'

export interface MeetingListContextProps {
  refreshMeetingList: () => void
}

export const MeetingListContext = React.createContext<MeetingListContextProps>({
  refreshMeetingList: () => {}
})

export const useMeetingListContext = () => useContext(MeetingListContext)
