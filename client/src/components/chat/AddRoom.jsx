import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useState } from "react";
import { Popup } from "../login/Popup";

const AddRoom = ({ toggleDropdown, dropdownOpen, onAddRoom, onDeleteRoom }) => {
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const toggleModal = () => setModal(!modal);

  const [roomName, setRoomName] = useState("");

  const onAdd = (e) => {
    e.preventDefault();

    const roomNameFromDB = "Datenbanken";

    //TODO: Fetch Roomname
    if (!roomName) {
      setModalMessage("Please enter a Groupname first!");
      toggleModal();
      return;
    }
    if (roomNameFromDB) {
      setModalMessage("Roomname already exists!");
      toggleModal();
      return;
    }
    onAddRoom(roomName);
    setModalMessage(`Added ${roomName}!`);
    toggleModal();
  };

  const onDelete = (e) => {
    e.preventDefault();

    const roomNameFromDB = "Datenbanken";

    //TODO: Fetch Roomname

    if (!roomName) {
      setModalMessage("Please enter a Groupname first!");
      toggleModal();
      return;
    }
    if (!roomNameFromDB) {
      setModalMessage("Nothing to delete!");
      toggleModal();
      return;
    }
    onDeleteRoom(roomName);
    setModalMessage(`Deleted ${roomName}!`);
    toggleModal();
  };

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} size="sm">
      <DropdownToggle caret></DropdownToggle>
      <DropdownMenu right>
        <DropdownItem header>Group Options</DropdownItem>
        <form>
          <input
            type="text"
            name="name"
            value={roomName}
            onChange={(event) => setRoomName(event.target.value)}
          />
        </form>
        <DropdownItem divider />
        <DropdownItem onClick={onAdd}>Add Room</DropdownItem>
        <DropdownItem onClick={onDelete}>Delete Room</DropdownItem>
      </DropdownMenu>
      <Popup modal={modal} toggle={toggleModal} msg={modalMessage} />
    </Dropdown>
  );
};

export { AddRoom };
