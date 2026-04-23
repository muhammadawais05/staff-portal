// TODO: remove this when https://github.com/turt2live/node-email-reply-parser/pull/25 is merged
declare module 'node-email-reply-parser' {
  interface Fragment {
    getContent: () => string
    isSignature: () => boolean
    isQuoted: () => boolean
    isHidden: () => boolean
    isEmpty: () => boolean
  }

  interface Email {
    getFragments: () => Fragment[]
    getVisibleText: () => string
  }

  const replyParser: (emailContent: string) => Email

  export = replyParser
}
