import { defineDependency } from '@staff-portal/dependency-injector'

import { ModalPathsMap } from './components/ModalsState/ModalsState'

export const BILLING_MODALS_PATH_MAP = defineDependency<ModalPathsMap>()
