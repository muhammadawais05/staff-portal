// TODO: Add .eslint config to allow these usages in this package
// eslint-disable-next-line no-restricted-imports
export { RouteContext } from '@topkit/router'
// eslint-disable-next-line no-restricted-imports
export type { Route as RouteType, RouteData } from '@topkit/router'
// eslint-disable-next-line no-restricted-imports
export { Link, useNavigate } from '@topkit/react-router'

export {
  addQueryParams,
  createUrl,
  navigateExternallyTo,
  windowOpen,
  getUrl,
  getHostName,
  getOrigin,
  reloadPage,
  getLocationPathname,
  getLocationSearch,
  getLocationHash,
  objectToQueryString,
  queryStringToObject,
  setQueryParams,
  getQueryParams,
  isAbsoluteUrlWithoutProtocol
} from './utils'

export { useQueryParams, useRefetchOnPathChange } from './hooks'

export {
  DEFAULT_OBJECT_TO_QUERY_STRING_OPTIONS,
  DEFAULT_QUERY_STRING_TO_OBJECT_OPTIONS
} from './constants'

export type { QueryStringParams, URLType, TargetValue } from './types'

// eslint-disable-next-line no-restricted-imports
export {
  useLocation,
  useHistory,
  useParams,
  useRouteMatch,
  withRouter,
  generatePath,
  matchPath,
  Router,
  Route,
  Switch,
  MemoryRouter,
  Redirect,
  BrowserRouter,
  RedirectProps,
  Link as RouterLink
} from 'react-router-dom'
// eslint-disable-next-line no-restricted-imports
export type {
  RouteComponentProps,
  RouteProps,
  MemoryRouterProps
} from 'react-router-dom'
