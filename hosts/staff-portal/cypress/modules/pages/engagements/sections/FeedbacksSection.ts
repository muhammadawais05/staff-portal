import ClientFeedback from '../components/ClientFeedback'
import FeedbackDetails from '../components/FeedbackDetails'
import MatcherFeedback from '../components/MatcherFeedback'

class FeedbacksSection {
  feedbackDetails = new FeedbackDetails()
  clientFeedback = new ClientFeedback()
  matcherFeedback = new MatcherFeedback()
}

export default FeedbacksSection
