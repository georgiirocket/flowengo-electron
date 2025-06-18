export enum EVENTS {
  dropData = 'drop-data',
  quitApp = 'quit-app',
  userModal = 'user-modal',
  newProject = 'new-project',
  editProject = 'edit-project',
  newStepItem = 'new-step-item',
  editStepItem = 'edit-step-item',
  viewStepItem = 'view-step-item',
  checkForUpdates = 'check-for-updates',
  updateNotification = 'update-notification'
}

export enum INVOKE_EVENTS {
  getAppState = 'get-app-state',
  signUp = 'sign-up',
  signIn = 'sign-in',
  signOut = 'sign-out',
  getProtectedData = 'get-protected-data',
  saveProtectedData = 'save-protected-data'
}
