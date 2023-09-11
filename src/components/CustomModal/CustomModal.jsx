import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CustomModal = (props) => {
    const { show, title, content, onClose, onSubmit } = props
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>{content}</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => onClose()}>Close</Button>
                <Button variant="danger" onClick={() => onSubmit()}>Delete</Button>
            </Modal.Footer>
        </Modal>

    )
}

export default CustomModal