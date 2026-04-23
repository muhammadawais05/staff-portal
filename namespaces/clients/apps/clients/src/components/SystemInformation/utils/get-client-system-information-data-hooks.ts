import {
  getClientReviewLinkHook,
  getClientInterestedInHook,
  getClientHowDidYouHearHook,
  getClientHowDidYouHearDetailsHook
} from '.'

export const getClientSystemInformationDataHooks = (clientId: string) => ({
  useClientReviewLink: getClientReviewLinkHook(clientId),
  useClientInterestedIn: getClientInterestedInHook(clientId),
  useClientHowDidYouHear: getClientHowDidYouHearHook(clientId),
  useClientHowDidYouHearDetails: getClientHowDidYouHearDetailsHook(clientId)
})
