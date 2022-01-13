import { Button, Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import React, { useState, useEffect } from "react";

interface CustomerTest {
	test: string,
	variations: Array<string>
}

interface ProjectsTreeCustomer {
	customer: string,
	tests: Array<CustomerTest>
}

type ProjectsTree = Array<ProjectsTreeCustomer>

const SideBar: React.FC<{projectsTree:ProjectsTree}>  = ( props ) => {
	const [openInTree, setOpenInTree] = useState([])
	const projectsTree = props.projectsTree

	function toggleItem(key){
		var isOpen = openInTree.includes(key)
		if(isOpen){
			setOpenInTree(openInTree.filter(openKey => openKey !== key))
		} else {
			setOpenInTree([...openInTree, key])
		}
	}

	return (
		<div className="sidebar">
			<List
			component="nav"
			aria-labelledby="nested-list-subheader"
			dense={true}
			subheader={
			  <ListSubheader component="div" id="nested-list-subheader">
				Customers &amp; Campaigns
			  </ListSubheader>
			}
		  >
			{projectsTree.map(customer => {
				const customerId = customer.customer;
				return <div className="customer-block">
					<ListItemButton className="lvl-customer" onClick={() => toggleItem(customerId)}>
						<ListItemText primary={customer.customer} />
						{openInTree.includes(customerId) ? '-' : '+'}
					</ListItemButton>
					<Collapse in={openInTree.includes(customerId)} timeout="auto" unmountOnExit>
						<List component="div" disablePadding dense={true}>
							{customer.tests.map(test => {
								const customerTestId = customer.customer+'/'+test.test;
								return <>
									<ListItemButton className="lvl-campaign" onClick={() => toggleItem(customerTestId)}>
										<ListItemText primary={test.test} />
										{openInTree.includes(customerTestId) ? '-' : '+'}
									</ListItemButton>
									<Collapse in={openInTree.includes(customerTestId)} timeout="auto" unmountOnExit>
										{test.variations.map(variation => <ListItemButton  className="lvl-variation">
											<ListItemText primary={variation} />
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