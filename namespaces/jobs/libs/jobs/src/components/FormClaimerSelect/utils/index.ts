export const matcherTeamName = (nodes: { id: string; name: string }[]) =>
  nodes[0] ? ` (${nodes[0].name})` : ''
