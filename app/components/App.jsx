import autobind from 'autobind-decorator'
import React from 'react';
import uuid from 'node-uuid';

import Notes from './Notes';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      notes: [
        {
          id: uuid.v4(),
          task: 'Learn Webpack',
        },
        {
          id: uuid.v4(),
          task: 'Learn React',
        },
        {
          id: uuid.v4(),
          task: 'Do laundry right right now',
        },
        {
          id: uuid.v4(),
          task: 'Do laundry really later',
        },
      ],
    };
  }

  render() {
    const notes = this.state.notes;

    return (
      <div>
        <button onClick={this.addNote}>+</button>
        <Notes
          notes={notes}
          onEdit={this.editNote}
        />
      </div>
    );
  }

  // We could use an experimental feature known as property
  // initializer here. It allows us to bind the method `this`
  // to point at our *App* instance.
  // addNote = () => {
  //   ...
  // };
  //
  // Alternatively we could `bind` at `constructor` using
  // a line, such as this.addNote = this.addNote.bind(this);
  //
  // Note: example of using autobind-decorator
  @autobind
  addNote() {
    // It would be possible to write this in an imperative style.
    // I.e., through `this.state.notes.push` and then
    // `this.setState({notes: this.state.notes})` to commit.
    //
    // I (the tutorial writer) tend to favor functional style whenever that
    //   makes sense.
    // Even though it might take more code sometimes, I feel
    // the benefits (easy to reason about, no side effects)
    // more than make up for it.
    //
    // Libraries, such as Immutable.js, go a notch further.
    this.setState({
      notes: this.state.notes.concat([{
        id: uuid.v4(),
        task: 'New task',
      }]),
    });

    // // Could do this instead:
    // this.setState({
    //   notes: [...this.state.notes, {
    //     id: uuid.v4(),
    //     task: 'New task',
    //   }],
    // });
  }

  @autobind
  editNote(id, task) {
    // Don't do anything if trying to set an empty value
    if(!task.trim()) {
      return;
    }

    const notes = this.state.notes.map(note => {
      if(note.id === id && task) {
        note.task = task;
      }

      return note;
    });

    this.setState({notes});
    // Could have done:
    // `this.setState({notes: notes});`
    // because `{notes}` is shorthand for `{notes: notes}`
  }
}
