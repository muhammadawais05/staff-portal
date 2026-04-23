export type AsyncTooltipWrapperDataHookOptions = {
  skip: boolean
  fetchPolicy: 'cache-first'
}

export type TooltipContentRenderer<TData> = (
  data?: TData,
  loading?: boolean
) => JSX.Element | null | undefined | boolean
