import React from 'react';
import PropTypes from 'prop-types';
import NoteArchivesList from '../components/NoteArchivesList';
import SearchBar from '../components/SearchBar';
import { getArchivedNotes, deleteNote, unarchiveNote, searchArchivedNotes} from '../utils/network-data';
import { useSearchParams } from 'react-router-dom';

function ArchivePageWrapper() {
    const [searchParams, setSearchParams] = useSearchParams();

    const title = searchParams.get('title');

    function changeSearchParams(keyword) {
        setSearchParams({ title: keyword });
    }

    return <ArchivePage onSearch={changeSearchParams} activeKeyword={title}/>
}

class ArchivePage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            notes: [],
        }

        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onRestoreHandler = this.onRestoreHandler.bind(this);
        this.onSearchHandler = this.onSearchHandler.bind(this);
    }

    async onDeleteHandler(id) {
        await deleteNote(id);
    
        const { error, data } = await getArchivedNotes();
        if(!error) {
            this.setState(() => {
                return {
                    notes: data,
                }
            });
        }
    }

    async onRestoreHandler(id) {    
        const { error } = await unarchiveNote(id);
        if(!error) {
            const { error, data } = await getArchivedNotes();
            if(!error){
                this.setState(() => {
                    return {
                        notes: data,
                    }
                });
            }
        }
    }

    async onSearchHandler(keyword) {
        let note = await searchArchivedNotes(keyword);
        this.setState(() => {
            return {
                notes: note
            };
        });
        this.props.onSearch(keyword);
    }

    async componentDidMount() {
        if(this.props.activeKeyword === null){
            const { error, data } = await getArchivedNotes();
            if(!error){
                this.setState(() => {
                    return {
                        notes: data,
                    }
                });
            }
        } else {
            let note = await searchArchivedNotes(this.props.activeKeyword);
            this.setState(() => {
                return {
                    notes: note
                };
            });
        }
    }

    render() {
        return(
            <section>
                <h2 className='title-note'>Catatan Arsip</h2>
                <SearchBar search={this.onSearchHandler} defaultKeyword={this.props.activeKeyword}/>
                <NoteArchivesList notes={this.state.notes} onDelete={this.onDeleteHandler} onRestoreNote={this.onRestoreHandler} />
            </section>
        );
    }
}

ArchivePage.propTypes = {
    onSearch: PropTypes.func.isRequired,
    activeKeyword: PropTypes.string,
};

export default ArchivePageWrapper;