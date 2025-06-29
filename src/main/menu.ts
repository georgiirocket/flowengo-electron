import { Menu, MenuItem } from 'electron'
import { UI_EVENTS } from '@shared/events'
import { appWindow } from './app-window'

export function createMenu() {
  const currentMenu = Menu.getApplicationMenu()

  if (!currentMenu) return

  // 1. Clone the existing menu items, excluding the Help menu
  const filteredItems = currentMenu.items.filter((item) => item.label !== 'Help')

  // 2. Find the "File" menu
  const fileMenu = filteredItems.find((item) => item.label === 'File')

  if (fileMenu && fileMenu.submenu) {
    // 3. Add a separator and "Clear user data" item to "File"
    fileMenu.submenu.append(new MenuItem({ type: 'separator' }))
    fileMenu.submenu.append(
      new MenuItem({
        label: 'Clear user data',
        click: () => {
          appWindow
            .getMainWindow()
            ?.webContents.send(UI_EVENTS.clearAppDataModal, { triggeredFrom: 'menu' })
        }
      })
    )
  }

  // 4. Set the new application menu
  const newMenu = Menu.buildFromTemplate(filteredItems)
  Menu.setApplicationMenu(newMenu)
}
