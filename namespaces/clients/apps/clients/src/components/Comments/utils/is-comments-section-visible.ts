import { Entry } from '@staff-portal/chronicles'

export type CommentsInfo = {
  loadingAccessInfo: boolean
  areCommentsAccessible: boolean
  loadingComments: boolean
  comments: Entry[]
}

const isCommentsVisible = ({
  loadingAccessInfo,
  areCommentsAccessible,
  loadingComments,
  comments
}: CommentsInfo) => {
  const isAccessible = loadingAccessInfo || areCommentsAccessible
  const isDataAvailable = loadingComments || !!comments.length

  return isAccessible && isDataAvailable
}

export default isCommentsVisible
