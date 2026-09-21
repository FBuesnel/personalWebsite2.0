'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import styled from 'styled-components';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import SortableList from './SortableList';
import { AdminForm, Input, TextArea, InlineRow, Label, Collapsible, IconButton } from './AdminStyles';
import SubmitButton from './SubmitButton';
import DeleteButton from './DeleteButton';
import { useSavedFlash, SavedNote } from './SavedFlash';
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

const Eye = styled(IconButton)`
  margin-left: auto;
`;

const ListWrap = styled.div`
  margin-top: ${({ theme }) => theme.space[5]};
`;

const DeleteRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.space[3]};
`;

const EditDetails = styled.details`
  margin-top: ${({ theme }) => theme.space[2]};

  summary {
    cursor: pointer;
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.secondaryText};
    list-style: none;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.space[2]};

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
    margin-top: ${({ theme }) => theme.space[3]};
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
      <Label as="div" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
        <input type="checkbox" name="published" defaultChecked={project?.published ?? true} /> Published
      </Label>
      <SubmitButton>Save</SubmitButton>
    </InlineRow>
  </>
);

const PortfolioAdmin = ({ projects }: { projects: PortfolioAdminProject[] }) => {
  const [items, setItems] = useState(projects);
  const [, startTransition] = useTransition();
  const addFormRef = useRef<HTMLFormElement>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [addSaved, flashAdd] = useSavedFlash();

  useEffect(() => setItems(projects), [projects]);

  // Client action wrapper: save, then reset + collapse + flash on success
  const addProject = async (formData: FormData) => {
    await savePortfolioProject(formData);
    addFormRef.current?.reset();
    setAddOpen(false);
    flashAdd();
  };

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
      <Collapsible open={addOpen} onToggle={e => setAddOpen((e.target as HTMLDetailsElement).open)}>
        <summary>
          Add new project
          {addSaved && <SavedNote style={{ marginLeft: '0.5rem' }}>Saved</SavedNote>}
        </summary>
        <AdminForm ref={addFormRef} action={addProject}>
          <ProjectFields />
        </AdminForm>
      </Collapsible>
      <ListWrap>
        <SortableList
          items={items}
          onReorder={handleReorder}
          renderItem={project => (
            <>
              <ItemHeader>
                <ItemTitle $hidden={!project.published}>{project.title}</ItemTitle>
                <Eye
                  type="button"
                  onClick={() => handleToggle(project.id)}
                  aria-label={project.published ? 'Hide from site' : 'Show on site'}
                  title={project.published ? 'Hide from site' : 'Show on site'}
                >
                  {project.published ? <FaRegEye /> : <FaRegEyeSlash />}
                </Eye>
              </ItemHeader>
              <EditDetails>
                <summary>Edit</summary>
                <AdminForm action={savePortfolioProject}>
                  <ProjectFields project={project} />
                </AdminForm>
                <DeleteRow>
                  <DeleteButton action={deletePortfolioProject} fields={{ id: project.id }} push={false} prompt={`Delete "${project.title}"?`} />
                </DeleteRow>
              </EditDetails>
            </>
          )}
        />
      </ListWrap>
    </>
  );
};

export default PortfolioAdmin;
