export const convertContactToItem = (contact: {
  id: string
  fullName: string
}) => ({
  value: contact.id,
  text: contact.fullName
})
