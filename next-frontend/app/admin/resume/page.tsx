import { prisma } from "../../../lib/db";
import { Container, Header, Description } from "../../../components/GlobalStyles";
import ResumeAdmin from "../../../components/admin/ResumeAdmin";

export const dynamic = "force-dynamic";

export default async function ResumeAdminPage() {
  const setting = await prisma.siteSetting.findUnique({
    where: { key: "resumeUrl" },
  });
  return (
    <Container>
      <Header>Resume</Header>
      <Description>
        Upload a new PDF and the footer&apos;s resume icon serves it immediately.
      </Description>
      <ResumeAdmin currentUrl={setting?.value ?? null} />
    </Container>
  );
}
