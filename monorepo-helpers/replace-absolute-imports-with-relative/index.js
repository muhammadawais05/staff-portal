#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import * as glob from 'globby'

const processedFolderPath = process.argv[2]
const sourcesGlob = path.join(processedFolderPath, '**', '*.{ts,tsx,js,jsx}')

const aliasToReplace = process.argv[3]
const aliasImportRegExp = new RegExp(aliasToReplace + ".+(?=')", 'gi')

glob
  // Get all files filtered by patter
  .globbySync(sourcesGlob)
  // Map it to an object with content and file path
  .map(file => ({ content: fs.readFileSync(file, 'utf-8'), filePath: file }))
  // Exclude files that doesn't have desired imports
  .filter(file => file.content.match(aliasImportRegExp))
  .map(({ content, filePath }) => {
    let match
    let processedContent = content

    // Replace every absolute import path that matches pattern line by line
    while ((match = processedContent.match(aliasImportRegExp))) {
      const matchString = match[0]
      const filePathRelativeToPackage = path.dirname(
        filePath.substring(path.dirname(processedFolderPath).length)
      )
      const importPathRelativeToPackage = matchString.substring(
        path.dirname(aliasToReplace).length
      )

      let newRelativePath = path.relative(
        filePathRelativeToPackage,
        importPathRelativeToPackage
      )

      // For case when we import by absolute reference file from the same folder
      if (importPathRelativeToPackage.startsWith(filePathRelativeToPackage)) {
        newRelativePath = './' + newRelativePath
      }
      processedContent = processedContent.replace(matchString, newRelativePath)
    }

    return { content: processedContent, filePath }
  })
  .map(({ content, filePath }) => {
    fs.writeFileSync(filePath, content)
  })
