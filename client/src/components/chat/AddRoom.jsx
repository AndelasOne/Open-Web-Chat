import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useState } from "react";
import { Popup } from "../login/Popup";

const AddRoom = ({ toggleDropdown, dropdownOpen, socket, chatRooms }) => {
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const toggleModal = () => setModal(!modal);

  const [roomName, setRoomName] = useState("");

  const onAdd = (e) => {
    e.preventDefault();

    if (!roomName) {
      setModalMessage("Please enter a Room first!");
      toggleModal();
      return;
    }
    if (
      chatRooms.filter((element) => element.room_name === roomName).length > 0
    ) {
      setModalMessage("Roomname already exists!");
      toggleModal();
      return;
    }
    // generate room ID
    const id = Math.floor(Math.random() * 9999);

    socket.emit("addRoom", { room_name: roomName, room_id: id });
    setModalMessage(`Added ${roomName}!`);
    toggleModal();
  };

  const onDelete = (e) => {
    e.preventDefault();

    if (!roomName) {
      setModalMessage("Please enter a Groupname first!");
      toggleModal();
      return;
    }
    if (
      chatRooms.filter((element) => element.room_name === roomName).length === 0
    ) {
      setModalMessage("Nothing to delete!");
      toggleModal();
      return;
    }
    socket.emit("deleteRoom", roomName);
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
            style={{ marginInline: "5px" }}
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
