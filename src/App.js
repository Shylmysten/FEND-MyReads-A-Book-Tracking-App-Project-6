import React from 'react'
import { debounce } from 'lodash'
import { Route } from 'react-router-dom'
import Library from './components/Library'
import Search from './components/search'
import * as BooksAPI from './utils/BooksAPI'
import nocover from './icons/nocover.jpg'
import './App.css'

class BooksApp extends React.Component {
  constructor() {
    super();
    this.state = {
      query: '',
      searchResults: [],
      shelves: {
        currentlyReading: [],
        wantToRead: [],
        read: [],
        none: []
      }
    }
    this.updateQuery = debounce(this.updateQuery, 500);
    this.handleChange = this.handleChange.bind(this)
    this.clearQuery = this.clearQuery.bind(this)
  }





  componentDidMount() {

    BooksAPI.getAll().then((books) => {
      books.map(book => {
        if (!('authors' in book)) {
          book.authors = ' '
        }

        if (!('imageLinks' in book)) {
          book.imageLinks = {thumbnail: nocover}
        }
      })

      this.setState({...this.state, shelves: {
        ...this.state.shelves,
          currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
          wantToRead: books.filter(book => book.shelf === 'wantToRead'),
          read: books.filter(book => book.shelf === 'read')
      }})
    })
  }


  handleChange(e, book) {
    const oldShelf = book.shelf
    // console.log(book.shelf);
    e.persist();
    book.shelf= e.target.value;
    if (!('authors' in book)) {
      book.authors = ' '
    }

    if (!('imageLinks' in book)) {
      book.imageLinks = {thumbnail: nocover}
    }
    BooksAPI.update(book, e.target.value);
    this.setState({shelves: {
      ...this.state.shelves,
        [oldShelf]: [...this.state.shelves[oldShelf]].filter( b => b.id !== book.id),
        [e.target.value]: this.state.shelves[e.target.value].concat(book)
      }
    }, () => {console.log(this.state.shelves)})
  }


  clearQuery = () => {
   this.setState({
     query: '',
     searchResults: []
    })
  }



  updateQuery = (query) => {
    this.setState({
      query: query
    });
    this.search(query);
  }




  search = (query) => {

    if (query === '') {
      this.setState({
        searchResults: []
      });
      return;
    }

    BooksAPI.search(query)
    .then((books) => {

      let bookshelves = this.state.shelves.currentlyReading.concat(this.state.shelves.wantToRead, this.state.shelves.read);

      this.setState({ searchResults: [] })

      books.map(book => {

        if (!('shelf' in book)) {
          book.shelf = 'none'
        }

        if (!('authors' in book)) {
          book.authors = ' '
        }

        if (!('imageLinks' in book)) {
          book.imageLinks = {thumbnail: nocover}
        }

        bookshelves.map(item => {

          if (item.id === book.id) {
            console.log(`We have a Match ${book.title} ${item.shelf}`);
            book.shelf= item.shelf;
          }

        })
        this.setState({
          searchResults: this.state.searchResults.concat(book)
        },
        () => console.log(book, this.state.searchResults)
       )


    })
    }).catch( error => {


      if (error.hasOwnProperty('message') && error.message.includes('books.map is not a function')) {
        alert('Your search was invalid or returned no results, please try again!');
      }


    })
  }




  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Library
            shelves={this.state.shelves}
            handleChange={this.handleChange}
          />
        )}/>
        <Route path='/search' render={() => (
          <Search
            shelves={this.state.shelves}
            handleChange={this.handleChange}
            updateQuery={this.updateQuery}
            searchResults={this.state.searchResults}
            clearQuery={this.clearQuery}
          />
        )}/>
      </div>

    )}
}

export default BooksApp
