import React from 'react';

import Note from './Note';

export default ({notes}) => {
  return (
    <ul>
      {notes.map(note =>
        <li key={note.id}>
          <Note
            task={note.task}
            style={(Math.floor(Math.random() * 2) === 0) ? {} : {color: 'black'}}
          />
        </li>
      )}
    </ul>
  );
}
