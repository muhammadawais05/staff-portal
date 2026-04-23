export const CommentQueryParam = {
  decode: (comments: string | undefined) => comments === 'true',
  encode: (showComments: boolean) => (showComments ? 'true' : undefined)
}
