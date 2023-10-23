import React from 'react';
import PropTypes from 'prop-types';
import '../styles/NoteItem.css';

function RestoreButton({ id, onRestoreNote }) {
    return <button className='note-item__restore' onClick={() => onRestoreNote(id)}>Pulihkan</button>
}

RestoreButton.propTypes = {
    id: PropTypes.string.isRequired,
    onRestoreNote: PropTypes.func.isRequired,
};

export default RestoreButton;