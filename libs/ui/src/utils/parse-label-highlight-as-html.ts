/**
 * We need to prepare title string based on label and labelHighlight.
 * LabelHighlight has priority over Label.
 * LabelHighlight comes in following format: {{strong}}text{{/strong}}text{{strong}}text{{/strong}}
 * Idea is to just replace {{ and }} with html tag < and >
 */
export const parseLabelHighlightAsHtml = (labelHighlight: string) =>
  labelHighlight.replace(/{{/g, '<').replace(/}}/g, '>')
