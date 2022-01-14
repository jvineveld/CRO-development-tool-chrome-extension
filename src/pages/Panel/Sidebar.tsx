import { Button, Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import React, { useState, useEffect } from "react";
import { transformName } from './helper'

interface CustomerTest {
	test: string,
	variations: Array<string>
}

interface ProjectsTreeCustomer {
	customer: string,
	tests: Array<CustomerTest>
}

type ProjectsTree = Array<ProjectsTreeCustomer>

const SideBar: React.FC<{projectsTree:ProjectsTree, refreshProjects: any, selectVariation: any}>  = ( props ) => {
	const [openInTree, setOpenInTree] = useState([])
	const [didRefresh, setDidRefresh] = useState(false)
	const projectsTree = props.projectsTree

	function toggleItem(key){
		var isOpen = openInTree.includes(key)
		if(isOpen){
			setOpenInTree(openInTree.filter(openKey => openKey !== key))
		} else {
			setOpenInTree([...openInTree, key])
		}
	}

	// to make sure it is visible the action was made
	function refreshListFnWrap(){
		props.refreshProjects()
		setDidRefresh(true)

		setTimeout(() => {
			setDidRefresh(false)
		}, 500)
	}

	return (
		<div className="sidebar">
			<List
			component="nav"
			aria-labelledby="nested-list-subheader"
			dense={true}
			subheader={
			  <ListSubheader component="div" id="header-refresh-list" onClick={refreshListFnWrap}>
				<span className="normal">Customers &amp; Campaigns</span>
				<span className="hovering">
					{didRefresh ? 'Refreshed list' : 'Refresh list'}
				</span>
			  </ListSubheader>
			}
		  >
			{projectsTree.map((customer, customerIndex) => {
				const customerId = customer.customer + customerIndex;
				return <div className="customer-block">
					<ListItemButton className="lvl-customer" onClick={() => toggleItem(customerId)} key={customerId}>
						<ListItemText primary={transformName(customer.customer)} />
						{openInTree.includes(customerId) ? '-' : '+'}
					</ListItemButton>
					<Collapse in={openInTree.includes(customerId)} timeout="auto" unmountOnExit>
						<List component="div" disablePadding dense={true}>
							{customer.tests.map((test, testIndex) => {
								const customerTestId = customer.customer+'/'+test.test+'/'+testIndex;
								return <>
									<ListItemButton className="lvl-campaign" onClick={() => toggleItem(customerTestId)} key={customerTestId}>
										<ListItemText primary={transformName(test.test)} />
										{openInTree.includes(customerTestId) ? '-' : '+'}
									</ListItemButton>
									<Collapse in={openInTree.includes(customerTestId)} timeout="auto" unmountOnExit>
										{test.variations.map((variation, variationIndex) => <ListItemButton onClick={() => props.selectVariation(customer.customer + '/' + test.test + '/' + variation)}  className="lvl-variation" key={customerTestId+variationIndex}>
											<ListItemText primary={transformName(variation)} />
										</ListItemButton>)}
									</Collapse>
								</>
							})}
						</List>
					</Collapse>
				</div>
			})}
			</List>
		</div>
	);
  };

export default SideBar;