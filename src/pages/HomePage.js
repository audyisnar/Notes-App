import React from 'react';
import PropTypes from 'prop-types';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import LocaleContext from '../contexts/LocaleContext';
import { useSearchParams } from 'react-router-dom';

import { getActiveNotes, deleteNote, archiveNote, searchActiveNotes } from '../utils/network-data';

function HomePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = React.useState(true);
    const [notes, setNotes] = React.useState([]);
    const [keyword, setKeyword] = React.useState(() => {
        return searchParams.get('keyword') || ''
    });

    const { lang } = React.useContext(LocaleContext);

    React.useEffect(() => {
        searchActiveNotes(keyword).then((data) => {
            setNotes(data);
        });
        setLoading(false);
    }, []);

    async function onDeleteHandler(id) {
        await deleteNote(id);

        const { error, data } = await getActiveNotes();
        if(!error) {
            setNotes(data);
        }
    }

    async function onArchivedHandler(id) {    
        const { error } = await archiveNote(id)
        if(!error) {
            const { error, data } = await getActiveNotes();
            if(!error) {
                setNotes(data);
            }
        }
    }

    async function onSearchHandler(keyword) {
        let note = await searchActiveNotes(keyword);
        setNotes(note);

        setKeyword(keyword);
        setSearchParams({ keyword });
    }
    
    return (
        <section>
            <h2 className='title-note'>{lang === "id" ? "Catatan Aktif" : "Active Notes"}</h2>
            <SearchBar search={onSearchHandler} defaultKeyword={keyword}/>
            {
                loading ? <p className='desc'>Loading . . .</p> : <NoteList notes={notes} onDelete={onDeleteHandler} onAddArchives={onArchivedHandler} />
            }
        </section>
    )
}

export default HomePage;