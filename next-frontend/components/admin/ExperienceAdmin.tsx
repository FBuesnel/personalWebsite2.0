'use client';

import { AdminCard, AdminForm, Input, TextArea, Select, Button, DangerButton, InlineRow, Label, Collapsible, SectionTitle } from './AdminStyles';
import { saveExperience, deleteExperience } from '../../app/admin/experience/actions';

export interface ExperienceAdminEntry {
  id: string;
  section: 'EXPERIENCE' | 'EDUCATION';
  title: string;
  subtitle: string;
  bullets: string[];
  imageUrl: string;
  sortOrder: number;
  published: boolean;
}

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
    <Label>
      Image URL (e.g. /images/experience/mirrortab.png)
      <Input name="imageUrl" defaultValue={entry?.imageUrl} />
    </Label>
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
      <Label>
        Sort order
        <Input type="number" name="sortOrder" defaultValue={entry?.sortOrder ?? 0} />
      </Label>
      <Label style={{ flexDirection: 'row', alignItems: 'center', gap: '0.4rem' }}>
        <input type="checkbox" name="published" defaultChecked={entry?.published ?? true} /> Published
      </Label>
    </InlineRow>
    <Button type="submit">Save</Button>
  </>
);

const ExperienceAdmin = ({ entries }: { entries: ExperienceAdminEntry[] }) => {
  return (
    <>
      <SectionTitle>Add new entry</SectionTitle>
      <AdminCard>
        <AdminForm action={saveExperience}>
          <EntryFields />
        </AdminForm>
      </AdminCard>
      <SectionTitle>Existing entries (ordered by sort order)</SectionTitle>
      {entries.map(entry => (
        <Collapsible key={entry.id}>
          <summary>
            [{entry.sortOrder}] {entry.title} — {entry.subtitle}
            {entry.section === 'EDUCATION' ? ' (Education)' : ''}
            {entry.published ? '' : ' (hidden)'}
          </summary>
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
        </Collapsible>
      ))}
    </>
  );
};

export default ExperienceAdmin;
