import type { FC } from 'react'
import { useEditStepItemCtxStore } from '../../../provider'
import { Input } from '@heroui/input'

const Title: FC = () => {
  const title = useEditStepItemCtxStore((state) => state.item.title)
  const setTitle = useEditStepItemCtxStore((state) => state.setTitle)

  return (
    <Input
      size="sm"
      label="Title"
      type="text"
      placeholder="Enter the title"
      value={title}
      onValueChange={setTitle}
    />
  )
}

export default Title
