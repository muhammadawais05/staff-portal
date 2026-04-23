import {
  getEditCompanyRepresentativePath,
  getEmailTemplatePath
} from './get-paths'
import generateRoutePath from '../generate-route-path'

jest.mock('../generate-route-path')

const generateRoutePathMock = generateRoutePath as jest.Mock

describe('get-paths', () => {
  describe('getEditCompanyRepresentativePath', () => {
    it('passes arguments to generate route path and returns proper path', () => {
      const PATH = Symbol()
      const ID = Symbol() as unknown as string
      const RETURN_PATH = Symbol() as unknown as string

      generateRoutePathMock.mockReturnValueOnce(PATH)

      const result = getEditCompanyRepresentativePath(ID, RETURN_PATH)

      expect(result).toBe(PATH)
      expect(generateRoutePathMock).toHaveBeenCalledWith(
        { path: '/company_representatives/:id(\\d+):_?/edit' },
        { searchParams: { return_path: RETURN_PATH }, parameters: { id: ID } }
      )
    })
  })

  describe('getEmailTemplatePath', () => {
    it('passes arguments to generate route path and returns proper path', () => {
      const PATH = Symbol()
      const ID = Symbol() as unknown as string

      generateRoutePathMock.mockReturnValue(PATH)

      const result = getEmailTemplatePath(ID)

      expect(result).toBe(PATH)
      expect(generateRoutePathMock).toHaveBeenCalledWith(
        { path: '/email_templates/:id(\\d+):_?' },
        { parameters: { id: ID } }
      )
    })
  })
})
