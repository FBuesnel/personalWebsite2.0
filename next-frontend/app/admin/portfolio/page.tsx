import { prisma } from "../../../lib/db";
import { Container, Header } from "../../../components/GlobalStyles";
import PortfolioAdmin from "../../../components/admin/PortfolioAdmin";

export const dynamic = "force-dynamic";

export default async function PortfolioAdminPage() {
  const projects = await prisma.portfolioProject.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return (
    <Container>
      <Header>Portfolio</Header>
      <PortfolioAdmin projects={projects} />
    </Container>
  );
}
