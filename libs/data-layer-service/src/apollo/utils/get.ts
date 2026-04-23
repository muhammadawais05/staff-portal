/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * In BFA there is lodash.get, no reason to add lodash dependency to SP for now,
 * https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_get
 */
export const get = (object: any, path: string, defaultValue = undefined) => {
  const travel = (regexp: any) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (res, key) => (res !== null && res !== undefined ? res[key] : res),
        object
      )
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/)

  return result === undefined || result === object ? defaultValue : result
}
