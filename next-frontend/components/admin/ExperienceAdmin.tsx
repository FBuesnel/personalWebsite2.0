'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import styled from 'styled-components';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import SortableList from './SortableList';
import { AdminForm, Input, TextArea, Select, InlineRow, Label, Collapsible, SectionTitle, IconButton } from './AdminStyles';
import SubmitButton from './SubmitButton';
import DeleteButton from './DeleteButton';
import { useSavedFlash, SavedNote } from './SavedFlash';
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

const Eye = styled(IconButton)`
  margin-left: auto;
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
      <Label as="div" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
        <input type="checkbox" name="published" defaultChecked={entry?.published ?? true} /> Published
      </Label>
    </InlineRow>
    <SubmitButton>Save</SubmitButton>
  </>
);

const ExperienceAdmin = ({ entries }: { entries: ExperienceAdminEntry[] }) => {
  const [items, setItems] = useState(entries);
  const [, startTransition] = useTransition();
  const addFormRef = useRef<HTMLFormElement>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [addSaved, flashAdd] = useSavedFlash();

  useEffect(() => setItems(entries), [entries]);

  // Client action wrapper: save, then reset + collapse + flash on success
  const addEntry = async (formData: FormData) => {
    await saveExperience(formData);
    addFormRef.current?.reset();
    setAddOpen(false);
    flashAdd();
  };

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
      <Collapsible open={addOpen} onToggle={e => setAddOpen((e.target as HTMLDetailsElement).open)}>
        <summary>
          Add new entry
          {addSaved && <SavedNote style={{ marginLeft: '0.5rem' }}>Saved</SavedNote>}
        </summary>
        <AdminForm ref={addFormRef} action={addEntry}>
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
                  <ItemSubtitle $hidden={!entry.published}>- {entry.subtitle}</ItemSubtitle>
                  <Eye
                    type="button"
                    onClick={() => handleToggle(entry.id)}
                    aria-label={entry.published ? 'Hide from site' : 'Show on site'}
                    title={entry.published ? 'Hide from site' : 'Show on site'}
                  >
                    {entry.published ? <FaRegEye /> : <FaRegEyeSlash />}
                  </Eye>
                </ItemHeader>
                <EditDetails>
                  <summary>Edit</summary>
                  <AdminForm action={saveExperience}>
                    <EntryFields entry={entry} />
                  </AdminForm>
                  <DeleteRow>
                    <DeleteButton action={deleteExperience} fields={{ id: entry.id }} push={false} prompt={`Delete "${entry.title}"?`} />
                  </DeleteRow>
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
