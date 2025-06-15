import { copyClipboard } from '@common/helpers/copy-clipboard'
import { generatePassword } from '@common/helpers/genarate-password'
import { Input } from '@heroui/input'
import { useState } from 'react'
import { type Control, Controller, type FieldValues, type Path } from 'react-hook-form'
import { IoEyeOffOutline } from 'react-icons/io5'
import { IoEyeOutline } from 'react-icons/io5'
import { IoCopy } from 'react-icons/io5'
import type { InputProps } from '@heroui/react'
import ErrorMessage from '@common/components/fields/error-message'

interface Props<TFormValues extends FieldValues> {
  name: Path<TFormValues>
  control: Control<TFormValues>
  isGenerate?: boolean
  isCopy?: boolean
  inputProps?: InputProps
}

const FieldPassword = <TFormValues extends FieldValues>({
  name,
  control,
  isGenerate,
  isCopy,
  inputProps
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
}: Props<TFormValues>) => {
  const [isShow, setIsShow] = useState(false)

  const onToggle = (): void => setIsShow((prev) => !prev)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState, formState }) => {
        return (
          <Input
            {...field}
            ref={field.ref}
            isRequired
            errorMessage={<ErrorMessage name={name} message={fieldState.error?.message} />}
            isInvalid={!!fieldState.error?.message}
            isDisabled={formState.isSubmitting || inputProps?.isDisabled}
            labelPlacement="outside"
            type={isShow ? 'text' : 'password'}
            {...inputProps}
            description={
              isGenerate && (
                <div
                  className="ml-auto cursor-pointer transition-all hover:text-primaryColor"
                  onClick={() => {
                    field.onChange(generatePassword())
                    field.onBlur()
                  }}
                >
                  Generate password
                </div>
              )
            }
            endContent={
              <div className="flex items-center gap-1">
                {isShow && (
                  <IoEyeOffOutline className="cursor-pointer size-[20px]" onClick={onToggle} />
                )}
                {!isShow && (
                  <IoEyeOutline className="cursor-pointer size-[20px]" onClick={onToggle} />
                )}
                {isCopy && (
                  <IoCopy
                    className="cursor-pointer size-[20px]"
                    onClick={() => {
                      void copyClipboard(field.value)
                    }}
                  />
                )}
              </div>
            }
          />
        )
      }}
    />
  )
}

export default FieldPassword
