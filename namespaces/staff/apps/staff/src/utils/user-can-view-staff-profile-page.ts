export const userCanViewStaffProfile = (
  staffProfile?: { webResource: { url?: string | null } } | null
) => staffProfile?.webResource?.url !== null
