import { useQuery, useMutation } from '@apollo/client'
import MockDate from 'mockdate'
import React from 'react'
import { camelCase } from 'lodash-es'
import {
  useDependenciesRegistry,
  DependencyInjector
} from '@staff-portal/dependency-injector'

import fixtures from '../../_fixtures'
import { ModalKey } from '../../@types/types'
import { useStore } from '../../store'
import ModalsState, { ModalPathsMap } from '.'
import renderComponent from '../../utils/tests'
import { BILLING_MODALS_PATH_MAP } from '../../dependencies'

jest.mock('../../_lib/customHooks/useQueryParams', () => ({
  useQueryParams: () => ['test', jest.fn()]
}))
jest.mock('@apollo/client')
jest.mock('../../store')

jest.mock('react', () => ({
  ...(jest.requireActual('react') as object),
  lazy: () => () => <></>
}))

const useQueryMock = useQuery as jest.Mock
const useStoreMock = useStore as jest.Mock
const useMutationMock = useMutation as jest.Mock

useMutationMock.mockImplementation(() => [jest.fn()])

const BillingModalsPathsMap: ModalPathsMap = Object.values(ModalKey).reduce(
  (val, key) => ({
    ...val,
    [key]: () => <div />
  }),
  {} as ModalPathsMap
)

const AppWithModals = () => {
  const registry = useDependenciesRegistry()

  registry.set(BILLING_MODALS_PATH_MAP, BillingModalsPathsMap)

  return (
    <DependencyInjector registry={registry}>
      <ModalsState />
    </DependencyInjector>
  )
}

const render = () => renderComponent(<AppWithModals />)

const getMockByModalNamePrefix = (modalName: string) => {
  switch (modalName.split('-').shift()) {
    case 'invoice':
      return {
        node: fixtures.MockInvoice
      }
    case 'payment':
      return {
        node: fixtures.MockPayment
      }
    case 'commercial':
      return {
        node: fixtures.MockInvoice
      }
  }
}

const descendantModals = [ModalKey.invoiceCollectBadDebt]

const modalNames = Object.keys(ModalKey)
  .map(key => ModalKey[key as keyof typeof ModalKey])
  .filter(it => !descendantModals.includes(it))

describe('ModalsState', () => {
  beforeEach(() => MockDate.set('2019-01-01T19:00:00.000+00:00'))

  afterEach(() => MockDate.reset())

  describe.each(modalNames)('`ModalKey` variations', modalName => {
    it(`render "${modalName}"`, () => {
      const mock = getMockByModalNamePrefix(modalName)

      useQueryMock.mockReturnValue({
        data: mock,
        loading: false
      })
      useStoreMock.mockReturnValue({
        state: {
          modal: {
            modalName,
            options: {
              invoiceId: 'abc123',
              nodeId: 'abc123',
              nodeType: 'invoice',
              notableId: 'abc123',
              notableType: 'invoice',
              memorandumId: 'exampleMemorandumId',
              variant: 'normal'
            },
            props: {
              all: {
                handleNavigateTo: null,
                canMovePrev: false,
                canMoveNext: false
              }
            }
          }
        },
        dispatch: () => {}
      })
      const { getByTestId } = render({})

      expect(
        getByTestId(`ModalsState-${camelCase(modalName)}`)
      ).toBeInTheDocument()
    })
  })

  describe('when its `null`', () => {
    it('default render', () => {
      const consoleWarnMock = jest.fn()

      jest.spyOn(console, 'warn').mockImplementation(consoleWarnMock)

      const modalName = 'abc'

      useStoreMock.mockReturnValue({
        state: {
          modal: {
            modalName,
            options: {}
          }
        }
      })
      const { queryByTestId } = render({})

      expect(queryByTestId(`Modal-${modalName}`)).not.toBeInTheDocument()

      expect(consoleWarnMock).toHaveBeenCalledWith(
        'ModalsState: unknown modal: abc'
      )

      jest.spyOn(console, 'warn').mockReset()
    })
  })
})
