import { AnyObject } from '@toptal/picasso-forms'
import { pick } from 'lodash-es'

const adjustValues = (formValues: AnyObject) => {
  const validFileAttachment =
    formValues?.attachment?.[0]?.file?.size && formValues?.attachment?.[0]?.file
  const changeset = pick(formValues, [
    'comment',
    'title',
    'notableId',
    'noteId'
  ])

  return validFileAttachment
    ? { ...changeset, attachment: validFileAttachment }
    : changeset
}

export default adjustValues
