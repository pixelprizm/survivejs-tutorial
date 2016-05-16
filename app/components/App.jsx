import React from 'react';
// Note that we can leave off the ".jsx". This also means that if there's a
//   Note.js, that will override the Note.jsx, which is what we actually want.
import Note from './Note';

export default class App extends React.Component {
  render() {
    return <Note />;
  }
}
