import useSWR from 'swr'
import { promiseWithDelay } from '@common/helpers/promise-with-delay'
import { useMainResize } from '@common/hooks/use-main-resize'
import { AppProvider } from '@common/providers/app'
import { Route, Routes } from 'react-router-dom'
import { ROUTES } from '@common/constants/routes'
import { lazy, Suspense } from 'react'
import DashboardLoading from '@common/components/loading/dashboard'
import { getAppState } from '@common/actions/get-app-state'
import AuthRoute from '@routes/auth'
import DashboardLayout from '@layouts/dashboard'

const DropDataModal = lazy(() => import('@common/modals/drop-data'))

function App(): React.JSX.Element {
  const { data } = useSWR('init', () => promiseWithDelay(getAppState, 2000), {
    suspense: true
  })

  const { mainRef } = useMainResize()

  return (
    <AppProvider data={data}>
      <main ref={mainRef} className="w-full h-[100vh]">
        <Routes>
          <Route
            path={ROUTES.dashboard}
            element={
              <Suspense fallback={<DashboardLoading />}>
                <DashboardLayout />
              </Suspense>
            }
          >
            <Route index element={<div>Dashboard</div>} />
            <Route path=":id" element={<div>Project</div>} />
          </Route>
          <Route
            path={ROUTES.main}
            element={<AuthRoute mode={data?.userName.length ? 'sign-in' : 'sign-up'} />}
          />
        </Routes>
        <DropDataModal />
      </main>
    </AppProvider>
  )
}

export default App
