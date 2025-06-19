import type { FC } from 'react'
import { Button } from '@heroui/button'
import ReactLogo from '@assets/icon-sq.svg?react'
import { openNewProjectModal } from '@common/hooks/use-new-project'

const NewProjectButton: FC = () => {
  return (
    <Button
      startContent={<ReactLogo className="size-[20px]" />}
      size="sm"
      color="primary"
      onPress={openNewProjectModal}
    >
      New
    </Button>
  )
}

export default NewProjectButton
