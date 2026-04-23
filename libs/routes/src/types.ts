import {
  RoutePath,
  RouteAvailability,
  CompanyTabUrlHash,
  JobTabUrlHash,
  OpportunityTabUrlHash,
  CommunityLeaderTabUrlHash,
  RouteExperimentKey,
  StaffTabUrlHash
} from './enums'

type BaseRoute = {
  path: RoutePath | RoutePath[]
  cucumberMode?: boolean
}

export type DevelopmentRoute = BaseRoute & {
  availability: RouteAvailability.IN_DEVELOPMENT
}

export type BetaRoute = BaseRoute & {
  availability: RouteAvailability.BETA
  experimentsKey: RouteExperimentKey
}

export type ReleasedRoute = BaseRoute & {
  availability: RouteAvailability.RELEASED
}

export type Route = DevelopmentRoute | BetaRoute | ReleasedRoute

export type RouteType<TParameters> = {
  path: string
  parameters?: TParameters
}

export type RouteParametersOf<M> = M extends RouteType<infer TParameters>
  ? TParameters
  : never

export type PathRewriteRuleOptions = {
  pathname: string
  search: string
  hash: string
}

export type PathRewriteRule = (
  options: PathRewriteRuleOptions
) => string | undefined

type ValueOrArrayOfValues<T> = T | T[]

/**
 * @deprecated use `NavigationTabsList` instead
 */
export type HashTabConfig = {
  label: string
  node: React.ReactNode
  tabHash:
    | ValueOrArrayOfValues<CompanyTabUrlHash>
    | ValueOrArrayOfValues<JobTabUrlHash>
    | ValueOrArrayOfValues<OpportunityTabUrlHash>
    | ValueOrArrayOfValues<CommunityLeaderTabUrlHash>
    | ValueOrArrayOfValues<StaffTabUrlHash>
  icon?: React.ReactElement
}
