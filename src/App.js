import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import { Link, Route } from 'react-router-dom'
import SearchList from './SearchList'

class BooksApp extends React.Component {
    state = {
        books: []
    }

    componentDidMount(){

        BooksAPI.getAll().then((books) => {
          console.log(books)
            this.setState({books:books})
        })
    }

    moveToShelf = (theBook,oldShelf,newShelf) => {
        const book = this.state.books.filter((filterBook) => (filterBook.id===theBook.id))
        const localBook = book.length>0 ? book[0] : theBook
        BooksAPI.update(localBook,newShelf).then(localBook.shelf=newShelf)
        this.setState({books:this.state.books.filter((filterBook) => (filterBook.id!==theBook.id)).concat(localBook)})
    }

    render() {
        return (
            <div className="app">
                <Route path="/search" render={({history}) => (
                    <SearchList moveToShelf={this.moveToShelf}
                        library={this.state.books}
                        libraryName={['read','wantToRead','currentlyReading']}
                    />
                )}/>
                <Route exact path="/" render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>My Reads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <BookShelf books={this.state.books.filter((book) => (book.shelf==='currentlyReading'))} shelfCategory="Currently Reading" moveToShelf={this.moveToShelf}/>
                                <BookShelf books={this.state.books.filter((book) => (book.shelf==='wantToRead'))} shelfCategory="Want to read" moveToShelf={this.moveToShelf}/>
                                <BookShelf books={this.state.books.filter((book) => (book.shelf==='read'))} shelfCategory="Read" moveToShelf={this.moveToShelf}/>
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to="/search">Add a Book</Link>
                        </div>
                    </div>
                )}/>
            </div>
        )
    }
}

export default BooksApp
