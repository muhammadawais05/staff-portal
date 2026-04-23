const DEFAULT_FORM_NAME = 'default'

export const getFormStoreKey = (
  nodeId: string,
  formName = DEFAULT_FORM_NAME
) => {
  return `${nodeId}__${formName}`
}
