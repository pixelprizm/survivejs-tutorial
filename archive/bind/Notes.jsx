import React from 'react';

import Note from './Note';

export default ({notes, onEdit, onDelete}) => {
  // note: the `style` property below is used to demonstrate the use of spread
  //   syntax (see Note.jsx)

  // note: take a look at the interesting way that `bind` is used for onEdit.
  //   The `App` component's `editNote` function consumes `id` and `task`
  //   parameters.  The `Notes` component provides the `id` parameter, while
  //   the `Note` component provides the `task` parameter when it calls
  //   `this.props.onEdit(value)`.

  return (
    <ul>
      {notes.map(note =>
        <li key={note.id}>
          <Note
            task={note.task}
            style={(Math.floor(Math.random() * 2) === 0) ? {} : {color: 'black'}}
            onEdit={onEdit.bind(null, note.id)}
            onDelete={onDelete.bind(null, note.id)}
          />
        </li>
      )}
    </ul>
  );
}
