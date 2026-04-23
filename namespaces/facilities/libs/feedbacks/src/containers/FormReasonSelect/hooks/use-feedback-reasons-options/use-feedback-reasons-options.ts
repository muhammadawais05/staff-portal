import { useMemo } from 'react'
import { Option, OptionGroups } from '@toptal/picasso/Select'

import { FeedbackReasonFragment } from '../../data/get-feedback-reasons'

type FeedbackReasonOptions = (Option & { identifier?: string })[] | OptionGroups

export const useFeedbackReasonsOptions = (
  feedbackReasons?: FeedbackReasonFragment[],
  grouped?: boolean
) =>
  useMemo<FeedbackReasonOptions>(() => {
    if (grouped && feedbackReasons?.some(reason => reason.group)) {
      return feedbackReasons.reduce((acc, { id, name, group }) => {
        if (!group) {
          return acc
        }

        acc[group.name] = [
          ...(acc[group.name] || []),
          { text: name, value: id }
        ]

        return acc
      }, {} as { [key: string]: Option[] })
    }

    return (
      feedbackReasons?.map(({ id, identifier, name }) => ({
        text: name,
        identifier,
        value: id
      })) || []
    )
  }, [feedbackReasons, grouped])
