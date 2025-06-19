import type { FC } from 'react'
import { ModalBody, ModalFooter, ModalHeader } from '@heroui/modal'
import { Button } from '@heroui/button'
import { useAppCtxStore } from '@common/providers/app'
import { formatDateFromIso } from '@common/helpers/format-date-from-iso'
import { openRemoveDataModal } from '@common/hooks/use-drop-data-modal'
import { Divider } from '@heroui/divider'
import ThemeComponent from './components/theme'
import { UI_EVENTS } from '@shared/events'

const Content: FC = () => {
  const { userName, createDate, clear } = useAppCtxStore((state) => state)
  const displayDate = formatDateFromIso(createDate, 'dateWithTime')

  const handleLogOut = async (): Promise<void> => {
    window.api.emit(UI_EVENTS.signOut, {})

    clear()

    window.location.href = '/'
  }

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">Account</ModalHeader>
      <ModalBody className="gap-2">
        <div className="flex justify-between items-center">
          <h1>{userName}</h1>
          <p className="text-tiny">{displayDate}</p>
        </div>
        <Divider />
        <ThemeComponent />
      </ModalBody>
      <ModalFooter>
        <Button size="sm" color="danger" variant="bordered" onPress={() => openRemoveDataModal()}>
          Remove account
        </Button>
        <Button size="sm" onPress={handleLogOut}>
          Log out
        </Button>
      </ModalFooter>
    </>
  )
}

export default Content
