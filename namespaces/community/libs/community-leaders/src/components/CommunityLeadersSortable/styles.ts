import { palette } from '@toptal/picasso/utils'

export const cursorPointer = `
	cursor: move; /* fallback if grab cursor is unsupported */
	cursor: grab;
	cursor: -moz-grab;
	cursor: -webkit-grab;
`

export const floating = `	
	box-shadow: -1px 0 15px 0 rgba(34, 33, 81, 0.01), 0px 15px 15px 0 rgba(34, 33, 81, 0.25);
	cursor: grabbing;
	cursor: -moz-grabbing;
	cursor: -webkit-grabbing;
`

export const dragging = `
	background-color: ${palette.grey.lighter};
	border: 1px dashed ${palette.blue.main};

	> * {
		opacity: 0;
	}
	
`

export const removing = `
	opacity: 0.5;
	pointer-events: none;
`

export const sortingIconHolder = `
	border-radius: 9999px;
	height: 1.25rem;
	width: 1.25rem;
	background-color: ${palette.common.white};
	border: 1px solid ${palette.grey.light2};
	display: flex;
	align-items: center;
	justify-content: center;
`

export const sortingIcon = `
	transform: scale(0.65);

	path {
		fill: ${palette.grey.dark};
	}
`
