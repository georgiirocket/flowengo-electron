import { FC } from 'react'
import { Card, CardBody, CardFooter } from '@heroui/card'
import { Divider } from '@heroui/divider'

const Snippet: FC = () => {
  return (
    <Card
      shadow="none"
      className="w-[270px] h-[143px] scroll-hidden border-1 border-primary select-none opacity-60"
    >
      <CardBody className="flex flex-col justify-between gap-1 pb-0">
        <div className="h-[40px] rounded-lg bg-default-300" />
        <Divider className="my-1" />
        <div className="h-[16px] rounded-lg bg-default-300" />
      </CardBody>
      <CardFooter className="justify-end gap-1">
        <div className="size-[32px] rounded-full bg-default-300" />
        <div className="ml-auto h-[32px] w-[68px] rounded-full bg-default-300" />
        <div className="h-[32px] w-[74px] rounded-full bg-default-300" />
      </CardFooter>
    </Card>
  )
}

export default Snippet
