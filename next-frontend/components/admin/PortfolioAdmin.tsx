'use client';

import { useEffect, useState, useTransition } from 'react';
import styled from 'styled-components';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import SortableList from './SortableList';
import { AdminForm, Input, TextArea, Button, DangerButton, InlineRow, Label, Collapsible } from './AdminStyles';
import { savePortfolioProject, deletePortfolioProject, reorderPortfolio, togglePortfolioPublished } from '../../app/admin/portfolio/actions';

export interface PortfolioAdminProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  githubUrl: string | null;
  websiteUrl: string | null;
  published: boolean;
}

const ItemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ItemTitle = styled.span<{ $hidden: boolean }>`
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  opacity: ${({ $hidden }) => ($hidden ? 0.45 : 1)};
`;

const EyeButton = styled.button`
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.15rem;
  color: ${({ theme }) => theme.secondaryText};
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

const EditDetails = styled.details`
  margin-top: 0.35rem;

  summary {
    cursor: pointer;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.secondaryText};
    list-style: none;
    display: flex;
    align-items: center;
    gap: 0.4rem;

    &::-webkit-details-marker {
      display: none;
    }

    &::before {
      content: '▸';
      color: ${({ theme }) => theme.accent};
      display: inline-block;
      transition: transform 0.3s ease;
    }

    &:hover {
      color: ${({ theme }) => theme.accent};
    }
  }

  &[open] summary::before {
    transform: rotate(90deg);
  }

  form {
    margin-top: 0.75rem;
  }
`;

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
      Image URL
      <Input name="imageUrl" defaultValue={project?.imageUrl} placeholder="/images/portfolio/..." />
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
      <Label style={{ flexDirection: 'row', alignItems: 'center', gap: '0.4rem' }}>
        <input type="checkbox" name="published" defaultChecked={project?.published ?? true} /> Published
      </Label>
      <Button type="submit">Save</Button>
    </InlineRow>
  </>
);

const PortfolioAdmin = ({ projects }: { projects: PortfolioAdminProject[] }) => {
  const [items, setItems] = useState(projects);
  const [, startTransition] = useTransition();

  useEffect(() => setItems(projects), [projects]);

  const handleReorder = (next: PortfolioAdminProject[]) => {
    setItems(next);
    startTransition(() => reorderPortfolio(next.map(item => item.id)));
  };

  const handleToggle = (id: string) => {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, published: !item.published } : item))
    );
    startTransition(() => togglePortfolioPublished(id));
  };

  return (
    <>
      <Collapsible>
        <summary>Add new project</summary>
        <AdminForm action={savePortfolioProject}>
          <ProjectFields />
        </AdminForm>
      </Collapsible>
      <div style={{ marginTop: '1.5rem' }}>
        <SortableList
          items={items}
          onReorder={handleReorder}
          renderItem={project => (
            <>
              <ItemHeader>
                <ItemTitle $hidden={!project.published}>{project.title}</ItemTitle>
                <EyeButton
                  onClick={() => handleToggle(project.id)}
                  title={project.published ? 'Hide from site' : 'Show on site'}
                >
                  {project.published ? <FaRegEye /> : <FaRegEyeSlash />}
                </EyeButton>
              </ItemHeader>
              <EditDetails>
                <summary>Edit</summary>
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
              </EditDetails>
            </>
          )}
        />
      </div>
    </>
  );
};

export default PortfolioAdmin;
