// eslint-disable-next-line import/no-extraneous-dependencies
import { getWorkspaceRoot } from '@toptal/davinci-engine/src/utils/index.js'

export const packagePath = process.cwd()
export const workspaceRootPath = getWorkspaceRoot()
export const jestConfigFileName = 'jest.specs.js'
export const pactConfigFileName = 'jest.pact.js'
export const gqlFilesWatchPattern = 'src/**/data/*.gql.ts'
