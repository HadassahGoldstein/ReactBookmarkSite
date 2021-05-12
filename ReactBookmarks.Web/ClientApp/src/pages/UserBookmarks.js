import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BookmarkRow from '../components/BookmarkRow';

export default function UserBookmarks() {
    const { user } = useAuthContext();
    const [bookmarks, setBookmarks] = useState([]);
    useEffect(() => {

        getUserBookmarks();
    }, [])
    const getUserBookmarks = async () => {
        const { data } = await axios.get('/api/bookmarks/getUserBookmarks');
        setBookmarks(data);
    }

    const onUpdateClick = async (bookmark) => {       
        await axios.post('/api/bookmarks/updatebookmark', bookmark);
        getUserBookmarks();

    }
    const onDeleteClick = async (id) => {        
        await axios.post('/api/bookmarks/deleteBookmark', { bookmarkId: id });       
        getUserBookmarks();
    }
    return (
        <>
            <h1>Welcome back {user.firstName} {user.lastName} </h1>
            <div className='row'>
                <Link to="/AddBookmark" className='btn btn-primary btn-block'>Add Bookmark</Link>
            </div>
            <table className='table table-striped table-hover table-bordered mt-2'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Url</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {bookmarks.map(b => <BookmarkRow bookmark={b} key={b.id} onUpdateClick={onUpdateClick} onDeleteClick={() => onDeleteClick(b.id)} />)}
                </tbody>
            </table>
        </>
    )
}