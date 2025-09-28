import React, { useEffect, useRef, useCallback } from "react";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import CodeMirror from "codemirror";
import { ACTIONS } from "../Actions";

function Editor({ socketRef, roomId, onCodeChange, socketReady }) {
  const editorRef = useRef(null);

  const handleChange = useCallback((instance, changes) => {
    const { origin } = changes;
    const code = instance.getValue();
    console.log("Editor change detected:", { origin, code: code.substring(0, 20) + "..." });
    onCodeChange(code);
    
    // Only emit if it's a user change, not a programmatic change
    if (origin !== "setValue" && socketRef.current && socketRef.current.connected) {
      console.log("Sending code to socket for room:", roomId);
      console.log("Socket connected:", socketRef.current.connected);
      socketRef.current.emit(ACTIONS.CODE_CHANGE, { roomId, code });
    } else {
      console.log("Not sending code change:", { 
        origin, 
        socketConnected: socketRef.current?.connected,
        hasSocket: !!socketRef.current 
      });
    }
  }, [onCodeChange, roomId, socketRef]);

  useEffect(() => {
    const textarea = document.getElementById("realtimeEditor");
    if (!textarea) return;

    const editor = CodeMirror.fromTextArea(textarea, {
      mode: { name: "javascript", json: true },
      theme: "dracula",
      autoCloseTags: true,
      autoCloseBrackets: true,
      lineNumbers: true,
    });

    editorRef.current = editor;
    editor.setSize("100%", "100%");

    editor.on("change", handleChange);

    return () => {
      editor.off("change", handleChange);
      editor.toTextArea();
    };
  }, [handleChange]);

  // Listen for code changes from other users
  useEffect(() => {
    const socket = socketRef.current;
    console.log("Editor setting up socket listener:", { hasSocket: !!socket, connected: socket?.connected, socketReady });
    
    if (!socket || !socketReady) {
      console.log("Socket not ready:", { hasSocket: !!socket, socketReady });
      return;
    }
    
    // If socket is not connected, wait for it to connect
    if (!socket.connected) {
      console.log("Socket not connected, waiting for connection...");
      const handleConnect = () => {
        console.log("Socket connected, setting up listeners now");
        setupListeners();
      };
      socket.on('connect', handleConnect);
      return () => socket.off('connect', handleConnect);
    }
    
    // Socket is connected, set up listeners immediately
    setupListeners();
    
    function setupListeners() {
      const handleCodeChange = ({ code }) => {
        console.log("Editor received code from socket:", { 
          codeLength: code?.length, 
          codePreview: code?.substring(0, 50) + '...',
          hasEditor: !!editorRef.current 
        });
        if (code != null && editorRef.current) {
          const currentCode = editorRef.current.getValue();
          if (currentCode !== code) {
            console.log("Updating editor with received code");
            editorRef.current.setValue(code);
            // Also update the parent component's codeRef
            onCodeChange(code);
          } else {
            console.log("Code is the same, not updating");
          }
        } else {
          console.log("Cannot update editor:", { code: !!code, editor: !!editorRef.current });
        }
      };

      socket.on(ACTIONS.CODE_CHANGE, handleCodeChange);
      
      // Add a test listener to see if any events are being received
      const testListener = (data) => {
        console.log("Editor received ANY socket event:", data);
      };
      socket.onAny(testListener);

      return () => {
        if (socket) {
          socket.off(ACTIONS.CODE_CHANGE, handleCodeChange);
          socket.offAny(testListener);
        }
      };
    }
  }, [socketRef, onCodeChange, roomId, socketReady]);

  return (
    <div style={{ height: "100%", minHeight: 0 }}>
      <textarea id="realtimeEditor" />
    </div>
  );
}

export default Editor;
