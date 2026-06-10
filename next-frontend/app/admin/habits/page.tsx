import { prisma } from "../../../lib/db";
import { ptLastNDays } from "../../../lib/dates";
import { Container, Header, Description } from "../../../components/GlobalStyles";
import HabitGrid from "../../../components/admin/HabitGrid";
import HabitsManager from "../../../components/admin/HabitsManager";

export const dynamic = "force-dynamic";

export default async function HabitsAdminPage() {
  const days = ptLastNDays(14);
  const habits = await prisma.habit.findMany({
    orderBy: { sortOrder: "asc" },
    include: { logs: { where: { date: { in: days }, done: true } } },
  });

  const activeHabits = habits
    .filter(h => h.active)
    .map(habit => ({
      id: habit.id,
      name: habit.name,
      doneDates: habit.logs.map(log => log.date),
    }));

  return (
    <Container>
      <Header>Habits</Header>
      <Description>Last two weeks. Click a cell to toggle a day.</Description>
      <HabitGrid habits={activeHabits} days={days} />
      <Header style={{ fontSize: "1.8rem", marginTop: "2rem" }}>Manage</Header>
      <Description>Inactive habits keep their history but leave the grid.</Description>
      <HabitsManager habits={habits.map(({ id, name, active }) => ({ id, name, active }))} />
    </Container>
  );
}
