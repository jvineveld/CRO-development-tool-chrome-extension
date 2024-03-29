import { Button, List, ListItemButton, ListSubheader } from "@mui/material";
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:6589?path=devtools";
import './Panel.scss';
import SideBar from "./Sidebar";
import VariationDetails from "./VariationDetails";
import { Variation } from './VariationDetails'
import docCommunicator from './docCommunicator'
import ActiveTest from './ActiveTest'

const socket = socketIOClient(ENDPOINT);

function isActiveTest(activeTests, testInfo): boolean{
  return !!activeTests.filter(test => test.customer === testInfo.customer && test.test === testInfo.test && test.variation === testInfo.variation).length
}

const Panel: React.FC = () => {
  const [connected, setConnected] = useState(false)
  const [projectsTree, setProjectsTree] = useState([]);
  const [activeVariation, setActiveVariation] = useState(false)
  const [loading, setLoading] = useState(false)
  const [testInfo, setTestInfo] = useState<Variation>({})
  const [activeTests, setActiveTests] = useState([])

  function fetchActiveTests(){
    docCommunicator.fetchActiveTests().then(tests => {
      if(!tests.length){
        return setActiveTests([])
      }
      setActiveTests(tests)
    })
  }

  useEffect(() => {
    
    socket.on("connect", () => {
      setConnected(socket.connected)
    });
    socket.on("projects_tree", data => {
      setProjectsTree(data);
    });

    socket.on("got_test_info", data => {
      // console.log('got test info response', data)
      setLoading(false);
      setTestInfo(data.info);
    });

    socket.on("css_file_contents", contents => {
      // console.log('got test info response', contents)
			// copyToClipboard(contents);
      navigator.clipboard.writeText(contents)
    });

    socket.on("js_file_contents", contents => {
      // console.log('got test info response', contents)
      navigator.clipboard.writeText(contents)
			// copyToClipboard(contents);
    });

    fetchActiveTests()
  }, []);

  function refreshProjects(){
    socket.emit('get_projects_tree')
  }

  function selectVariation(variationPath){
    console.log('should activate', {variationPath})
    setLoading(true);
		socket.emit('get_test_info', { testPath: variationPath });
  }

  async function startTest(){
		await docCommunicator.activateTest(testInfo);
		setTimeout(() => fetchActiveTests(), 20);
	}

  async function stopTest(){
    await docCommunicator.disableTest(testInfo);
		setTimeout(() => fetchActiveTests(), 500);
  }

  return (
    <div className="main-container">
      { connected && <SideBar projectsTree={projectsTree} refreshProjects={refreshProjects} selectVariation={selectVariation}/> }
      <div className="main-content">
        <div className="header">
          { connected ? 
            <span className="con-info is-con">Connected to VSCode</span> :
            <span className="con-info not-cont">Not connected</span> 
          }
          <h1>CRO <span>development tool</span></h1>

          { activeTests.length ? <div className="active-tests">{activeTests.map((test, testIndex) => <ActiveTest activeTest={test} selectVariation={selectVariation} key={'active-test'+testIndex} />)}</div> : null}
        </div>
        <div className="main-content-wrap">
          { connected ? 
            <div>
              {loading && <div className="loading-wrap">Loading campaign..</div>}
              {testInfo.customer && <VariationDetails details={testInfo} startTest={startTest} stopTest={stopTest} isActive={isActiveTest(activeTests, testInfo)}/>}
              {!testInfo.customer && !testInfo && 'Select a project on the left to activate it.'}
            </div> :
            <div>
              To start developing, start the development server.<br />
              After the server is started, you should be able to select a project here to activate.
            </div>
          }
          <div className="footnote">By Jonas van Ineveld - 2019-{new Date().getFullYear()}</div>
        </div>
      </div>
    </div>
  );
};

export default Panel;