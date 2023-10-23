import React from 'react';
import PropTypes from 'prop-types';
import NoteItem from './NoteItem';
import '../styles/NoteList.css';

function NoteList({ notes, onDelete, onAddArchives }){  
    return (
        <div className='note-list'>
            {
                notes.length === 0 ? <p>Tidak ada Catatan</p> : 
                notes.map((note) => {
                        return <NoteItem key={note.id} id={note.id} onDelete={onDelete} onAddArchives={onAddArchives} archived={note.archived} {...note}/>;
                })
            }
        </div>
    );
}

NoteList.propTypes = {
    notes: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onAddArchives: PropTypes.func.isRequired,
};

export default NoteList;