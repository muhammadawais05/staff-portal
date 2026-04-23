import { defineMessage } from '@toptal/staff-portal-message-bus'

import { NoteLinks } from './types'

export const UNSAVED_NOTES_UPDATED = defineMessage<{ links: NoteLinks }>()
