import { FC, useMemo } from 'react'
import { Card, CardBody, CardFooter } from '@heroui/card'
import { Divider } from '@heroui/divider'
import { MdOutlineUpdate } from 'react-icons/md'
import Marker from '@common/components/marker'
import { Button } from '@heroui/button'
import { CiEdit, CiViewTimeline } from 'react-icons/ci'
import { useDndContext } from '@dnd-kit/core'
import type { IProjects } from '@common/stores/projects/types'
import { formatDateFromIso } from '@common/helpers/format-date-from-iso'

interface Props {
  project: IProjects['projects'][0]
}

const Overlay: FC<Props> = ({ project }) => {
  const { active } = useDndContext()

  const item = useMemo(() => {
    const { steps } = project

    const items = steps.map((s) => s.items).flat(1)

    return items.find((i) => i.id === active?.id)
  }, [project, active])

  if (!active || !item) {
    return null
  }

  const displayUpdateAt = formatDateFromIso(item.updatedAt, 'dateWithTime')

  return (
    <Card
      shadow="none"
      className="w-full h-full scroll-hidden border-1 select-none"
      style={{ borderColor: item.color }}
    >
      <CardBody className="flex flex-col justify-between gap-1 pb-0">
        <p className="line-clamp-2 text-sm min-h-[40px]">{item.title}</p>
        <Divider className="my-1" />
        <div className="text-tiny flex justify-start gap-1 items-center">
          <MdOutlineUpdate size={12} />
          <span>{displayUpdateAt}</span>
        </div>
      </CardBody>
      <CardFooter className="justify-end gap-1">
        <Marker color={item.color} className="mr-auto" />
        <Button radius="full" size="sm" startContent={<CiEdit size={15} />}>
          Edit
        </Button>
        <Button radius="full" size="sm" startContent={<CiViewTimeline size={15} />}>
          View
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Overlay
