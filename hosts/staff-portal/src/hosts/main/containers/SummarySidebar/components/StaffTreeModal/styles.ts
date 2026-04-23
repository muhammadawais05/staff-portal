import { css } from 'styled-components'

import { BORDER_OVERLAY_OFFSET_PX } from './config'

export const noContent = css`
  height: 100%;
`

export const treeViewContainer = css`
  position: relative;
  height: calc(100% - 4rem);
  overflow: hidden;
`

export const controlsContainer = css`
  overflow: visible;
`

// prettier-ignore
export const treeViewOverlay = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background:
    linear-gradient(
      90deg,
      white 0%,
      rgb(255 255 255 / 0%) ${BORDER_OVERLAY_OFFSET_PX}px,
      rgb(255 255 255 / 0%) calc(100% - ${BORDER_OVERLAY_OFFSET_PX}px),
      white 100%
    ),
    linear-gradient(
      0deg,
      white 0%,
      rgb(255 255 255 / 0%) ${BORDER_OVERLAY_OFFSET_PX}px,
      rgb(255 255 255 / 0%) calc(100% - ${BORDER_OVERLAY_OFFSET_PX}px),
      white 100%
    );
`
