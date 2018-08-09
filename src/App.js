import React from 'react'
import { debounce } from 'lodash'
import { Switch, Route } from 'react-router-dom'
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
      // eslint-disable-next-line
      books.map(book => {
        this.fixEmptyMissingProperties(book)
      })

      this.setState({...this.state, shelves: {
        ...this.state.shelves,
          currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
          wantToRead: books.filter(book => book.shelf === 'wantToRead'),
          read: books.filter(book => book.shelf === 'read')
      }})
    })
  }


    fixEmptyMissingProperties = (book) => {
      if (!('shelf' in book)) {
        book.shelf = 'none'
      }

      if (!('authors' in book)) {
        book.authors = ' '
      }

      if (!('imageLinks' in book)) {
        book.imageLinks = {thumbnail: nocover}
      }
    }



  handleChange = (e, book) => {
    const oldShelf = book.shelf
    const newShelf = e.target.value

    // we need our event to stick around a little longer
    e.persist();

    // put the book on the shelf the user selected
    book.shelf= newShelf;

    this.fixEmptyMissingProperties(book)

    // update the books location in the API so that it reflects this change when we reload the main page
    BooksAPI.update(book,newShelf);

    // Remove our book from the old shelf and place it on the new shelf
    this.setState({shelves: {
      ...this.state.shelves,
        [oldShelf]: [...this.state.shelves[oldShelf]].filter( b => b.id !== book.id),
        [newShelf]: this.state.shelves[newShelf].concat(book)
      }
    },
      // show me the locations of all of the books on my shelves
      () => {console.log(this.state.shelves)})
    }

  // clear our query and searchResults
  clearQuery = () => {
   this.setState({
     query: '',
     searchResults: []
    })
  }


  // take the user input and set it in our state, then call search to look for books in category
  updateQuery = (query) => {
    this.setState({
      query: query
    });
    this.search(query);
  }



  // search for books by the string the user input
  search = (query) => {

    // if the searchBar is empty clear/ed clear the searchResults too
    if (query === '') {
      this.setState({
        searchResults: []
      });
      return;
    }

    // make a call to our API to search for the term then lets look at the results
    BooksAPI.search(query)
    .then((books) => {

      // make one array of books out of all the books on my shelves
      let bookshelves = this.state.shelves.currentlyReading.concat(this.state.shelves.wantToRead, this.state.shelves.read);

      // insure we have a clean search to start with
      this.setState({ searchResults: [] })

      // loop over the books and for each book
      // eslint-disable-next-line
      books.map(book => {

        // fix missing or empty properties
        this.fixEmptyMissingProperties(book)

        // then loop over all the books on our shelves
        // eslint-disable-next-line
        bookshelves.map(item => {

          // is there a book in our searchResults that is already on our shelves
          if (item.id === book.id) {

            // Tell me which book and what shelf it was found on
            console.log(`We have a Match ${book.title} ${item.shelf}`);

            // set the book.shelf in our searchResults so that it reflects its position on our shelf
            book.shelf= item.shelf;
          }

        })

        // now we need to push that book into an array so React can display it
        this.setState({
          searchResults: this.state.searchResults.concat(book)
        },
        // show me the book and let's make sure it was added to the state correctly
        () => console.log(book, this.state.searchResults)
        )


    })
    }).catch( error => {

      // if there is an error, and it has a message, and that message includes books.map is not a function - then we either had an invalid search or nothing was returned for our search term
      if (error.hasOwnProperty('message') && error.message.includes('books.map is not a function')) {
        alert('Your search was invalid or returned no results, please try again!');
      }


    })
  }




  render() {
    return (
      <div className="app">
        <Switch>
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
      </Switch>
      </div>

    )}
}

export default BooksApp
