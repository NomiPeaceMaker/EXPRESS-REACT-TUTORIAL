import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Uses localStorage for persistence
import authReducer from './authSlice';
import tasksReducer from './tasksSlice';

// Persist configuration for auth state
const authPersistConfig = {
  key: 'auth',
  storage, // Persist auth state in localStorage
};

// Wrap the authReducer with persistReducer
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

// Configure the Redux store
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // Auth state with persistence
    tasks: tasksReducer, // Regular tasks state
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store); // Export persistor for PersistGate
export default store;