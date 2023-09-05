import { Row, Col, Stack, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from 'react-select'
import { useState, useMemo } from "react";
import { Note, Tag } from "./App";
import { NoteCard } from "./NoteCard";
import EditTagsModal from "./EditTagsModal";

type NoteListProps = { 
    availableTags: Tag[]
    notes: Note[]
    onDeleteTag: (id:string) => void
    onUpdateTag: (id:string, label:string) => void
 }
 
export type SimplifiedNote = { 
    id: string
    title: string
    tags: Tag[]
 }

function NoteList ({ availableTags, notes, onDeleteTag, onUpdateTag } : NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]); 
  const [title, setTitle] = useState('');  
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);

  const filteredNotes = useMemo(() => { 
    return notes.filter(note => { 
        return (title === '' || note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id == tag.id)))
     })
   }, [title, selectedTags, notes]);

  return (
    <>
        <Row className="align-items-center">
            <Col>
                <h1>Notes</h1>
            </Col>
            <Col xs='auto'>
                <Stack gap={2} direction='horizontal'>
                    <Link to='/new'>
                        <Button variant="primary">Create</Button>
                    </Link>
                    <Button onClick={() => setEditTagsModalIsOpen(true)} variant="outline-secondary">Edit Tags</Button>
                </Stack>
            </Col>
        </Row>
        <Form >
            <Row className=" mb-4">
                <Col>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control value={title} onChange={e => setTitle(e.target.value)} type="text"/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId='tags'>
                        <Form.Label>Tags</Form.Label>
                        <ReactSelect 
                        isMulti
                        value={selectedTags.map(tag => {return {label: tag.label, id: tag.id}} )}
                        options={availableTags.map(tag => { return { label:  tag.label, value:  tag.id }})}
                        onChange={tags => setSelectedTags(tags.map(tag => {return {label: tag.label, id: tag.id}}))}/>
                    </Form.Group>                
                </Col>
            </Row>
        </Form>
        <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
            { filteredNotes.map(note => (
                <Col key={note.id}>
                    <NoteCard id={note.id} title={note.title} tags={note.tags}/>
                </Col>
            )) } 

        </Row>
        <EditTagsModal 
        availableTags={ availableTags }  
        handleClose={ () => setEditTagsModalIsOpen(false) }  
        show={ editTagsModalIsOpen }
        onDeleteTag={onDeleteTag}
        onUpdateTag={onUpdateTag}/>
    </>
  )
}

export default NoteList;

