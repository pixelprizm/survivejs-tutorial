import React from 'react';

import Editable from './Editable';

export default ({notes, onValueClick, onEdit, onDelete}) => {
  // note: the `style` property below is used to demonstrate the use of spread
  //   syntax (see Note.jsx)

  // note: take a look at the interesting way that `bind` is used for onEdit.
  //   The `App` component's `editNote` function consumes `id` and `task`
  //   parameters.  The `Notes` component provides the `id` parameter, while
  //   the `Note` component provides the `task` parameter when it calls
  //   `this.props.onEdit(value)`.

  return (
    <ul className="notes">
      {notes.map(note =>//TODO use spread operators here, to pass the whole note object as prop
        <li className="note" key={note.id}>
          <Editable
            editing={note.editing}
            value={note.task}
            onValueClick={onValueClick.bind(null, note.id)}
            onEdit={onEdit.bind(null, note.id)}
            onDelete={onDelete.bind(null, note.id)}
          />
        </li>
      )}
    </ul>
  );
}
