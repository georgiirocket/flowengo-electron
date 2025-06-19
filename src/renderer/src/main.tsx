import './app.css'

import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'
import ThemeProvider from '@renderer/common/providers/theme'
import HeroUiProvider from '@renderer/common/providers/hero-ui'
import { HashRouter } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import CommonLoading from '@renderer/common/components/loading/common'
import { FallbackRender } from '@renderer/common/components/fallback-render'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <HeroUiProvider>
        <HashRouter>
          <ErrorBoundary FallbackComponent={FallbackRender}>
            <Suspense fallback={<CommonLoading />}>
              <App />
            </Suspense>
          </ErrorBoundary>
        </HashRouter>
      </HeroUiProvider>
    </ThemeProvider>
  </StrictMode>
)
