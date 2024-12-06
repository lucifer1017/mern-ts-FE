import { useDispatch, useSelector } from "react-redux"
import NoteCards from "./NoteCard"
import { addNote } from "../utils/noteSlice";
import { Note, RootState } from "../utils/types";




const Notes = () => {
    const notes=useSelector((store:RootState)=>store.note);
    const dispatch=useDispatch();
    const handleAddNote=():void=>{
        const defaultNote={
            heading:"Default Heading",
            text:"Default text, kindly add more here"
        }
        dispatch(addNote(defaultNote));

    }
  return (
    <div className="flex flex-wrap m-4 p-4 items-center">
       
           {notes && notes.map((noteObj:Note)=>{
               return <NoteCards key={noteObj.id} props={noteObj}/>
            })}
        
        <button className="btn btn-outline btn-primary mx-7"
        onClick={handleAddNote}>Add Note</button>
    </div>
  )
}

export default Notes