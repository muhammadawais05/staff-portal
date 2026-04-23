import { Menu } from '@toptal/picasso'
import React, { SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Maybe } from '@staff-portal/graphql/staff'

import ActionsItem from '../ActionsItem'
import { OperationItemFragment } from '../../../../__fragments__/operationItemFragment.graphql.types'
import * as OperationHelpers from '../../../../_lib/helpers/operations'
import { urlActions, getHref } from '../../utils'
import * as styles from './styles'
import { TKey } from '../../../../utils/i18n'
import en from '../../../../translations/en'

const displayName = 'ActionsList'

export type TranslationCode =
  | 'invoice'
  | 'payment'
  | 'memorandum'
  | 'paymentGroup'

interface Props {
  nodeId?: string
  translationCode: Extract<TKey, TranslationCode>
  /**
   * @deprecated https://toptal-core.atlassian.net/browse/SPB-1354
   */
  documentNumber?: Maybe<number>
  handleOnClick: (e: SyntheticEvent<HTMLElement, Event>) => void
  operations: Record<string, OperationItemFragment | string>
  downloadHtmlUrl?: Maybe<string>
  downloadPdfUrl?: Maybe<string>
  webResource?: Maybe<{ url?: Maybe<string> }>
  actionItems: string[]
}

const Actions = ({
  actionItems = [],
  nodeId,
  translationCode,
  documentNumber,
  downloadHtmlUrl,
  downloadPdfUrl,
  handleOnClick,
  operations = {},
  webResource
}: Props) => {
  const { t: translate } = useTranslation(translationCode)

  return (
    // TODO: workaround until
    // https://toptal-core.atlassian.net/browse/FX-1657 is implemented
    <Menu data-testid={displayName} css={styles.menuWidth}>
      {actionItems.map(option => {
        if (
          OperationHelpers.isCallableHidden(
            (operations[option] as OperationItemFragment)?.callable
          )
        ) {
          return null
        }

        const isUrlAction = urlActions.includes(option)
        const hrefUrl = isUrlAction
          ? getHref({
              option,
              downloadHtmlUrl,
              downloadPdfUrl,
              webResource
            })
          : undefined
        const operation = isUrlAction ? undefined : operations[option]
        const target =
          (isUrlAction && option === 'downloadHtmlUrl' && '_blank') || undefined

        return (
          <ActionsItem
            documentNumber={documentNumber}
            handleOnClick={handleOnClick}
            href={hrefUrl}
            isUrlAction={isUrlAction}
            key={option}
            label={translate(
              `actions.${
                option as keyof typeof en[TranslationCode]['actions']
              }` as const
            )}
            nodeId={nodeId}
            operation={operation as OperationItemFragment}
            option={option}
            target={target}
          />
        )
      })}
    </Menu>
  )
}

Actions.displayName = displayName

export default Actions
