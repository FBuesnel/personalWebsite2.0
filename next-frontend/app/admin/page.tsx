import { prisma } from "../../lib/db";
import { ptLastNDays, ptToday } from "../../lib/dates";
import { Container, Header, Description } from "../../components/GlobalStyles";
import HabitGrid from "../../components/admin/HabitGrid";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const days = ptLastNDays(7);
  const today = ptToday();
  const habits = await prisma.habit.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
    include: { logs: { where: { date: { in: days }, done: true } } },
  });

  const habitData = habits.map(habit => ({
    id: habit.id,
    name: habit.name,
    doneDates: habit.logs.map(log => log.date),
  }));
  const doneToday = habitData.filter(h => h.doneDates.includes(today)).length;

  return (
    <Container>
      <Header>Dashboard</Header>
      <Description>
        {today} — {doneToday}/{habitData.length} habits done today
      </Description>
      <HabitGrid habits={habitData} days={days} />
    </Container>
  );
}
