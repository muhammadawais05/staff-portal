import { StoreObject } from '@apollo/client/cache'

import { get } from './get'

export const keyFields =
  (keysOrPaths: string[], atLeastOne = false) =>
  (object: Readonly<StoreObject>, context: object) => {
    let found = false
    const result = keysOrPaths
      .reduce((acc, keyOrPath) => {
        const value = get(object, keyOrPath) as string

        if (value === undefined) {
          if (!atLeastOne) {
            throw new Error(
              `Mandatory key '${keyOrPath}' is not defined for object with keys ${JSON.stringify(
                Object.keys(object)
              )} and context ${JSON.stringify(context)}`
            )
          }
        } else {
          found = true
        }

        return value === undefined ? acc : [...acc, value]
      }, [] as string[])
      .join('+')

    if (!found) {
      throw new Error(
        `Non of optional keys '${JSON.stringify(
          keysOrPaths
        )}' defined for object with keys ${JSON.stringify(
          Object.keys(object)
        )} and context ${JSON.stringify(context)}`
      )
    }

    return result
  }
