import NoteForm from './NoteForm';
import { NoteData, Tag } from '../App';

type NewFormProps = { 
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
 }
const NewNote = ({ onSubmit, onAddTag, availableTags }: NewFormProps) => {
  return (
    <>
        <h1 className='mb-4'>New note</h1>
        <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags}/>
    </>
  )
}

export default NewNote;