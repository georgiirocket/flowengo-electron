export enum UI_EVENTS {
  clearAppDataModal = 'clear-app-data-modal',
  signOut = 'sign-out',
  newProject = 'new-project',
  editProject = 'edit-project',
  newStepItem = 'new-step-item',
  editStepItem = 'edit-step-item',
  viewStepItem = 'view-step-item',
  userModal = 'user-modal',
  updateAvailable = 'update-available',
  updateDownloaded = 'update-downloaded',
  updateError = 'update-error',
  theme = 'theme'
}

export enum INVOKE_EVENTS {
  getAppState = 'get-app-state',
  signUp = 'sign-up',
  signIn = 'sign-in',
  signOut = 'sign-out',
  getProtectedData = 'get-protected-data',
  saveProtectedData = 'save-protected-data',
  clearAppData = 'clear-app-data',
  appVersion = 'app-version'
}
