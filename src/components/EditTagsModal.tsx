import { Modal, Form, Stack, Row, Col, Button } from "react-bootstrap";
import { Tag } from "./App";

type EditTagsModalProps = {
    availableTags: Tag[]
    handleClose: () => void
    show: boolean
    onDeleteTag: (id:string) => void
    onUpdateTag: (id:string, label:string) => void
}

function EditTagsModal ( { availableTags, handleClose, show, onDeleteTag, onUpdateTag }:  EditTagsModalProps) {
  return (
    <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>Edit Tags</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Stack gap={2} >
                        { availableTags.map(
                            tag => (
                                <Row key= { tag.id } >
                                    <Col>
                                        <Form.Control onChange={e => onUpdateTag(tag.id, e.target.value)} type="text" value={tag.label} />
                                    </Col>
                                    <Col xs='auto'>
                                        <Button onClick={() => onDeleteTag(tag.id)} variant="outline-danger">x</Button>
                                    </Col>
                                </Row>
                            )
                        ) } 
                    </Stack>
                </Form>
            </Modal.Body>  
        </Modal>  
    </> 
  )
};

export default EditTagsModal;