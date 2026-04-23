import { useContext } from 'react'

import { CandidateSendingContext } from '../../containers/CandidateSendingProvider'

const useCandidateSendingContext = () => useContext(CandidateSendingContext)

export default useCandidateSendingContext
