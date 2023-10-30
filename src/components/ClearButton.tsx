import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { clearMovies } from "../features/favoriteMovies/favoriteMoviesSlice";

export const ClearButton = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleClear = () => {
    dispatch(clearMovies());
    handleClose();
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Remove all
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Clear Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to clear all favorites?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClear}>
            Clear
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
