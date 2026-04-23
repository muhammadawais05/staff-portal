import { useMemo } from 'react'

import { NoteItemFragment } from '../../../../../__fragments__/noteItemFragment.graphql.types'

const useGetInitialValues = (note: NoteItemFragment) => {
  return useMemo(() => {
    const attachment = note?.attachment
      ? [{ ...note?.attachment, file: { name: note?.attachment?.url } }]
      : []

    return {
      attachment,
      comment: note?.comment || '',
      title: note?.title || ''
    }
  }, [note])
}

export default useGetInitialValues
