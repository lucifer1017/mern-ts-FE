import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Note } from "./types";
const initialState:Note[]=[]
const noteSlice=createSlice({
    name:"note",
    initialState,
    reducers:{
        addNote:(state,action:PayloadAction<Note>)=>{
           const newNote={
            ...action.payload,
            id:uuidv4()
           };
           state.push(newNote)
        },
        removeNote:(state,action:PayloadAction<string>)=>{
            const newInitailState=state.filter((obj:Note)=>{
                return obj.id!==action.payload
            });
            return newInitailState;
        }
    }

});

export const {addNote,removeNote}=noteSlice.actions;
export default noteSlice.reducer;