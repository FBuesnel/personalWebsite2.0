'use client';

import { AdminCard, AdminForm, Input, TextArea, Button, DangerButton, InlineRow, Label, Collapsible, SectionTitle } from './AdminStyles';
import { savePortfolioProject, deletePortfolioProject } from '../../app/admin/portfolio/actions';

export interface PortfolioAdminProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  githubUrl: string | null;
  websiteUrl: string | null;
  sortOrder: number;
  published: boolean;
}

const ProjectFields = ({ project }: { project?: PortfolioAdminProject }) => (
  <>
    {project && <input type="hidden" name="id" value={project.id} />}
    <InlineRow>
      <Label>
        Title
        <Input name="title" defaultValue={project?.title} required />
      </Label>
      <Label>
        Subtitle
        <Input name="subtitle" defaultValue={project?.subtitle} size={35} />
      </Label>
    </InlineRow>
    <Label>
      Description
      <TextArea name="description" rows={4} defaultValue={project?.description} required />
    </Label>
    <Label>
      Image URL (e.g. /images/portfolio/lumina.jpg)
      <Input name="imageUrl" defaultValue={project?.imageUrl} />
    </Label>
    <InlineRow>
      <Label>
        GitHub URL (optional)
        <Input name="githubUrl" defaultValue={project?.githubUrl ?? ''} size={35} />
      </Label>
      <Label>
        Website URL (optional)
        <Input name="websiteUrl" defaultValue={project?.websiteUrl ?? ''} size={35} />
      </Label>
    </InlineRow>
    <InlineRow>
      <Label>
        Sort order
        <Input type="number" name="sortOrder" defaultValue={project?.sortOrder ?? 0} />
      </Label>
      <Label style={{ flexDirection: 'row', alignItems: 'center', gap: '0.4rem' }}>
        <input type="checkbox" name="published" defaultChecked={project?.published ?? true} /> Published
      </Label>
    </InlineRow>
    <Button type="submit">Save</Button>
  </>
);

const PortfolioAdmin = ({ projects }: { projects: PortfolioAdminProject[] }) => {
  return (
    <>
      <SectionTitle>Add new project</SectionTitle>
      <AdminCard>
        <AdminForm action={savePortfolioProject}>
          <ProjectFields />
        </AdminForm>
      </AdminCard>
      <SectionTitle>Existing projects (ordered by sort order)</SectionTitle>
      {projects.map(project => (
        <Collapsible key={project.id}>
          <summary>
            [{project.sortOrder}] {project.title}
            {project.published ? '' : ' (hidden)'}
          </summary>
          <AdminForm action={savePortfolioProject}>
            <ProjectFields project={project} />
          </AdminForm>
          <form
            action={deletePortfolioProject}
            onSubmit={e => {
              if (!confirm(`Delete "${project.title}"?`)) e.preventDefault();
            }}
            style={{ marginTop: '0.75rem' }}
          >
            <input type="hidden" name="id" value={project.id} />
            <DangerButton type="submit">Delete</DangerButton>
          </form>
        </Collapsible>
      ))}
    </>
  );
};

export default PortfolioAdmin;
