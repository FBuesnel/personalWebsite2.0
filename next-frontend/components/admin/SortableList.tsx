'use client';

import React from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styled from 'styled-components';
import { MdDragIndicator } from 'react-icons/md';

const Row = styled.div<{ $dragging: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  background: ${({ theme }) => theme.secondaryBackground};
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  padding: 0.75rem 1rem;
  margin-bottom: 0.75rem;
  opacity: ${({ $dragging }) => ($dragging ? 0.6 : 1)};
`;

const Handle = styled.button`
  background: none;
  border: none;
  cursor: grab;
  color: ${({ theme }) => theme.secondaryText};
  font-size: 1.4rem;
  padding: 0.15rem 0;
  touch-action: none;

  &:active {
    cursor: grabbing;
  }
  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

const Content = styled.div`
  flex: 1;
  min-width: 0;
`;

const SortableRow = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });
  return (
    <Row
      ref={setNodeRef}
      $dragging={isDragging}
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      <Handle {...attributes} {...listeners} aria-label="Drag to reorder">
        <MdDragIndicator />
      </Handle>
      <Content>{children}</Content>
    </Row>
  );
};

interface SortableListProps<T extends { id: string }> {
  items: T[];
  onReorder: (items: T[]) => void;
  renderItem: (item: T) => React.ReactNode;
}

// Vertical drag-to-reorder list. Dragging only starts from the handle, so
// buttons and expandable forms inside rows behave normally.
export default function SortableList<T extends { id: string }>({
  items,
  onReorder,
  renderItem,
}: SortableListProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex(item => item.id === active.id);
    const newIndex = items.findIndex(item => item.id === over.id);
    onReorder(arrayMove(items, oldIndex, newIndex));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map(item => item.id)}
        strategy={verticalListSortingStrategy}
      >
        {items.map(item => (
          <SortableRow key={item.id} id={item.id}>
            {renderItem(item)}
          </SortableRow>
        ))}
      </SortableContext>
    </DndContext>
  );
}
