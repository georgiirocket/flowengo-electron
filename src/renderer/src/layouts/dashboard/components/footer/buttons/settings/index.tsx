import type { FC } from 'react'
import { Button } from '@heroui/button'
import { useAppCtxStore } from '@common/providers/app'
import { IoIosSettings } from 'react-icons/io'
import { openUserModal } from '@common/hooks/use-user-modal'

const UserSettingsButton: FC = () => {
  const userName = useAppCtxStore((state) => state.userName)

  return (
    <Button
      size="sm"
      className="max-w-[150px] overflow-hidden justify-start"
      endContent={<IoIosSettings className="shrink-0" size={20} />}
      onPress={() => openUserModal()}
    >
      <span className="w-full text-ellipsis overflow-hidden">{userName}</span>
    </Button>
  )
}

export default UserSettingsButton
