import { Button, List, ListItemButton, ListSubheader } from "@mui/material";
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:6589?path=devtools";
import './Panel.scss';
import SideBar from "./Sidebar";

const Panel: React.FC = () => {
  const [connected, setConnected] = useState(false)
  const [projectsTree, setProjectsTree] = useState([]);
  
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on("projects_tree", data => {
      setProjectsTree(data);
    });
  }, []);

  return (
    <div className="main-container">
      <SideBar projectsTree={projectsTree} />
      <div className="main-content">
        <div className="header">
          { connected ? 
            <span className="con-info is-con">Connected to VSCode</span> :
            <span className="con-info not-cont">Not connected</span> 
          }
          <h1>CRO development tool</h1>
        </div>
        <div className="main-content-wrap">
          { connected ? 
            <div>Select a project on the left to activate it.</div> :
            <div>
              To start developing, start the development server.<br />
              After the server is started, you should be able to select project here to activate.
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Panel;