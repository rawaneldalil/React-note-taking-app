import { useParams, Navigate, useOutletContext } from "react-router-dom";
import { Note } from "../App";
import { Outlet } from "react-router-dom";

type NoteLayoutProps = { 
    notes: Note[]
 }

function NoteLayout ({ notes }:NoteLayoutProps) {
    const { id } = useParams();
    const note = notes.find(n  => n.id === id);

    if (note == null) <Navigate to='/' replace/>
    return (
        <Outlet context={ note }/>
    )
}

export default NoteLayout;

export function useNote() {
    return useOutletContext<Note>();
}