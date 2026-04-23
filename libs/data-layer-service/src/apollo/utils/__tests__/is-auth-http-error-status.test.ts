import { HttpErrorStatusCode } from '../../enums'
import { isAuthHttpErrorStatusCode } from '../is-auth-http-error-status'

describe('isAuthHttpErrorStatusCode', () => {
  it('gives false', () => {
    expect(isAuthHttpErrorStatusCode(0)).toBeFalsy()
    expect(
      isAuthHttpErrorStatusCode(HttpErrorStatusCode.INTERNAL_SERVER_ERROR)
    ).toBeFalsy()
  })

  it('gives true', () => {
    expect(
      isAuthHttpErrorStatusCode(HttpErrorStatusCode.UNAUTHORIZED)
    ).toBeTruthy()
  })
})
