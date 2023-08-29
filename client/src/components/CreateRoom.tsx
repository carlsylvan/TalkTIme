import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import socket from "../socket/socket";
import { useNavigate } from "react-router-dom";

export const CreateRoom = () => {
  const [roomname, setRoomname] = useState<string>("");
  const [createroom, setCreateroom] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("group_created", (group) => {
      navigate(`/${group.name}/${group.id}`);
    });
  }, [navigate]);

  const handleCreateRoom = (e: FormEvent) => {
    e.preventDefault();
    if (roomname === "") return;
    socket.emit("create_group", roomname);
    setRoomname("");
    setCreateroom(false);
  };

  const handleCreateRoomInput = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomname(e.target.value);
  };
  const openForm = () => {
    setCreateroom(true);
  };

  return (
    <>
      {!createroom ? (
        <button onClick={openForm}>Skapa rum</button>
      ) : (
        <div className="create_room_form">
          <button onClick={()=>{setCreateroom(false)}}>stäng</button>
          <form  onSubmit={handleCreateRoom}>
            <p>Välj namn på nytt rum</p>
            <input
              value={roomname}
              onChange={handleCreateRoomInput}
              type="text"
            />
            <button type="submit">Öppna</button>
          </form>
        </div>
      )}
    </>
  );
};
