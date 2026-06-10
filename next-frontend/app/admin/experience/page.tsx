import { prisma } from "../../../lib/db";
import { Container, Header, Description } from "../../../components/GlobalStyles";
import ExperienceAdmin from "../../../components/admin/ExperienceAdmin";

export const dynamic = "force-dynamic";

export default async function ExperienceAdminPage() {
  const entries = await prisma.experienceEntry.findMany({
    orderBy: [{ section: "asc" }, { sortOrder: "asc" }],
  });
  return (
    <Container>
      <Header>Edit Experience</Header>
      <Description>
        Changes go live on /experience as soon as you save — no redeploy needed.
      </Description>
      <ExperienceAdmin entries={entries} />
    </Container>
  );
}
