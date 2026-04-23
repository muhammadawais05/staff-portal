import { isForbiddenHttpErrorStatusCode } from '../is-forbidden-http-error-status-code'
import { HttpErrorStatusCode } from '../../enums/HttpErrorStatusCode'

describe('isForbiddenHttpErrorStatusCode', () => {
  it('gives false', () => {
    expect(isForbiddenHttpErrorStatusCode(0)).toBeFalsy()
    expect(
      isForbiddenHttpErrorStatusCode(HttpErrorStatusCode.INTERNAL_SERVER_ERROR)
    ).toBeFalsy()
  })

  it('gives true', () => {
    expect(
      isForbiddenHttpErrorStatusCode(HttpErrorStatusCode.FORBIDDEN)
    ).toBeTruthy()
  })
})
