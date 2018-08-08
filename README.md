# (FEND) Project 6: My Reads
*by **Tony Boswell***


# MyReads Project Overview

In the MyReads project, I was tasked to create a bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read. The project emphasizes using React to build the application and provides an API server and client library that I used to persist information as I interacted with the application.

## Specifications

In this application, the main page displays a list of "shelves" (i.e. categories), each of which contains a number of books. The three shelves are:

-   Currently Reading
-   Want to Read
-   Read

The homepage of the MyReads App shows the title "MyReads" and then three shelves, which are named "Currently Reading," "Want to Read," and "Read." There are books on each shelf. Each book has a green circle in the bottom right-hand corner. The app has a green plus sign icon in the bottom right-hand corner.

![](https://d17h27t6h515a5.cloudfront.net/topher/2017/May/590c0f12_react-project1-a/react-project1-a.png)

The static page (and your completed app) should look something like this.

Each book has a control that lets you select the shelf for that book. When you select a different shelf, the book moves there. Note that the default value for the control should always be the current shelf the book is in.

The green circle in the right-hand cover of the first book is clicked. You see a menu that has the following options: "Move To," "Currently Reading," "Want to Read," Read," and "None." The "Move to" option is greyed out. There is a checkmark next to the "Currently Reading" option.


![](https://d17h27t6h515a5.cloudfront.net/topher/2017/May/590c0f26_react-project1-b/react-project1-b.png)

The main page also has a link to  `/search`, a search page that allows you to find books to add to your library.

The search page has a text input that may be used to find books. As the value of the text input changes, the books that match that query are displayed on the page, along with a control that lets you add the book to your library. To keep the interface consistent, you may consider re-using some of the code you used to display the books on the main page.

![](https://d17h27t6h515a5.cloudfront.net/topher/2017/December/5a3c22b9_screen-shot-2017-12-21-at-1.06.59-pm/screen-shot-2017-12-21-at-1.06.59-pm.png)

When a book is on a bookshelf, it should have the same state on both the main application page and the search page.

![](https://d17h27t6h515a5.cloudfront.net/topher/2017/July/595d48a9_correct-use-of-state/correct-use-of-state.gif)

The search page also has a link to  `/`  (the root URL), which leads back to the main page.

When you navigate back to the main page from the search page, you should instantly see all of the selections you made on the search page in your library.




## TL;DR

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## What You're Getting
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains static HTML right now.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```


## Backend Server

To simplify your development process, I was provided a backend server to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods needed to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

# *Important*
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
