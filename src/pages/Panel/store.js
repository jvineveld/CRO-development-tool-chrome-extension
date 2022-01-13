import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
	  isConnected: false,
	  activeVariations: [],
	  projects_tree: []
  },
});
