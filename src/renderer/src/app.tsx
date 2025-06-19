import useSWR from 'swr'
import { promiseWithDelay } from '@common/helpers/promise-with-delay'
import { useMainResize } from '@common/hooks/use-main-resize'
import { Route, Routes } from 'react-router-dom'
import { ROUTES } from '@common/constants/routes'
import { lazy, Suspense } from 'react'
import DashboardLoading from '@common/components/loading/dashboard'
import { getAppState } from '@common/actions/get-app-state'
import AuthRoute from '@routes/auth'
import DashboardLayout from '@layouts/dashboard'
import Dashboard from '@routes/dashboard'
import Project from '@routes/project'

const DropDataModal = lazy(() => import('@common/modals/drop-data'))

function App() {
  const { data } = useSWR('init', () => promiseWithDelay(getAppState, 2000), {
    suspense: true
  })

  const { mainRef } = useMainResize()

  return (
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
          <Route index element={<Dashboard />} />
          <Route path=":id" element={<Project />} />
        </Route>
        <Route path={ROUTES.main} element={<AuthRoute appState={data} />} />x
      </Routes>
      <DropDataModal />
    </main>
  )
}

export default App
