import React from 'react';
import PropTypes from 'prop-types';
import NoteItemBody from './NoteItemBody';
import DeleteButton from './DeleteButton';
import ArchivesButton from './ArchivesButton';
import RestoreButton from './RestoreButton';
import '../styles/NoteItem.css';

function NoteItem({ title, createdAt, body, archived, id, onDelete, onAddArchives, onRestoreNote }) {
    return(
        <div className='note-item' id={title}>
            <NoteItemBody id={id} title={title} createdAt={createdAt} body={body} />
            <DeleteButton id={id} onDelete={onDelete} />
            {
                archived ? <RestoreButton id={id} onRestoreNote={onRestoreNote} /> : <ArchivesButton id={id} onAddArchives={onAddArchives} />
            }
        </div>
    );
}

NoteItem.propTypes = {
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onAddArchives: PropTypes.func,
    onRestoreNote: PropTypes.func,
};

export default NoteItem;