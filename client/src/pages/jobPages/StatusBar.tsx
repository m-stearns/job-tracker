import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import SendIcon from '@mui/icons-material/Send';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import CelebrationIcon from '@mui/icons-material/Celebration';
import CancelIcon from '@mui/icons-material/Cancel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

const DefaultStepIcons = (props: StepIconProps) => {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <SendIcon />, // applied
    2: <GroupAddIcon />, // interview scheduled
    3: <WatchLaterIcon />, // awaiting decision
    4: <QuestionMarkIcon />, // Final decision placeholder
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
};

const AcceptedStepIcons = (props: StepIconProps) => {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <SendIcon />, // applied
    2: <GroupAddIcon />, // interview scheduled
    3: <WatchLaterIcon />, // awaiting decision
    4: <CelebrationIcon />, // accepted
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
};

const RejectedStepIcons = (props: StepIconProps) => {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <SendIcon />, // applied
    2: <GroupAddIcon />, // interview scheduled
    3: <WatchLaterIcon />, // awaiting decision
    4: <CancelIcon />, // rejected
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
};

const constantStatuses = ['Applied', 'Interview Scheduled', 'Decision Pending'];

export const StatusBar = ({ currentStatus }: { currentStatus: string }) => {
  // Gets which statuses/icons to use.  Conditionally changes final step to reflect decision (if received).
  const statusSteps = constantStatuses.includes(currentStatus)
    ? [...constantStatuses, 'Final Decision']
    : [...constantStatuses, currentStatus];
  const currentStatusIndx = statusSteps.indexOf(currentStatus);
  const IconsToUse =
    statusSteps[statusSteps.length - 1] === 'Final Decision'
      ? DefaultStepIcons
      : statusSteps[statusSteps.length - 1] === 'Accepted'
      ? AcceptedStepIcons
      : RejectedStepIcons;

  return (
    <Stepper alternativeLabel activeStep={currentStatusIndx} connector={<ColorlibConnector />}>
      {statusSteps.map((label) => (
        <Step key={label}>
          <StepLabel StepIconComponent={IconsToUse}>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
