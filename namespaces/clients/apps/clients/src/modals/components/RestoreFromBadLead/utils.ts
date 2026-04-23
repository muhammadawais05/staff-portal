export const getRestoreFromBadLeadMessage = (clientName?: string) =>
  `Are you sure you want to restore ${
    clientName || 'this company'
  } from Bad Lead status and return it to Applied status?`
