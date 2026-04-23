import { useNavigate, windowOpen, TargetValue } from '@staff-portal/navigation'
import React, { ReactNode } from 'react'
import { UrlWithMessages } from '@staff-portal/graphql/staff'
import { concatMessages } from '@staff-portal/data-layer-service'
import { useNotifications } from '@staff-portal/error-handling'

import LazyLinkWrapper, {
  Props as LazyLinkWrapperProps
} from '../../../LazyLinkWrapper'
import { useGetLazyLink } from '../../data'
import {
  GetLazyLinkQuery,
  GetLazyLinkVariables,
  RenderProps
} from '../../types'
import { checkNodeTypeMismatch } from '../../utils'

export type Props = Omit<LazyLinkWrapperProps, 'link'> & {
  initialLink?: UrlWithMessages | null
  getLazyLinkVariables: GetLazyLinkVariables
  target?: TargetValue
  onSuccess?: () => void
  onFail?: (errorMessage?: string) => void
  onSettled?: () => void
}

export const useRenderLazyLink = ({
  initialLink,
  getLazyLinkVariables,
  target,
  onSuccess,
  onFail,
  onSettled,
  ...props
}: Props) => {
  const { showError } = useNotifications()
  const navigate = useNavigate()

  const extractLink = (data?: GetLazyLinkQuery) => {
    return data?.node?.[getLazyLinkVariables.propertyName]
  }

  const handleFail = (errorMessage?: string) => {
    if (onFail) {
      onFail(errorMessage)
    } else {
      showError(errorMessage || 'This link cannot be used at this moment.')
    }
  }

  const [getLazyLink, { data, loading }] = useGetLazyLink(
    getLazyLinkVariables,
    {
      onCompleted: newData => {
        checkNodeTypeMismatch(newData, getLazyLinkVariables)

        const link = extractLink(newData)

        if (link?.url) {
          if (target) {
            windowOpen(link.url, target)
          } else {
            navigate(link.url)
          }

          onSuccess?.()
        } else {
          handleFail(concatMessages(link?.messages))
        }

        onSettled?.()
      },
      onError: error => {
        handleFail(error?.message)
        onSettled?.()
      }
    }
  )

  const currentLink = extractLink(data) || (initialLink ?? undefined)

  return (children: (renderProps: RenderProps) => ReactNode) => (
    <LazyLinkWrapper link={currentLink} {...props}>
      {children({
        disabled: !currentLink?.url,
        checkLink: getLazyLink,
        loading
      })}
    </LazyLinkWrapper>
  )
}
