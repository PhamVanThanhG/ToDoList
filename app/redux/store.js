import { configureStore } from '@reduxjs/toolkit'
import taskReducer from '../redux/task'
export default configureStore({
  reducer: {
    task: taskReducer
  }
})