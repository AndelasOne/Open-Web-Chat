import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

const Popup = ({ modal, toggle, msg }) => {
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>{msg}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            OK
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export { Popup };
