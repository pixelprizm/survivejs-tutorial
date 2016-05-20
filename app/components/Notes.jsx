import React from 'react';

import Note from './Note';

export default ({notes, onEdit}) => {
  // note: the `style` property below is used to demonstrate the use of spread
  //   syntax (see Note.jsx)
  return (
    <ul>
      {notes.map(note =>
        <li key={note.id}>
          <Note
            task={note.task}
            style={(Math.floor(Math.random() * 2) === 0) ? {} : {color: 'black'}}
            onEdit={onEdit.bind(null, note.id)}
          />
        </li>
      )}
    </ul>
  );
}
