import { configure } from '@testing-library/dom'

jest.setTimeout(10000)

configure({
  asyncUtilTimeout: 4500
})
