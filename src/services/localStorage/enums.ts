export enum StorageNumberTypes {
  AUTO_LOGOUT_TIMER_ID = 'autoLogoutTimerId',
  AUTO_LOGOUT_REMINDER_TIMER_ID = 'autoLogoutReminderTimerId',
  INTERVAL_ID = 'intervalId',
  EXPIRES_IN = 'expiresIn',
}

export type StorageNumberTypesUnion = `${StorageNumberTypes}`;
