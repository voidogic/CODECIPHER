import React, { useEffect, useRef, useState, useCallback } from "react";
import Client from "./Client";
import Editor from "./Editor";
import { initSocket } from "../Socket";
import { ACTIONS } from "../Actions";
import {
  useNavigate,
  useLocation,
  Navigate,
  useParams,
} from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

// List of supported languages
const LANGUAGES = [
  "python3",
  "java",
  "cpp",
  "c",
  "nodejs",
  "csharp",
  "sql",
  "php",
  "go",
  "rust",
  "swift",
  "r",
  "ruby",
  "scala",
  "bash",
  "pascal"
];

function EditorPage() {
  const [clients, setClients] = useState([]);
  const [output, setOutput] = useState("");
  const [stdinValue, setStdinValue] = useState("");
  const [isCompileWindowOpen, setIsCompileWindowOpen] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [socketError, setSocketError] = useState(null);
  const [socketReady, setSocketReady] = useState(false);
  const codeRef = useRef(null);

  const handleCodeChange = useCallback((code) => {
    codeRef.current = code;
  }, []);

  const Location = useLocation();
  const navigate = useNavigate();
  const { roomId } = useParams();

  const socketRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      const handleErrors = (err) => {
        console.log("Socket Error", err);
        setSocketError(err.message || "Connection failed");
        setSocketConnected(false);
        toast.error("Socket connection failed, Try again later");
        // Don't navigate immediately, let user see the error
      };

      try {
        socketRef.current = await initSocket();
        console.log("Socket connection status:", socketRef.current.connected);
        
        socketRef.current.on("connect_error", (err) => {
          console.error("Connect error:", err);
          handleErrors(err);
        });
        
        socketRef.current.on("connect_failed", (err) => {
          console.error("Connect failed:", err);
          handleErrors(err);
        });
        
        socketRef.current.on("disconnect", (reason) => {
          console.log("Socket disconnected:", reason);
          setSocketConnected(false);
          setSocketReady(false);
          if (reason !== "io client disconnect") {
            toast.error("Disconnected from server");
          }
        });

        // Set up event listeners (outside connect handler to avoid duplicates)
        socketRef.current.on(
          ACTIONS.JOINED,
          ({ clients, username, socketId }) => {
            if (username !== Location.state?.username) {
              toast.success(`${username} joined the room.`);
              // Send current code to the newly joined user
              socketRef.current.emit(ACTIONS.SYNC_CODE, {
                code: codeRef.current,
                socketId,
              });
            }
            setClients(clients);
          }
        );

        socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
          toast.success(`${username} left the room`);
          setClients((prev) => {
            return prev.filter((client) => client.socketId !== socketId);
          });
        });

        // Handle connection events
        socketRef.current.on("connect", () => {
          console.log("Socket connected successfully");
          setSocketConnected(true);
          setSocketError(null);
          setSocketReady(true);
          toast.success("Connected to server");
          
          // Emit join event after connection
          console.log("Emitting JOIN event:", { roomId, username: Location.state?.username });
          socketRef.current.emit(ACTIONS.JOIN, {
            roomId,
            username: Location.state?.username,
          });
        });
      } catch (error) {
        console.error("Failed to initialize socket:", error);
        setSocketError("Failed to initialize socket connection");
        setSocketConnected(false);
        toast.error("Failed to connect to server");
      }
    };
    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
        socketRef.current.off(ACTIONS.CODE_CHANGE);
        socketRef.current.disconnect();
      }
    };
  }, [roomId, Location.state?.username, navigate]);

  

  
  

  if (!Location.state) {
    return <Navigate to="/" />;
  }

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success(`Room ID is copied`);
    } catch (error) {
      console.log(error);
      toast.error("Unable to copy the room ID");
    }
  };

  const leaveRoom = async () => {
    navigate("/");
  };

  const runCode = async () => {
    setIsCompiling(true);
    try {
      if (!selectedLanguage) {
        setIsCompileWindowOpen(true);
        setOutput("Select language");
        setIsCompiling(false);
        return;
      }
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/compile`, {
        code: codeRef.current,
        language: selectedLanguage,
        stdin: stdinValue,
      });
      console.log("Backend response:", response.data);
      setOutput(response.data.output || JSON.stringify(response.data));
    } catch (error) {
      console.error("Error compiling code:", error);
      setOutput(error.response?.data?.error || "An error occurred");
    } finally {
      setIsCompiling(false);
    }
  };

  const toggleCompileWindow = () => {
    setIsCompileWindowOpen(!isCompileWindowOpen);
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-column">
      <div className="row flex-grow-1">
        {/* Client panel */}
        <div className="col-md-2 text-light d-flex flex-column glass-panel">

          {/* Connection Status */}
          <div className="mb-3">
            <div className="d-flex align-items-center mb-2">
              <div 
                className={`me-2 ${socketConnected ? 'text-success' : 'text-danger'}`}
                style={{ fontSize: '12px' }}
              >
                ●
              </div>
              <small className={socketConnected ? 'text-success' : 'text-danger'}>
                {socketConnected ? 'Connected' : 'Disconnected'}
              </small>
            </div>
            {socketError && (
              <small className="text-warning d-block" style={{ fontSize: '10px' }}>
                {socketError}
              </small>
            )}
          </div>

          {/* Client list container */}
          <div className="d-flex flex-column flex-grow-1 overflow-auto">
            <div className="sidebar-title mb-2">Members</div>
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>

          <hr />
          {/* Buttons */}
          <div className="mt-auto mb-3">
            <button className="btn btn-success w-100 mb-2" onClick={copyRoomId}>
              Copy Room ID
            </button>
            <button className="btn btn-danger w-100" onClick={leaveRoom}>
              Leave Room
            </button>
          </div>
        </div>

        {/* Editor panel */}
        <div className="col-md-10 text-light d-flex flex-column" style={{ position: "relative", minHeight: "100vh" }}>
          {/* Language selector */}
          <div className="p-2 d-flex justify-content-end align-items-center glass-panel">
            <select
              className="form-select lang-select select-neon"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value="" disabled>
                Select language
              </option>
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <div className="editor-wrapper" style={{ flex: "1 1 auto", maxHeight: isCompileWindowOpen ? "calc(100% - 30vh)" : "100%" }}>
            <Editor
              socketRef={socketRef}
              roomId={roomId}
              onCodeChange={handleCodeChange}
              socketReady={socketReady}
            />
          </div>

          {/* Bottom-right Open button when panel is closed */}
          {!isCompileWindowOpen && (
            <button
              className="btn btn-neon position-absolute bottom-0 end-0 m-3"
              onClick={toggleCompileWindow}
            >
              Open Compiler
            </button>
          )}

          {/* Bottom toggle removed; close handled in panel header next to Run Code */}

          {/* Compiler section under editor, pushes layout (not overlay) */}
          <div
            className={`glass-panel text-light p-3 ${isCompileWindowOpen ? "d-block" : "d-none"}`}
            style={{
              position: "relative",
              height: "30vh",
              overflowY: "auto",
              zIndex: 1040,
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="m-0">Compiler Output ({selectedLanguage})</h5>
              <div>
                <button
                  className="btn btn-success me-2"
                  onClick={runCode}
                  disabled={isCompiling || !selectedLanguage}
                >
                  {isCompiling ? "Compiling..." : "Run Code"}
                </button>
                <button className="btn btn-secondary" onClick={toggleCompileWindow}>
                  Close Compiler
                </button>
              </div>
            </div>
            {/* Stdin input */}
            <div className="mb-3">
              <label className="form-label">Program input (stdin)</label>
              <textarea
                className="form-control bg-secondary text-light"
                rows={3}
                placeholder={"Enter input that your program reads from standard input"}
                value={stdinValue}
                onChange={(e) => setStdinValue(e.target.value)}
              />
            </div>
            <pre className="bg-secondary p-3 rounded">
              {output || "Output will appear here after compilation"}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditorPage;
