interface Answer {
  comment?: string | null
  label?: string | null
  value?: string[] | null
}

export const formatNoteAnswer = ({ value: values, label, comment }: Answer) => {
  const value = values?.join(', ')
  const valueAndLabel = [value, label].filter(Boolean).join(' - ')

  return [valueAndLabel, comment].filter(Boolean).join('. ')
}
