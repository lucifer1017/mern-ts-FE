export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    
  }
  export interface Note {
    id?:string;
    heading: string;
    text: string;
  }
 
  export interface RootState {
    user: User  | null; 
    note: Note[] | null;
  }