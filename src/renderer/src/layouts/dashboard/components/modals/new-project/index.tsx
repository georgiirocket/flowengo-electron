import type { FC } from 'react'
import { Modal, ModalContent } from '@heroui/modal'
import Content from './content'
import { NewProjectProvider } from './provider'
import { useNewProjectModal } from '@common/hooks/use-new-project'

const NewProjectModal: FC = () => {
  const { isOpen, setIsOpen } = useNewProjectModal()

  return (
    <Modal scrollBehavior="inside" size="2xl" isOpen={isOpen} onOpenChange={setIsOpen}>
      <ModalContent>
        {(close) => (
          <NewProjectProvider>
            <Content close={close} />
          </NewProjectProvider>
        )}
      </ModalContent>
    </Modal>
  )
}

export default NewProjectModal
