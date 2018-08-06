import React from 'react'
import { Route } from 'react-router-dom'
import Library from './components/Library'
import Search from './components/search'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  constructor() {
    super();
    this.state = {
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
      shelves: {
        currentlyReading: [],
        wantToRead: [],
        read: []
      }
    }

    this.handleChange = this.handleChange.bind(this)
  }





  componentDidMount() {

    BooksAPI.getAll().then((books) => {

      this.setState({...this.state, shelves: {
        ...this.state.shelves,
          currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
          wantToRead: books.filter(book => book.shelf === 'wantToRead'),
          read: books.filter(book => book.shelf === 'read')
      }})


      // console.log(this.state.shelves);



    //   books.forEach((book) => {
    //     let shelvedBook = {
    //       id: book.id,
    //       title: book.title,
    //       author: book.authors,
    //       image: book.imageLinks.thumbnail,
    //       shelf: book.shelf
    //     }
    //     this.addBookToShelf(book.shelf, shelvedBook)
    // })
  })
}


  addBookToShelf = (book, shelf) => {
      this.setState({...this.state, shelves: {
        ...this.state.shelves,
          [shelf]: [...this.state.shelves[shelf]].concat(book)
      }})
      console.log(this.state.shelves);
    // switch (shelf) {
    //   case ('currentlyReading'):
    //   this.setState({...this.state, shelves: {
    //     ...this.state.shelves,
    //       [shelf]: [...this.state.shelves[shelf]].concat(book)
    //   }})
    //     break;
    //   case ('wantToRead'):
    //   this.setState({...this.state, shelves: {
    //     ...this.state.shelves,
    //       [shelf]: [...this.state.shelves[shelf]].concat(book)
    //   }})
    //     break;
    //   case ('read'):
    //   this.setState({...this.state, shelves: {
    //     ...this.state.shelves,
    //       [shelf]: [...this.state.shelves[shelf]].concat(book)
    //   }})
    //     break;
    //   default:
    //     return

    }
    // this.setState(prevState => ({
    //   [shelf]: prevState[shelf].concat(book)
    // }))
  // }


  removeBook = (book, currentShelf) => {
    this.setState({...this.state, shelves: {
      ...this.state.shelves,
        [currentShelf]: [...this.state.shelves[currentShelf]].filter( b => b.id !== book.id)
    }})
    console.log(this.state.shelves);
  }


  handleChange(e, book) {
    const oldShelf = book.shelf
    // console.log(book.shelf);
    e.persist();
    BooksAPI.update(book, e.target.value);
    book.shelf= e.target.value;
    this.setState({shelves: {
      ...this.state.shelves,
        [oldShelf]: [...this.state.shelves[oldShelf]].filter( b => b.id !== book.id),
        [e.target.value]: this.state.shelves[e.target.value].concat(book)
      }
    }, () => {console.log(this.state.shelves)})

  //   BooksAPI.getAll().then((books) => {
  //
  //     this.setState({...this.state, shelves: {
  //       ...this.state.shelves,
  //         currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
  //         wantToRead: books.filter(book => book.shelf === 'wantToRead'),
  //         read: books.filter(book => book.shelf === 'read')
  //     }})
  // })
    // this.removeBook(book, book.shelf);
    // this.addBookToShelf(book, e.target.value);
    // console.log(e.target.value, book);
        // console.log(this.state.shelves);

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
          />
        )}/>
      </div>

    )}
}

export default BooksApp
