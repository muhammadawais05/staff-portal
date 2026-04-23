const TEAM_HEADER_TOP_OFFSET_PX = 40
const TEAM_MEMBER_HEIGHT_PX = 74

const createSelectedOffset = (selectedItemIndex: number) => ({
  x: 0,
  y: TEAM_HEADER_TOP_OFFSET_PX + TEAM_MEMBER_HEIGHT_PX * (selectedItemIndex + 1)
})

export default createSelectedOffset
