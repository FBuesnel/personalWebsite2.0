import { prisma } from "../../../lib/db";
import { ptLastNDays } from "../../../lib/dates";
import { Container, Header } from "../../../components/GlobalStyles";
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
      <div style={{ marginTop: "1.5rem" }}>
        <HabitGrid habits={activeHabits} days={days} />
      </div>
      <Header style={{ fontSize: "1.8rem", marginTop: "2.5rem", marginBottom: "1rem" }}>Manage</Header>
      <HabitsManager habits={habits.map(({ id, name, active }) => ({ id, name, active }))} />
    </Container>
  );
}
