import { Button, ButtonGroup, Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import React, { useState, useEffect } from "react";
import { transformName } from './helper'
import { mdiContentCopy, mdiPlayCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';

export interface Variation {
	customer?: string,
	test?: string,
	variation?: string,
	stats?: object,
	js?: {
		headers: object,
		prodInfo?: {
			birthtime: number,
			mtime: number,
			size: number
		}
	},
	css?: {
		headers: object,
		prodInfo?: {
			birthtime: number,
			mtime: number,
			size: number
		}
	}
}

const VariationDetails: React.FC<{details:Variation}>  = ( { details } ) => {
	function copyJS(){

	}
	function downloadJS(){

	}
	function copyCSS(){
		
	}
	function downloadCSS(){
		
	}
	return (
		<div className="variation-details">
			<Button className="start-stop-test" variant="contained" size="small"><Icon path={mdiPlayCircleOutline} size={.8}/> Start test</Button>
			<h1>{transformName(details.customer)}</h1>
			<h3>{transformName(details.test)} &gt; {transformName(details.variation)}</h3>

			<div className="file-stats">
					<div className="js-stats" v-if="details.js">
						{ details.js.prodInfo.birthtime && <Button className="a-copy" onClick={copyJS} size="small" variant="outlined"><Icon path={mdiContentCopy} size={.5}/> Copy</Button> }
						<h3>Javascript</h3>
						{ !details.js.prodInfo.birthtime ? <div>
							No parsed JavaScript found. Has the file been compiled? (This happens on save)
						</div> : <div>
							<strong>Aangemaakt op:</strong>
							{
								details.js.prodInfo.birthtime
								// $moment(
								// 	details.js.prodInfo.birthtime
								// ).fromNow()
							}
							<br />
							<strong>Laatst bewerkt:</strong>
							{
								details.js.prodInfo.mtime
								// $moment(details.js.prodInfo.mtime).fromNow()
							}
							<br />
							<strong>Grootte:</strong>
							{ details.js.prodInfo.size } bytes ({
								details.js.prodInfo.size / 1000
							}
							kb)
							</div>}
					</div>
					<div className="css-stats" v-if="details.css">
						{ details.css.prodInfo.birthtime && <Button className="a-copy" onClick={copyCSS}  size="small" variant="outlined"><Icon path={mdiContentCopy} size={.5}/> Copy</Button> }
						<h3>CSS</h3>
						{ !details.css.prodInfo.birthtime ? <div>
							No parsed SCSS found. Has the file been compiled? (This happens on save)
						</div> : <div>
							<strong>Aangemaakt op:</strong>
							{
								details.css.prodInfo.birthtime
								// $moment(
								// 	details.css.prodInfo.birthtime
								// ).fromNow()
							}
							<br />
							<strong>Laatst bewerkt:</strong>
							{
								details.css.prodInfo.mtime
								// $moment(details.css.prodInfo.mtime).fromNow()
							}
							<br />
							<strong>Grootte:</strong>
							{ details.css.prodInfo.size } bytes ({
								details.css.prodInfo.size / 1000
							}
							kb)
						</div> }
					</div>
				</div>
			</div>
	);
  };

export default VariationDetails;