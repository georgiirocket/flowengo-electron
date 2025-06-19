import type { FC } from 'react'
import { Modal, ModalContent } from '@heroui/modal'
import Content from './content'
import { EditProjectProvider } from './provider'
import { useEditProjectModal } from '@common/hooks/use-edit-project'

const EditProjectModal: FC = () => {
  const { isOpen, close, getPayload } = useEditProjectModal()

  return (
    <Modal scrollBehavior="inside" size="2xl" isOpen={isOpen} onOpenChange={close}>
      <ModalContent>
        {(close) => (
          <EditProjectProvider data={getPayload()}>
            <Content close={close} />
          </EditProjectProvider>
        )}
      </ModalContent>
    </Modal>
  )
}

export default EditProjectModal
