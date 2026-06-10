import { prisma } from "../../../lib/db";
import { Container, Header, Description } from "../../../components/GlobalStyles";
import PortfolioAdmin from "../../../components/admin/PortfolioAdmin";

export const dynamic = "force-dynamic";

export default async function PortfolioAdminPage() {
  const projects = await prisma.portfolioProject.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return (
    <Container>
      <Header>Edit Portfolio</Header>
      <Description>
        Changes go live on /portfolio as soon as you save — no redeploy needed.
      </Description>
      <PortfolioAdmin projects={projects} />
    </Container>
  );
}
