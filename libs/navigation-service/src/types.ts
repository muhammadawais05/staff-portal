import { IParseOptions, IStringifyOptions } from 'qs'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QueryStringParams = Record<string, any>

export type URLType = URL

export type ObjectToQueryStringOptions = IStringifyOptions
export type QueryStringToObjectOptions = IParseOptions & { decoder?: never }
export type TargetValue = '_blank' | '_self' | '_parent' | '_top'
