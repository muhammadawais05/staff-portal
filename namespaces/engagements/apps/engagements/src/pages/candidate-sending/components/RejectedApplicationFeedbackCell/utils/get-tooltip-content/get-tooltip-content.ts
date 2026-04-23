type Props = {
  key: string
  tooltips?: { key: string; value: string }[] | null
}

const getTooltipContent = ({ key, tooltips }: Props) =>
  tooltips?.find(item => item.key === key)?.value

export default getTooltipContent
