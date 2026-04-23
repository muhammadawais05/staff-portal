import Default, { Props as DefaultProps } from './components/Default'
import Detailed, { Props as DetailedProps } from './components/Detailed'
import WithFeedback, {
  Props as WithFeedbackProps
} from './components/WithFeedback'
interface EngagementStatusProps {
  Default: React.FC<DefaultProps>
  Detailed: React.FC<DetailedProps>
  WithFeedback: React.FC<WithFeedbackProps>
}

const EngagementStatus: EngagementStatusProps = {
  Default,
  Detailed,
  WithFeedback
}

export default EngagementStatus
