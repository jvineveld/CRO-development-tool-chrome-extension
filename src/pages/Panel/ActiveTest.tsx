import { Button, Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import React, { useState, useEffect } from "react";
import { transformName } from './helper'

interface ActiveTest{
	customer: String,
	test: String,
	variation: String,
	js: Object,
	css: Object,
	stats: Object
}

const SideBar: React.FC<{ activeTest: ActiveTest, selectVariation: any }>  = ( { activeTest, selectVariation } ) => {
	return (
		<Button className="active-test" onClick={() => selectVariation(activeTest.customer + '/' + activeTest.test + (activeTest.variation ? '/' + activeTest.variation : ''))}>
			<strong>Currently active:</strong> {activeTest.customer} / {activeTest.test} {activeTest.variation ? ' / ' + activeTest.variation : ''}
		</Button>
	);
  };

export default SideBar;