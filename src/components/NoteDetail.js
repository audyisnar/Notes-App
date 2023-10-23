import React from 'react-router-dom';
import PropTypes from 'prop-types';
import DeleteButton from './DeleteButton';
import ArchivesButton from './ArchivesButton';
import RestoreButton from './RestoreButton';

import '../styles/NoteDetail.css';

function NoteDetail({ title, createdAt, body, archived, id, onDelete, onAddArchives, onRestoreNote }) {
    return(
        <div className='note-detail'>
            <h3 className='note-detail__title'>{title}</h3>
            <p className='note-detail__createdAt'>{createdAt}</p>
            <p className='note-detail__content'>{body}</p>
            <DeleteButton id={id} onDelete={onDelete} />
            {
                archived ? <RestoreButton id={id} onRestoreNote={onRestoreNote} /> : <ArchivesButton id={id} onAddArchives={onAddArchives} />
            }
        </div>
    );
}

NoteDetail.propTypes = {
    title: PropTypes.string,
    createdAt: PropTypes.string,
    body: PropTypes.string,
    archived: PropTypes.bool,
    id: PropTypes.string,
    onDelete: PropTypes.func.isRequired,
    onAddArchives: PropTypes.func.isRequired,
    onRestoreNote: PropTypes.func.isRequired,
};

export default NoteDetail;