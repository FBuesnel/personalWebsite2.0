'use client';

import { AdminCard, AdminForm, Input, Button, DangerButton, InlineRow, Label } from './AdminStyles';
import { createHabit, updateHabit, deleteHabit } from '../../app/admin/habits/actions';

export interface HabitItem {
  id: string;
  name: string;
  active: boolean;
}

const HabitsManager = ({ habits }: { habits: HabitItem[] }) => {
  return (
    <>
      <AdminCard>
        <AdminForm action={createHabit}>
          <Label>
            New habit
            <Input name="name" placeholder="e.g. Run, Read 20 pages, Practice Italian" required />
          </Label>
          <Button type="submit">Add Habit</Button>
        </AdminForm>
      </AdminCard>
      {habits.map(habit => (
        <AdminCard key={habit.id}>
          <AdminForm action={updateHabit}>
            <input type="hidden" name="id" value={habit.id} />
            <InlineRow>
              <Input name="name" defaultValue={habit.name} required />
              <Label style={{ flexDirection: 'row', alignItems: 'center', gap: '0.4rem' }}>
                <input type="checkbox" name="active" defaultChecked={habit.active} /> Active
              </Label>
              <Button type="submit">Save</Button>
            </InlineRow>
          </AdminForm>
          <form
            action={deleteHabit}
            onSubmit={e => {
              if (!confirm(`Delete "${habit.name}" and all its history?`)) e.preventDefault();
            }}
            style={{ marginTop: '0.75rem' }}
          >
            <input type="hidden" name="id" value={habit.id} />
            <DangerButton type="submit">Delete</DangerButton>
          </form>
        </AdminCard>
      ))}
    </>
  );
};

export default HabitsManager;
