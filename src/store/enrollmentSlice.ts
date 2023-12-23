import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "./store";
import { Student } from "@/types/student";
import { Class } from "@/types/class";

export interface EnrollmentState {
  currentStudent?: Student;
  currentClasses: Class[];
  classesError?: boolean;
}

const initialState: EnrollmentState = {
  currentClasses: []
};

export const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    setClassesError(state) {
      state.classesError = true;
    },
    setCurrentStudent(state, action) {
      state.currentStudent = action.payload ? action.payload : state.currentStudent;
    },
    setCurrentClasses(state, action) {
      state.currentClasses = action.payload ? action.payload : state.currentClasses;
      state.classesError = false;
    },
    addClassToCurrentClass(state, action) {
      // ensures that classes are unique
      if(action.payload && state.currentClasses.filter(classObj => classObj._id === action.payload._id).length === 0){
        state.currentClasses = [...state.currentClasses, action.payload];
        state.classesError = false;
      }
    },
    [HYDRATE]: (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  }}
});

export const { setClassesError, setCurrentStudent, setCurrentClasses, addClassToCurrentClass } = enrollmentSlice.actions;
export const selectEnrollmentState = (state: AppState) => state.enrollment;

export default enrollmentSlice.reducer;