import { interpolateTemplate } from './interpolateTemplate'

describe('interpolateTemplate', () => {
  it.each([
    [
      'interpolates undefined template as empty string',
      undefined,
      '',
      undefined
    ],
    [
      'leaves missing variables untouched',
      'test {test}',
      'test {test}',
      undefined
    ],
    [
      'interpolates variables properly',
      'test {test}',
      'test abc',
      { test: 'abc' }
    ]
    // eslint-disable-next-line max-params
  ])('%s', (_, template, expectedResult, replacements) => {
    const interpolatedMessage = interpolateTemplate(template, replacements)

    expect(interpolatedMessage).toStrictEqual(expectedResult)
  })
})
