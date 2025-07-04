import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema, initialValues } from './schema'
import type { z } from 'zod'
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card'
import FieldPassword from '@common/components/fields/password'
import { Divider } from '@heroui/divider'
import Input from '@common/components/fields/input'
import FieldFormError from '@common/components/fields/error'
import { Button } from '@heroui/button'
import { appName } from '@common/constants'
import { signIn } from '@common/actions/sign-in'
import { signUp } from '@common/actions/sign-up'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@common/constants/routes'
import ReactLogo from '@assets/icon-sq.svg?react'
import { AppState } from '@shared/app-state'
import { useVersion } from '@common/hooks/use-version'
import { Chip } from '@heroui/chip'

interface Props {
  appState: AppState
}

const AuthRoute: FC<Props> = ({ appState }) => {
  const { userName } = appState
  const navigate = useNavigate()
  const { version } = useVersion()

  const mode: 'sign-in' | 'sign-up' = userName.length ? 'sign-in' : 'sign-up'

  /**
   * Form
   */
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...initialValues, username: userName }
  })

  /**
   * Submit fn
   * @param values
   */
  const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
    form.clearErrors()

    const { error, data } = await (mode === 'sign-in' ? signIn(values.password) : signUp(values))

    if (error) {
      form.setError('root', { message: 'Check your credentials' })

      return
    }

    if (data) {
      navigate(ROUTES.dashboard)
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="size-full grid place-content-center releative"
    >
      <Card className="min-w-[300px] md:min-w-[400px]">
        <CardHeader className="flex gap-1 items-center justify-between">
          <p className="flex gap-1 items-center">
            <ReactLogo className="size-[20px]" />
            <span>{appName}</span>
          </p>
          <p className="text-sm">{mode === 'sign-up' ? 'New account' : 'Account'}</p>
        </CardHeader>
        <Divider />
        <CardBody className="grid gap-3">
          <Input
            inputProps={{
              label: 'Username',
              size: 'sm',
              labelPlacement: 'outside',
              placeholder: 'Enter your username',
              isDisabled: mode === 'sign-in',
              isRequired: true
            }}
            name="username"
            control={form.control}
          />
          <FieldPassword
            name="password"
            control={form.control}
            isGenerate={mode === 'sign-up'}
            isCopy={mode === 'sign-up'}
            inputProps={{
              label: 'Password',
              size: 'sm',
              labelPlacement: 'outside',
              placeholder: 'Enter your password'
            }}
          />
          <FieldFormError message={form.formState.errors.root?.message} />
        </CardBody>
        <Divider />
        <CardFooter>
          <Button
            isLoading={form.formState.isSubmitting}
            type="submit"
            color="primary"
            className="ml-auto"
            size="sm"
          >
            {mode === 'sign-in' ? 'Sign in' : 'Create account'}
          </Button>
        </CardFooter>
      </Card>
      <Chip
        color="primary"
        size="sm"
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
      >
        <div className="text-tiny flex gap-2 items-center">
          <p>{appName}</p>
          <p>v.{version}</p>
        </div>
      </Chip>
    </form>
  )
}

export default AuthRoute
