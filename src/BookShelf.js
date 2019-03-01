import React from 'react'
import Book from './Book'


const BookShelf = (props) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.shelfTitle}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {props.books.map((book) => (<li key={book.id}><Book book={book} moveToShelf={props.moveToShelf}/></li>))}
                </ol>
            </div>
        </div>
    )

}

export default BookShelf
