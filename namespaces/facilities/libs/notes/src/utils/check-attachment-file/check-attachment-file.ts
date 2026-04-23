import { NoteFormAttachment } from '../../types'

export const checkAttachmentFile = (attachment?: NoteFormAttachment[]) =>
  Boolean(attachment?.length && attachment[0]?.file instanceof File)
