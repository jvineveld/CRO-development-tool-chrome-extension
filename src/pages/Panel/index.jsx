import React from 'react';
import { render } from 'react-dom';

import Panel from './Panel';
import './index.scss';
import { Provider } from 'react-redux'
import store from './store'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';


const theme = createTheme({
	palette: {
	  primary: {
		// Purple and green play nicely together.
		main: blue[400],
	  },
	  secondary: {
		// This is green.A700 as hex.
		main: '#11cb5f',
	  },
	},
  });
  

render(<ThemeProvider theme={theme}>
	<Provider store={store}>
		<Panel />
	</Provider>
</ThemeProvider>, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
