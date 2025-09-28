import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Home() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const generateRoomId = (e) => {
    e.preventDefault();
    const Id = uuid();
    setRoomId(Id);
    toast.success("Room Id is generated");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Both the field is requried");
      return;
    }

    // redirect
    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
    toast.success("room is created");
  };

  // when enter then also join
  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-12 col-lg-8">
          <div className="glass-panel p-4">
            <div className="panel-header mb-3">
              <div className="d-flex align-items-center">
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  className="img-fluid"
                  style={{ maxWidth: "80px" }}
                />
                <div className="ms-3">
                  <h2 className="neon-text m-0">CODECIPHER</h2>
                  <small className="text-secondary">Create a room and battle code together</small>
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-8">
                <div className="glass-panel p-3">
                  <h5 className="text-uppercase text-secondary">Join a Room</h5>
                  <div className="form-group">
                    <input
                      type="text"
                      value={roomId}
                      onChange={(e) => setRoomId(e.target.value)}
                      className="form-control select-neon mb-2"
                      placeholder="ROOM ID"
                      onKeyUp={handleInputEnter}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="form-control select-neon mb-3"
                      placeholder="USERNAME"
                      onKeyUp={handleInputEnter}
                    />
                  </div>
                  <div className="d-flex gap-2">
                    <button onClick={joinRoom} className="btn btn-neon">
                      JOIN
                    </button>
                    <button onClick={generateRoomId} className="btn btn-outline-light">
                      New Room
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="glass-panel tips-panel p-3 h-100 d-flex flex-column justify-content-center">
                  <h6 className="m-0 neon-text">Tips</h6>
                  <ul className="m-0 mt-2 ps-3">
                    <li>Share the Room ID with teammates</li>
                    <li>Switch language from the editor header</li>
                    <li>Use the compiler panel for quick runs</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
