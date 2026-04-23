import { Matchers } from '@pact-foundation/pact'

const { term, iso8601DateTime, iso8601Date } = Matchers

export const pactMatchers = {
  id: () =>
    term({ generate: 'VjEtTWVSb2xlLTEyMjc4ODQ', matcher: '[A-Za-z0-9/=]{4,}' }),
  date: () => iso8601Date('2017-05-03'),
  time: () => iso8601DateTime('2017-05-03T08:04:22-07:00'),
  oneOf: (value: string, array: string[]) =>
    term({ generate: value, matcher: array.join('|') })
}
