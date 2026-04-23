import React, { ReactNode } from 'react'
import { PageContentErrorBoundary } from '@staff-portal/error-handling'
import { useDependency } from '@staff-portal/dependency-injector'

import CustomStatusMessagesProvider from './components/CustomStatusMessagesProvider'
import { useCustomStatusMessagesContext } from './contexts'
import Content, { Props as ContentProps } from './components/Content/Content'
import { STATUS_MESSAGES_COMPONENT } from './dependencies'

export interface Props extends ContentProps {
  additionalStatusMessages?: ReactNode
}

const StatusMessagesWithCustom = () => {
  const StatusMessages = useDependency(STATUS_MESSAGES_COMPONENT)
  const { customStatusMessages } = useCustomStatusMessagesContext()

  if (!StatusMessages) {
    return <>{customStatusMessages}</>
  }

  return <StatusMessages customStatusMessages={customStatusMessages} />
}

const ContentWrapper = ({
  children,
  additionalStatusMessages,
  prependContent,
  ...props
}: Props) => (
  <CustomStatusMessagesProvider>
    <Content
      {...props}
      prependContent={
        <>
          {additionalStatusMessages}
          <StatusMessagesWithCustom />
          {prependContent}
        </>
      }
    >
      <PageContentErrorBoundary>{children}</PageContentErrorBoundary>
    </Content>
  </CustomStatusMessagesProvider>
)

export default ContentWrapper
