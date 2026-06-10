'use client';

import { useTransition } from 'react';
import styled from 'styled-components';
import { toggleHabitLog } from '../../app/admin/habits/actions';

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;

  th, td {
    padding: 0.5rem;
    text-align: center;
    color: ${({ theme }) => theme.secondaryText};
    font-size: 0.9rem;
  }

  th:first-child, td:first-child {
    text-align: left;
    color: ${({ theme }) => theme.text};
    font-size: 1rem;
  }
`;

const Cell = styled.button<{ $done: boolean; $today: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 2px solid ${({ theme, $today }) => ($today ? theme.accent : theme.border)};
  background: ${({ theme, $done }) => ($done ? theme.accent : theme.background)};
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.accent};
  }

  &:disabled {
    opacity: 0.5;
  }
`;

export interface HabitWithLogs {
  id: string;
  name: string;
  doneDates: string[];
}

interface HabitGridProps {
  habits: HabitWithLogs[];
  days: string[]; // YYYY-MM-DD, oldest first; last entry is today
}

const HabitGrid = ({ habits, days }: HabitGridProps) => {
  const [pending, startTransition] = useTransition();

  if (habits.length === 0) {
    return <p>No habits yet. Add one below to start tracking.</p>;
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Habit</th>
          {days.map(day => (
            <th key={day}>{day.slice(5).replace('-', '/')}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {habits.map(habit => (
          <tr key={habit.id}>
            <td>{habit.name}</td>
            {days.map((day, i) => (
              <td key={day}>
                <Cell
                  $done={habit.doneDates.includes(day)}
                  $today={i === days.length - 1}
                  disabled={pending}
                  aria-label={`${habit.name} on ${day}`}
                  onClick={() => startTransition(() => toggleHabitLog(habit.id, day))}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default HabitGrid;
