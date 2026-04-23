import { Response as FetchResponse } from 'node-fetch'
import { ServerError } from '@apollo/client'

const createServerError = () => {
  const serverError: ServerError = {
    response: new FetchResponse('error') as unknown as Response,
    result: {},
    statusCode: 500,
    name: 'ServerError',
    message: 'Server error occurred'
  }

  return serverError
}

export default createServerError
