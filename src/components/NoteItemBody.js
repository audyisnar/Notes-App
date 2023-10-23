import React from 'react';
import PropTypes from 'prop-types';
import { showFormattedDate } from '../utils/index';
import { Link } from 'react-router-dom';
import '../styles/NoteItemBody.css';

function NoteItemBody({ id, title, createdAt, body }){
    const date = showFormattedDate(createdAt);
    
    return(
        <div className='note-item__body'>
            <Link to={`/detail-catatan/${id}`}><h3 className='note-item__title'>{title}</h3></Link>
            <p className='note-item__createdAt'>{date}</p>
            <p className='note-item__content'>{body}</p>
        </div>
    );
}

NoteItemBody.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
};

export default NoteItemBody;