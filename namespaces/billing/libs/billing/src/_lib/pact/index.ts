import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  DocumentNode
} from '@apollo/client'
import { Matchers, Pact } from '@pact-foundation/pact'
import { print } from 'graphql/language/printer'
import { setContext } from '@apollo/client/link/context'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'cross-fetch/polyfill'
import path from 'path'

// eslint-disable-next-line import/no-extraneous-dependencies
const { getWorkspaceRoot } = require('@toptal/davinci-engine/src/utils')

const workspaceRootPath = getWorkspaceRoot()

// when running on CI, put pacts to repo root
const pactsDir = process.env.CI
  ? path.resolve(workspaceRootPath, 'pacts')
  : path.resolve(process.cwd(), 'pacts')

const { term } = Matchers

// Cache canonicalization was disabled by default in @apollo/client@3.4.14.
// Enable it on the cache level to not break anything.
const inMemoryCacheConfig = { canonizeResults: true }

export const createClient = (link: ApolloLink) =>
  new ApolloClient({
    cache: new InMemoryCache(inMemoryCacheConfig),
    defaultOptions: {
      query: { fetchPolicy: 'network-only' },
      watchQuery: { fetchPolicy: 'network-only' }
    },
    link,
    resolvers: {}
  })

const createGatewayGraphQLProvider = ({ port }: { port: number }) =>
  new Pact({
    consumer: 'Billing Frontend',
    cors: true,
    dir: pactsDir,
    log: path.resolve(process.cwd(), 'logs/gateway.log'),
    logLevel: 'error',
    pactfileWriteMode: 'merge',
    port,
    provider: 'GQL Gateway'
  })

export const setupGatewayStaffPactIntegration = () => {
  const provider = createGatewayGraphQLProvider({ port: 5021 })

  const httpLink = createHttpLink({
    fetch,
    uri: 'http://localhost:5021/staff/graphql'
  })

  jest.setTimeout(30000)

  const authLink = setContext((_, { headers }) => {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers
      }
    }
  })

  const client = createClient(authLink.concat(httpLink))

  beforeAll(() => provider.setup())
  afterAll(() => provider.finalize())
  // verify with Pact and reset expectations
  afterEach(async () => {
    await provider.verify()
    await client.cache.reset()
  })

  return { client, provider }
}

export const gatewayHeaders = {
  headers: {
    'content-type': 'application/json'
  },
  method: 'POST' as const,
  path: '/staff/graphql' as string
}

export const serializeQuery = (query: DocumentNode) => {
  const cache = new InMemoryCache(inMemoryCacheConfig)

  return print(cache.transformDocument(query))
}

export const ID = (id?: string) => {
  return term({
    generate: id || 'VjEtTWVSb2xlLTEyMjc4ODQ',
    matcher: '[A-Za-z0-9]{4,24}'
  })
}

export const GID = (gid?: string) => {
  return term({
    generate: gid || 'gid://platform/Engagement/1',
    matcher: 'gid:\\/\\/platform\\/Engagement\\/\\d+'
  })
}

export const BILLING_CYCLE_GID = (gid?: string) => {
  return term({
    generate: gid || 'gid://platform/Billing::Cycle/357262',
    matcher: 'gid:\\/\\/platform\\/Billing::Cycle\\/\\d{1,10}'
  })
}

export const INVOICE_GID = (gid?: string) => {
  return term({
    generate: gid || 'gid://billing/Invoice/589040',
    matcher: 'gid:\\/\\/(billing|platform)\\/Invoice\\/\\d{1,10}'
  })
}

export const URL = (url?: string) => {
  return term({
    generate: url || 'https://staging.toptal.net/',
    matcher: '^https?:\\/\\/(.|\\\\w)+'
  })
}

export const DATE = (date?: string) => {
  return term({
    generate: date || '2021-08-20',
    matcher: '[0-9]{4}-[0-9]{2}-[0-9]{2}'
  })
}

export const AMOUNT = (amount?: string) => {
  return term({
    generate: amount || '3620.0',
    matcher: '[0-9]{1,24}.?[0-9]{0,2}'
  })
}

export const CALLABLE = (callable?: string) => {
  return term({
    generate: callable || 'ENABLED',
    matcher: '(DISABLED|ENABLED|HIDDEN)'
  })
}

export const MEMO_CATEGORIES = (categories?: string) => {
  return term({
    generate: categories || 'Start date',
    matcher:
      '(|Start date|End date|Engagement closed|Talent rate|Company rate|Commitment|Rejected trial|Failed trial|Delete a billing cycle|Update a timesheet|Unsubmit a timesheet|Engagement break created|Engagement break updated|Engagement break removed|Bank Wire Fee|Generic credit|3% discount|Deposit refund|Late fee credit|Intermediary bank wire fee|Tax deduction|Early payment discount|Exchange rate variance|Minimum commitment eligibility changed|MSP/Portal Fees|Unconsolidated Invoice|Customer Rebate Service|Business Development|Relationship|Trial|Prepayment Invoice|Short Payment)'
  })
}
