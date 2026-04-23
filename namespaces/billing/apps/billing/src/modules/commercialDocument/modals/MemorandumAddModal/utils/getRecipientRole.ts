export const getRecipientRole = (recipient?: {
  roleType?: string
}): string | undefined =>
  recipient ? recipient.roleType ?? 'Company' : undefined
