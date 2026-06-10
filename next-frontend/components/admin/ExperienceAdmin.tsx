'use client';

import { useEffect, useState, useTransition } from 'react';
import styled from 'styled-components';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import SortableList from './SortableList';
import { AdminForm, Input, TextArea, Select, Button, DangerButton, InlineRow, Label, Collapsible, SectionTitle } from './AdminStyles';
import { saveExperience, deleteExperience, reorderExperience, toggleExperiencePublished } from '../../app/admin/experience/actions';

export interface ExperienceAdminEntry {
  id: string;
  section: 'EXPERIENCE' | 'EDUCATION';
  title: string;
  subtitle: string;
  bullets: string[];
  imageUrl: string;
  companyUrl: string | null;
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

const ItemSubtitle = styled.span<{ $hidden: boolean }>`
  color: ${({ theme }) => theme.secondaryText};
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

const EntryFields = ({ entry }: { entry?: ExperienceAdminEntry }) => (
  <>
    {entry && <input type="hidden" name="id" value={entry.id} />}
    <InlineRow>
      <Label>
        Title
        <Input name="title" defaultValue={entry?.title} required />
      </Label>
      <Label>
        Subtitle (company + dates)
        <Input name="subtitle" defaultValue={entry?.subtitle} required size={40} />
      </Label>
    </InlineRow>
    <InlineRow>
      <Label>
        Image URL
        <Input name="imageUrl" defaultValue={entry?.imageUrl} placeholder="/images/experience/..." size={30} />
      </Label>
      <Label>
        Company URL (optional)
        <Input name="companyUrl" defaultValue={entry?.companyUrl ?? ''} placeholder="https://..." size={30} />
      </Label>
    </InlineRow>
    <Label>
      Bullets (one per line)
      <TextArea name="bullets" rows={5} defaultValue={entry?.bullets.join('\n')} />
    </Label>
    <InlineRow>
      <Label>
        Section
        <Select name="section" defaultValue={entry?.section ?? 'EXPERIENCE'}>
          <option value="EXPERIENCE">Experience</option>
          <option value="EDUCATION">Education</option>
        </Select>
      </Label>
      <Label style={{ flexDirection: 'row', alignItems: 'center', gap: '0.4rem' }}>
        <input type="checkbox" name="published" defaultChecked={entry?.published ?? true} /> Published
      </Label>
    </InlineRow>
    <Button type="submit">Save</Button>
  </>
);

const ExperienceAdmin = ({ entries }: { entries: ExperienceAdminEntry[] }) => {
  const [items, setItems] = useState(entries);
  const [, startTransition] = useTransition();

  useEffect(() => setItems(entries), [entries]);

  const sections: { key: 'EXPERIENCE' | 'EDUCATION'; title: string }[] = [
    { key: 'EXPERIENCE', title: 'Professional' },
    { key: 'EDUCATION', title: 'Education' },
  ];

  const handleReorder = (section: 'EXPERIENCE' | 'EDUCATION') => (next: ExperienceAdminEntry[]) => {
    setItems(prev => [...next, ...prev.filter(item => item.section !== section)]);
    startTransition(() => reorderExperience(next.map(item => item.id)));
  };

  const handleToggle = (id: string) => {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, published: !item.published } : item))
    );
    startTransition(() => toggleExperiencePublished(id));
  };

  return (
    <>
      <Collapsible>
        <summary>Add new entry</summary>
        <AdminForm action={saveExperience}>
          <EntryFields />
        </AdminForm>
      </Collapsible>
      {sections.map(section => (
        <div key={section.key}>
          <SectionTitle>{section.title}</SectionTitle>
          <SortableList
            items={items.filter(item => item.section === section.key)}
            onReorder={handleReorder(section.key)}
            renderItem={entry => (
              <>
                <ItemHeader>
                  <ItemTitle $hidden={!entry.published}>{entry.title}</ItemTitle>
                  <ItemSubtitle $hidden={!entry.published}>— {entry.subtitle}</ItemSubtitle>
                  <EyeButton
                    onClick={() => handleToggle(entry.id)}
                    title={entry.published ? 'Hide from site' : 'Show on site'}
                  >
                    {entry.published ? <FaRegEye /> : <FaRegEyeSlash />}
                  </EyeButton>
                </ItemHeader>
                <EditDetails>
                  <summary>Edit</summary>
                  <AdminForm action={saveExperience}>
                    <EntryFields entry={entry} />
                  </AdminForm>
                  <form
                    action={deleteExperience}
                    onSubmit={e => {
                      if (!confirm(`Delete "${entry.title}"?`)) e.preventDefault();
                    }}
                    style={{ marginTop: '0.75rem' }}
                  >
                    <input type="hidden" name="id" value={entry.id} />
                    <DangerButton type="submit">Delete</DangerButton>
                  </form>
                </EditDetails>
              </>
            )}
          />
        </div>
      ))}
    </>
  );
};

export default ExperienceAdmin;
