import { PitcherHighlights, PitcherState } from '../types'
import { emptyFormState } from './emptyFormState'

interface InitialCardParams {
  previousHighlights: PitcherHighlights | null
}

export const buildInitialCard = ({
  previousHighlights
}: InitialCardParams): PitcherState => ({
  ...emptyFormState,
  highlights: {
    ...emptyFormState.highlights,
    ...previousHighlights
  }
})
