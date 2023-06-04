import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import facenetReducer from '../features/auth/facenetSlice'
import userReducer from '../features/dashboard/userSlice'
import matchReducer from '../features/dashboard/matchSlice'
import detectReducer from '../features/dashboard/detectSlice'
import similarityReducer from '../features/dashboard/similaritySlice'
import TouristSliceReducer from '../features/dashboard/counterTouristSlice'
import employeeSlice from '../features/dashboard/employeeSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        facenet: facenetReducer,
        user: userReducer,
        match: matchReducer,
        detect: detectReducer,
        similarity: similarityReducer,
        counter: TouristSliceReducer,
        employee: employeeSlice
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
    }),
})
