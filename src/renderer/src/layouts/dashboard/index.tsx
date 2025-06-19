import { type FC, lazy } from 'react'
import useSWR from 'swr'
import { getDashboardData } from '@common/actions/get-dashboard-data'
import { ProjectsProvider } from '@common/providers/projects'
import { Outlet } from 'react-router-dom'
import Footer from './components/footer'
import { AppProvider } from '@common/providers/app'

const NewProjectModal = lazy(() => import('./components/modals/new-project'))
const EditProjectModal = lazy(() => import('./components/modals/edit-project'))
const NewStepItemModal = lazy(() => import('./components/modals/new-step-item'))
const EditStepItemModal = lazy(() => import('./components/modals/edit-step-item'))
const ViewStepItemModal = lazy(() => import('./components/modals/view-step-item'))
const UserModal = lazy(() => import('./components/modals/user'))

const DashboardLayout: FC = () => {
  const { data: result } = useSWR('protected', getDashboardData, {
    suspense: true
  })

  if (result.error || !result.data || !result.appState) {
    throw new Error(result.error)
  }

  return (
    <AppProvider data={result.appState}>
      <ProjectsProvider data={result.data}>
        <div className="size-full p-2 grid grid-rows-[1fr_auto] gap-2 overflow-hidden">
          <Outlet />
          <Footer />
          <NewProjectModal />
          <EditProjectModal />
          <NewStepItemModal />
          <EditStepItemModal />
          <ViewStepItemModal />
          <UserModal />
        </div>
      </ProjectsProvider>
    </AppProvider>
  )
}

export default DashboardLayout
