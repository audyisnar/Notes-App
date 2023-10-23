import React from 'react';
import PropTypes from 'prop-types';
import NoteItem from './NoteItem';
import '../styles/NoteList.css';

function NoteArchivesList({ notes, onDelete, onRestoreNote }){
    return (
        <div className='note-list'>
            {
                notes.length === 0 ? <p>Tidak ada Catatan</p> : 
                notes.map((note) => {
                        return <NoteItem key={note.id} id={note.id} onDelete={onDelete} onRestoreNote={onRestoreNote} archived={note.archived} {...note}/>;
                })
            }
        </div>
    );
}

NoteArchivesList.propTypes = {
    notes: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onRestoreNote: PropTypes.func.isRequired,
};

export default NoteArchivesList;