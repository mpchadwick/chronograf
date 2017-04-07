export function publishNotification(type, message) {
  return {
    type: 'NOTIFICATION_RECEIVED',
    payload: {
      type,
      message,
    },
  }
}

export function dismissNotification(type) {
  return {
    type: 'NOTIFICATION_DISMISSED',
    payload: {
      type,
    },
  }
}

export function dismissAllNotifications() {
  return {
    type: 'ALL_NOTIFICATIONS_DISMISSED',
  }
}
