import React from 'react'
import { fireEvent, screen, render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { waitFor } from '@toptal/picasso/test-utils'
import { Route, Router } from '@staff-portal/navigation'

import { useQueryParamsState } from './use-query-params-state'
import { QueryParams, QueryParamsOptions } from '../../types'

type TestQueryParams = { value: string }
type TestComponentProps = {
  newUrlValues?: TestQueryParams
  configuration?: QueryParamsOptions
  normalize?: (values: QueryParams) => QueryParams
}
const TestComponent = ({
  newUrlValues,
  configuration,
  normalize
}: TestComponentProps) => {
  const [urlValues, setUrlValues] = useQueryParamsState<TestQueryParams>(
    configuration,
    normalize
  )

  return (
    <>
      <div data-testid='url-values'>
        {urlValues ? JSON.stringify(urlValues) : null}
      </div>
      {newUrlValues && (
        <button
          data-testid='set-new-URL-values'
          onClick={() => setUrlValues(newUrlValues)}
        />
      )}
    </>
  )
}

const arrangeTest = ({
  initialEntries = [''],
  newUrlValues,
  configuration,
  normalize
}: {
  initialEntries?: string[]
  newUrlValues?: TestQueryParams
  configuration?: QueryParamsOptions
  normalize?: (values: QueryParams) => QueryParams
}) => {
  const history = createMemoryHistory({ initialEntries })

  history.push = jest.fn().mockImplementation(history.push)

  render(
    <Router history={history}>
      <Route path='/' exact>
        <TestComponent
          newUrlValues={newUrlValues}
          configuration={configuration}
          normalize={normalize}
        />
      </Route>
    </Router>
  )

  return { history }
}

describe('useQueryParamsState() hook', () => {
  it('reads query parameters', async () => {
    const NEW_VALUE = 'a93nd7'

    arrangeTest({ initialEntries: [`?value=${NEW_VALUE}`] })
    await waitFor(() => {
      expect(screen.getByTestId('url-values').textContent).toBe(
        `{"value":"${NEW_VALUE}"}`
      )
    })
  })

  it('writes query parameters', async () => {
    const NEW_VALUE = 'an38pa'
    const { history } = arrangeTest({
      newUrlValues: { value: NEW_VALUE }
    })

    fireEvent.click(await screen.findByTestId('set-new-URL-values'))
    await waitFor(() => {
      expect(history.location.search).toBe(`?value=${NEW_VALUE}`)
    })
  })

  describe('url hashes', () => {
    it('preserves the hash along with value', async () => {
      const NEW_VALUE = 'an38pa'
      const HASH = '#some-hash-thats-already-there'
      const { history } = arrangeTest({
        newUrlValues: { value: NEW_VALUE },
        initialEntries: [HASH]
      })

      fireEvent.click(await screen.findByTestId('set-new-URL-values'))
      await waitFor(() => {
        expect(history.location.hash).toEqual(HASH)
        expect(history.location.search).toBe(`?value=${NEW_VALUE}`)
      })
    })
  })

  describe('when navigation is triggered by browser', () => {
    it('resolves (decodes) query parameters from URL and returns them', async () => {
      const valueDecoder = jest
        .fn()
        .mockImplementation(
          (value: string) => new Promise(resolve => resolve(`${value}-decoded`))
        )

      const INITIAL_VALUE = 'oh2a0a'
      const NEW_VALUE = 'def'
      const configuration = {
        value: { encode: (value: string) => value, decode: valueDecoder }
      }

      const { history } = arrangeTest({
        initialEntries: [`?value=${INITIAL_VALUE}`],
        newUrlValues: { value: NEW_VALUE },
        configuration
      })

      fireEvent.click(await screen.findByTestId('set-new-URL-values'))
      await waitFor(() => {
        expect(history.location.search).toBe(`?value=${NEW_VALUE}`)
      })

      history.goBack()

      await waitFor(() => {
        expect(valueDecoder).toHaveBeenCalledWith(
          INITIAL_VALUE,
          { value: INITIAL_VALUE },
          configuration
        )
        expect(history.location.search).toBe(`?value=${INITIAL_VALUE}`)
        expect(screen.getByTestId('url-values').textContent).toBe(
          `{"value":"${`${INITIAL_VALUE}-decoded`}"}`
        )
      })
    })
  })

  describe('when navigation is triggered by existed sanitized values', () => {
    it('writes sanitized parameters to URL', async () => {
      const valueEncoder = jest
        .fn()
        .mockImplementation((value: string) => `${value}-encoded`)
      const valueSanitizer = jest
        .fn()
        .mockImplementation((value: string) => value.replace(/[^0-9]/g, ''))
      const valueDecoder = jest
        .fn()
        .mockImplementation(
          (value: string) => new Promise(resolve => resolve(value))
        )

      const ENCODED_VALUE = 'a1h23c4ka5'
      const SANITIZED_VALUE = '12345'
      const { history } = arrangeTest({
        initialEntries: [`?value=${ENCODED_VALUE}`],
        configuration: {
          value: {
            encode: valueEncoder,
            sanitize: valueSanitizer,
            decode: valueDecoder
          }
        }
      })

      await waitFor(() => {
        expect(valueSanitizer).toHaveBeenCalledTimes(1)
        expect(valueSanitizer).toHaveBeenCalledWith(ENCODED_VALUE)
        expect(valueDecoder).toHaveBeenCalledTimes(1)
        expect(valueDecoder).toHaveBeenCalledWith(
          SANITIZED_VALUE,
          { value: SANITIZED_VALUE },
          expect.anything()
        )
        expect(valueEncoder).toHaveBeenCalledTimes(0)
        expect(history.push).toHaveBeenCalledWith(`/?value=${SANITIZED_VALUE}`)
      })
    })
  })

  describe('when there are no sanitized values', () => {
    it('does not write sanitized parameters to URL', async () => {
      const valueEncoder = jest
        .fn()
        .mockImplementation((value: string) => `${value}-encoded`)
      const valueSanitizer = jest
        .fn()
        .mockImplementation((value: string) => value.replace(/[^0-9]/g, ''))
      const valueDecoder = jest
        .fn()
        .mockImplementation(
          (value: string) => new Promise(resolve => resolve(value))
        )

      const ENCODED_VALUE = '12345'
      const { history } = arrangeTest({
        initialEntries: [`?value=${ENCODED_VALUE}`],
        configuration: {
          value: {
            encode: valueEncoder,
            sanitize: valueSanitizer,
            decode: valueDecoder
          }
        }
      })

      await waitFor(() => {
        expect(valueSanitizer).toHaveBeenCalledTimes(1)
        expect(valueSanitizer).toHaveBeenCalledWith(ENCODED_VALUE)
        expect(valueDecoder).toHaveBeenCalledTimes(1)
        expect(valueDecoder).toHaveBeenCalledWith(
          ENCODED_VALUE,
          { value: ENCODED_VALUE },
          expect.anything()
        )
        expect(valueEncoder).toHaveBeenCalledTimes(0)
        expect(history.push).toHaveBeenCalledTimes(0)
      })
    })
  })

  describe('when there are no sanitizers for values', () => {
    it('does not write sanitized parameters to URL', async () => {
      const valueEncoder = jest
        .fn()
        .mockImplementation((value: string) => `${value}-encoded`)
      const valueDecoder = jest
        .fn()
        .mockImplementation(
          (value: string) => new Promise(resolve => resolve(value))
        )

      const ENCODED_VALUE = '12345'
      const { history } = arrangeTest({
        initialEntries: [`?value=${ENCODED_VALUE}`],
        configuration: {
          value: {
            encode: valueEncoder,
            decode: valueDecoder
          }
        }
      })

      await waitFor(() => {
        expect(valueDecoder).toHaveBeenCalledTimes(1)
        expect(valueDecoder).toHaveBeenCalledWith(
          ENCODED_VALUE,
          { value: ENCODED_VALUE },
          expect.anything()
        )
        expect(valueEncoder).toHaveBeenCalledTimes(0)
        expect(history.push).toHaveBeenCalledTimes(0)
      })
    })
  })

  describe('when there is a normalizer for values', () => {
    it('writes normalized values to URL', async () => {
      const normalizer = jest.fn().mockImplementation(({ query_value }) => ({
        value: query_value
      }))
      const ENCODED_VALUE = 'abc'

      const { history } = arrangeTest({
        initialEntries: [`?query_value=${ENCODED_VALUE}`],
        normalize: normalizer
      })

      await waitFor(() => {
        expect(normalizer).toHaveBeenCalledTimes(1)
        expect(normalizer).toHaveBeenCalledWith({ query_value: ENCODED_VALUE })
        expect(history.push).toHaveBeenCalledTimes(1)
        expect(history.push).toHaveBeenCalledWith(`/?value=${ENCODED_VALUE}`)
      })
    })
  })

  describe('when navigation is triggered by calling a hook callback', () => {
    it('encodes query parameters and writes them to URL', async () => {
      const valueEncoder = jest
        .fn()
        .mockImplementationOnce((value: string) => `${value}-encoded`)

      const NEW_VALUE = 'ahc4ka'
      const { history } = arrangeTest({
        newUrlValues: { value: NEW_VALUE },
        configuration: {
          value: {
            encode: valueEncoder,
            decode: (value: string) =>
              new Promise(resolve => resolve(`${value}-decoded`))
          }
        }
      })

      fireEvent.click(await screen.findByTestId('set-new-URL-values'))
      await waitFor(() => {
        expect(valueEncoder).toHaveBeenCalledWith(NEW_VALUE)
        expect(history.location.search).toBe(
          `?value=${`${NEW_VALUE}-encoded`}`
        )
      })
    })
  })
})
