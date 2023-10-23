import React from 'react';
import PropTypes from 'prop-types';
import '../styles/NoteItem.css';

function ArchivesButton({ id, onAddArchives }) {
    return <button className='note-item__archives' onClick={() => onAddArchives(id)}>Arsipkan</button>
}

ArchivesButton.propTypes = {
    id: PropTypes.string,
    onAddArchives: PropTypes.func.isRequired,
};

export default ArchivesButton;