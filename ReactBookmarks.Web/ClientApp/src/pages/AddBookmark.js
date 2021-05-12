import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../AuthContext';

export default function AddBookMark() {   
    const history = useHistory();
    const { bookmarkContent, setBookmarkContent }= useAuthContext();

    const onFormSubmit = async e => {
        e.preventDefault();
        await axios.post('/api/bookmarks/addBookmark', bookmarkContent);
        setBookmarkContent({})
        history.push('/UserBookmarks');
    }
    const textChange = (e) => {
        const copy = { ...bookmarkContent };
        copy[e.target.name] = e.target.value;
        setBookmarkContent(copy);
    }    
    return (
        <div className="row">
            <div className="col-md-6 offset-md-3 card card-body bg-light">
                <h3>Add Bookmark</h3>
                <form onSubmit={onFormSubmit}>
                    <input type="text" name="title" placeholder="Title" value={bookmarkContent.title} className="form-control" onChange={textChange} />
                    <br />
                    <input type="text" name="url" placeholder="Url" value={bookmarkContent.url} className="form-control" onChange={textChange} />
                    <br />
                    <button className="btn btn-primary">Add</button>
                </form>
            </div>
        </div>
    )
}