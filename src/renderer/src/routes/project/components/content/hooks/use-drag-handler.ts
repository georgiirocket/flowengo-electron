import type { IProjects } from '@common/stores/projects/types.ts'
import { useProjectsCtxStore } from '@common/providers/projects'
import type { DragEndEvent, DragOverEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

export const useDragHandler = (project: IProjects['projects'][0]) => {
  const { id, steps } = project
  const reOrderItems = useProjectsCtxStore((state) => state.reOrderItems)
  const moveItemToStep = useProjectsCtxStore((state) => state.moveItemToStep)

  const dragEndHandler = (e: DragEndEvent) => {
    const { active, over } = e
    if (!over || !active.data.current || !over.data.current) return

    // Ignore if item is dropped on itself
    if (active.id === over.id) return

    const containerId = active.data.current.sortable.containerId
    const targetContainerId = over.data.current.sortable.containerId

    // Only reorder if same column
    if (containerId !== targetContainerId) return

    const step = steps.find((s) => s.id === containerId)
    if (!step) return

    const { items } = step
    const oldIndex = items.findIndex((i) => i.id === active.id.toString())
    const newIndex = items.findIndex((i) => i.id === over.id.toString())

    if (oldIndex === -1 || newIndex === -1) return

    reOrderItems({
      projectId: id,
      stepId: containerId,
      items: arrayMove(items, oldIndex, newIndex)
    })
  }

  const dragOverHandler = (e: DragOverEvent) => {
    const { active, over } = e
    if (!over || !active.data.current) return

    const initialContainer = active.data.current.sortable?.containerId
    const targetContainer = over.data.current?.sortable?.containerId

    // If no valid container for the active item, abort
    if (!initialContainer) return

    const itemId = active.id.toString()

    // Dragged into a new column container (over's ID is a step)
    if (!targetContainer) {
      if (initialContainer === over.id.toString()) return

      const newStep = steps.find((s) => s.id === over.id.toString())
      if (!newStep) return

      moveItemToStep({
        projectId: id,
        itemId,
        oldStepId: initialContainer,
        newStepId: over.id.toString()
      })
      return
    }

    // Same column, no move
    if (initialContainer === targetContainer) return

    // Move to a different column
    moveItemToStep({
      projectId: id,
      itemId,
      oldStepId: initialContainer,
      newStepId: targetContainer
    })
  }

  return { dragEndHandler, dragOverHandler }
}
