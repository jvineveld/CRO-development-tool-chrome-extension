import { Button, ButtonGroup, Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import React, { useState, useEffect } from "react";
import { transformName } from './helper'
import { mdiStopCircleOutline, mdiPlayCircleOutline, mdiChevronRight } from '@mdi/js';
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

const VariationDetails: React.FC<{details:Variation, startTest:any, stopTest: any, isActive: boolean}>  = ( { details, startTest, stopTest, isActive } ) => {
	return (
		<div className="variation-details">
			<Button className="start-stop-test" onClick={isActive ? stopTest : startTest} variant="contained" size="small"><Icon path={isActive ? mdiStopCircleOutline : mdiPlayCircleOutline} size={.8}/> {isActive ? 'Stop' : 'Start'} test</Button>
			<h1>{transformName(details.customer, true)}</h1>
			<h3 className="campaign-variation-title">{transformName(details.test)} {details.variation ? <><Icon path={mdiChevronRight} size={1}/> {transformName(details.variation)}</> : null}</h3>

			<div className="file-stats">
					<div className="js-stats" v-if="details.js">
						{/* { details.js.prodInfo.birthtime && <Button className="a-copy" onClick={() => copyDetails('JS')} size="small" variant="outlined"><Icon path={mdiContentCopy} size={.5}/> Copy</Button> } */}
						<h3>Javascript</h3>
						{ details.js && details.js.prodInfo ? !details.js.prodInfo.birthtime ? <div>
							No parsed JavaScript found. Has the file been compiled? (This happens on save)
						</div> : <div>
							<strong>Created on:</strong>
							{
								details.js.prodInfo.birthtime
								// $moment(
								// 	details.js.prodInfo.birthtime
								// ).fromNow()
							}
							<br />
							<strong>Last change:</strong>
							{
								details.js.prodInfo.mtime
								// $moment(details.js.prodInfo.mtime).fromNow()
							}
							<br />
							<strong>File size:</strong>
							{ details.js.prodInfo.size } bytes ({
								details.js.prodInfo.size / 1000
							}
							kb)
							</div> : 'No JS compiled.'}
					</div>
					<div className="css-stats" v-if="details.css">
						{/* { details.css.prodInfo.birthtime && <Button className="a-copy" onClick={() => copyDetails('CSS')}  size="small" variant="outlined"><Icon path={mdiContentCopy} size={.5}/> Copy</Button> } */}
						<h3>CSS</h3>
						{ details.css && details.css.prodInfo ? !details.css.prodInfo.birthtime ? <div>
							No parsed SCSS found. Has the file been compiled? (This happens on save)
						</div> : <div>
							<strong>Created on:</strong>
							{
								details.css.prodInfo.birthtime
								// $moment(
								// 	details.css.prodInfo.birthtime
								// ).fromNow()
							}
							<br />
							<strong>Last change:</strong>
							{
								details.css.prodInfo.mtime
								// $moment(details.css.prodInfo.mtime).fromNow()
							}
							<br />
							<strong>File size:</strong>
							{ details.css.prodInfo.size } bytes ({
								details.css.prodInfo.size / 1000
							}
							kb)
						</div> : 'No CSS compiled.' }
					</div>
				</div>
			</div>
	);
  };

export default VariationDetails;