
import { useState } from "react";
import { Note } from "../utils/types";
import { useDispatch } from "react-redux";
import { removeNote } from "../utils/noteSlice";

interface NoteCardProps {
  props: Note;
}

const NoteCards: React.FC<NoteCardProps> = ({ props }) => {
  
  const [cardHeading, setCardHeading] = useState<string>(props.heading);
  const [cardText, setCardText] = useState<string>(props.text);
  const [isEdit, setIsEdit] = useState<boolean>(false); 

  const dispatch = useDispatch();

  
  const handleDelete = (): void => {
    dispatch(removeNote(props.id!)); 
  };

 
  const handleEditToggle = (): void => {
    
    setIsEdit(!isEdit); 
  };

  return (
    <div className="card bg-primary-content w-96 shadow-xl m-4">
      <div className="card-body">
        <div>
         
          {isEdit ? (
            <input
              type="text"
              value={cardHeading}
              onChange={(e) => setCardHeading(e.target.value)}
              className="input input-bordered w-full mb-4"
            />
          ) : (
            <h2 className="card-title text-4xl w-full overflow-hidden text-ellipsis break-words">{cardHeading}</h2>
          )}
        </div>

        <div>
          {isEdit ? (
            <textarea
              value={cardText}
              onChange={(e) => setCardText(e.target.value)}
              className="textarea textarea-bordered w-full mb-4"
            />
          ) : (
            <p>{cardText}</p>
          )}
        </div>

        <div className="card-actions justify-end p-6">
          <button className="btn btn-outline btn-error" onClick={handleDelete}>
            Delete
          </button>
          <button
            className="btn btn-outline btn-success"
            onClick={handleEditToggle}
          >
            {isEdit ? "Save" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCards;
