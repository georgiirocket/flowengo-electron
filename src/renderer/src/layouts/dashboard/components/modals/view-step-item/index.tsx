import type { FC } from 'react'
import { Modal, ModalContent } from '@heroui/modal'
import Content from './content'
import { ViewStepItemProvider } from './provider'
import { useViewStepItemModal } from '@common/hooks/use-view-step-item'

const EditProjectModal: FC = () => {
  const { isOpen, close, getPayload } = useViewStepItemModal()

  return (
    <Modal scrollBehavior="inside" size="2xl" isOpen={isOpen} onOpenChange={close}>
      <ModalContent>
        {(close) => (
          <ViewStepItemProvider data={getPayload()}>
            <Content close={close} />
          </ViewStepItemProvider>
        )}
      </ModalContent>
    </Modal>
  )
}

export default EditProjectModal
