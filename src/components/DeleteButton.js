import React from 'react';
import PropTypes from 'prop-types';
import '../styles/NoteItem.css';

function DeleteButton({ id, onDelete }) {
    return <button className='note-item__delete' onClick={() => onDelete(id)}>Hapus</button>
}

DeleteButton.propTypes = {
    id: PropTypes.string,
    onDelete: PropTypes.func.isRequired,
};

export default DeleteButton;