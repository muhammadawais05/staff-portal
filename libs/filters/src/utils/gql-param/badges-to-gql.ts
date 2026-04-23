import { LogicOperator } from '../../types'

export const badgesToGql = <T extends Partial<{ logic?: string | null }>>(
  badges: unknown[][],
  logic: string = LogicOperator.AND
): T => {
  const badgesVariables = Object.entries(badges).reduce(
    (acc, [name, values]) => ({
      ...acc,
      [name]: values
    }),
    {}
  )

  return {
    ...badgesVariables,
    logic: logic.toUpperCase() as LogicOperator
  } as T
}
