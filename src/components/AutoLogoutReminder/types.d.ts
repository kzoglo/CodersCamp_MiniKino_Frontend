
import { IComponentProps } from '../../types';
import { DefProps } from './enums';

export interface IProps extends IComponentProps {
  renewSessionText?: DefProps.RENEW_SESSION_TEXT;
  renewSessionBtn?: DefProps.RENEW_SESSION_BTN;
  redirectToLoginText?: DefProps.REDIRECT_TO_LOGIN_TEXT;
  agreeToRenewBtn?: DefProps.AGREE_TO_RENEW_BTN;
  cancelRenewBtn?: DefProps.CANCEL_RENEW_BTN;
}

export interface IState {
  time: number;
}
