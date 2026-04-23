import path from 'path'
import { Pact } from '@pact-foundation/pact'

// eslint-disable-next-line import/no-extraneous-dependencies
const { getWorkspaceRoot } = require('@toptal/davinci-engine/src/utils')

const workspaceRootPath = getWorkspaceRoot()

// when running on CI, put pacts to repo root
const pactsDir = process.env.CI
  ? path.resolve(workspaceRootPath, 'pacts')
  : path.resolve(process.cwd(), 'pacts')

export const createGQLGatewayGraphQLProvider = ({ port }: { port: number }) =>
  new Pact({
    port: port,
    cors: true,
    consumer: 'Staff Portal',
    provider: 'GQL Gateway',
    dir: pactsDir,
    log: path.resolve(process.cwd(), 'logs/gql_gateway_pact.log'),
    logLevel: 'error',
    pactfileWriteMode: 'merge'
  })
