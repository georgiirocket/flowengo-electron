import type { FC, PropsWithChildren } from 'react'
import { ThemeProvider as Provider } from 'next-themes'
import { THEME } from '@renderer/common/constants/theme'
import Subscribe from './subscribe'

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider attribute="class" themes={Object.values(THEME)}>
      {children}
      <Subscribe />
    </Provider>
  )
}

export default ThemeProvider
