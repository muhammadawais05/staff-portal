import { useEffect } from 'react'
import { useMutation } from '@staff-portal/data-layer-service'

import { TouchCounterDocument } from '../data/touch-counter.staff.gql.types'
import { CounterName } from './counter-names'

interface Props {
  counterName: CounterName
  skipIfMissing?: boolean
}

export const useTouchCounter = ({ counterName, skipIfMissing }: Props) => {
  const [touchCounter] = useMutation(TouchCounterDocument)

  useEffect(() => {
    touchCounter({ variables: { counterName, skipIfMissing } })
  }, [counterName, skipIfMissing, touchCounter])
}
