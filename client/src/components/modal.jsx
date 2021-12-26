import { Modal, Button } from "react-bootstrap";
import RoomCarousel from "./roomCarousel";

function RoomModal({ show, handleClose, room }) {
  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RoomCarousel room={room} />
          <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RoomModal;
