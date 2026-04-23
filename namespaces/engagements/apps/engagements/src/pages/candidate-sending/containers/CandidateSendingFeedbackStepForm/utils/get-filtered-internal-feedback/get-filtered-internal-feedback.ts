export type Props = {
  internalFeedback: Record<string, boolean> | undefined
}

const getFilteredInternalFeedback = ({ internalFeedback }: Props) =>
  internalFeedback
    ? Object.keys(internalFeedback).filter(valueItem =>
        Boolean(internalFeedback[valueItem])
      )
    : []

export default getFilteredInternalFeedback
