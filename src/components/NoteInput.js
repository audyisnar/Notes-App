import React from 'react';
import PropTypes from 'prop-types';
import '../styles/NoteInput.css';

class NoteInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: '',
        }

        this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
        this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
    }

    onTitleChangeEventHandler(event) {
        const limit = 50;
        const sumInput = event.target.value.length;
        const sisaKarakterUpdate = limit - sumInput;

        document.getElementById('notifikasiSisaKarakter').style.display = 'block';

        if (sisaKarakterUpdate <= 0) {
            document.getElementById('sisaKarakter').innerText = 'Batas maksimal tercapai!';
            document.getElementById('notifikasiSisaKarakter').style.color = 'red';
        } else {
            document.getElementById('sisaKarakter').innerText = sisaKarakterUpdate.toString();
            document.getElementById('notifikasiSisaKarakter').style.color = 'black';
        }

        this.setState(() => {
            return {
                title: event.target.value.slice(0, limit),
            }
        });
    }
    
    onBodyChangeEventHandler(event) {
        this.setState(() => {
            return {
                body: event.target.value,
            }
        });
    }

    onSubmitEventHandler(event) {
        event.preventDefault();
        this.props.addNote(this.state);
    }

    render() {
        return (
            <div className='note-input'>
                <h2>Buat Catatan Baru</h2>
                <form className='note-input__form' onSubmit={this.onSubmitEventHandler}>
                    <input type="text" size="35" value={this.state.title} onChange={this.onTitleChangeEventHandler} placeholder="Judul Catatan" />
                    <span id="notifikasiSisaKarakter">Sisa karakter : <span id="sisaKarakter"></span></span>
                    <textarea rows="4" cols="35" name="noteContent" value={this.state.body} onChange={this.onBodyChangeEventHandler} placeholder='Tulis catatan Anda di sini . . .' />
                    <button type="submit">TAMBAH</button>
                </form>
            </div>
        )
    }
}

NoteInput.propTypes = {
    addNote: PropTypes.func.isRequired,
}

export default NoteInput;