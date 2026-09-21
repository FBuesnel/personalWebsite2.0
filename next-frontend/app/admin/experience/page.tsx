import { prisma } from "../../../lib/db";
import { RESUME_SETTING_KEY } from "../../../lib/resume";
import { Container, Header } from "../../../components/GlobalStyles";
import ExperienceAdmin from "../../../components/admin/ExperienceAdmin";
import ResumeAdmin from "../../../components/admin/ResumeAdmin";

export const dynamic = "force-dynamic";

export default async function ExperienceAdminPage() {
  const [entries, resumeSetting] = await Promise.all([
    prisma.experienceEntry.findMany({
      orderBy: [{ section: "asc" }, { sortOrder: "asc" }],
    }),
    prisma.siteSetting.findUnique({ where: { key: RESUME_SETTING_KEY } }),
  ]);
  return (
    <Container>
      <Header>Experience</Header>
      <ExperienceAdmin entries={entries} />
      <Header style={{ fontSize: "1.8rem", marginTop: "2.5rem", marginBottom: "1rem" }}>
        Resume
      </Header>
      <ResumeAdmin currentUrl={resumeSetting?.value ?? null} />
    </Container>
  );
}
