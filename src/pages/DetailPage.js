import React from 'react';
import PropTypes from 'prop-types';
import NoteDetail from '../components/NoteDetail';
import { useParams, useNavigate } from 'react-router-dom';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';

import '../styles/NoteDetail.css';

function DetailPageWrapper() {
    const { id } = useParams();
    const navigation = useNavigate();
    return <DetailPage id={id} navigation={navigation} />;
}

class DetailPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            note: [],
        };

        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onArchivedHandler = this.onArchivedHandler.bind(this);
        this.onRestoreHandler = this.onRestoreHandler.bind(this);
    }

    async onDeleteHandler(id) {
        const { error } = await deleteNote(id);
        if(!error) {
            this.props.navigation('/');
        }
    }

    async onArchivedHandler(id) {    
        const { error } = await archiveNote(id);
        if(!error) {
            this.props.navigation('/arsip');
        }
    }

    async onRestoreHandler(id) {    
        const { error } = await unarchiveNote(id)
        if(!error) {
            this.props.navigation('/');
        }
    }

    async componentDidMount() {
        const { error, data } = await getNote(this.props.id);
        if(!error) {
            this.setState(() => {
                return {
                    note: data
                }
            })
        }
    }

    render () {
        return (
            <div className='detailPage'>
                <NoteDetail onDelete={this.onDeleteHandler} onAddArchives={this.onArchivedHandler} onRestoreNote={this.onRestoreHandler} {...this.state.note}/>
            </div>
        );
    }
}

DetailPage.propTypes = {
    id: PropTypes.string.isRequired,
    navigation: PropTypes.func.isRequired,
}

export default DetailPageWrapper;