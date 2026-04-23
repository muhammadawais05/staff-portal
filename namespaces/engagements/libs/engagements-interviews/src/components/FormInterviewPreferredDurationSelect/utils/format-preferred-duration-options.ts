export const formatPreferredDurationsOptions = (items: string[]) =>
  items.map(item => ({
    value: item,
    text: `${item.split('_')[1]} minutes`
  }))
