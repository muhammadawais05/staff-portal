// eslint-disable-next-line import/no-extraneous-dependencies
import { getWorkspaceRoot } from '@toptal/davinci-engine/src/utils/index.js'
import fs from 'fs'
import path from 'path'

export const workspaceRootPath = getWorkspaceRoot()
export const packagePath = process.cwd()
export const packageLocation = path.relative(workspaceRootPath, packagePath)
export const packageJson = JSON.parse(
  fs.readFileSync(`${packagePath}/package.json`).toString()
)
export const packageName = packageJson.name
