import autobind from 'autobind-decorator'
import React from 'react';

import NoteActions from '../actions/NoteActions';
import Notes from './Notes';
import NoteStore from '../stores/NoteStore';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      noteStore: NoteStore.getState(),
    };
  }

  componentDidMount() {
    NoteStore.listen(this.handleStoreChanged);
  }
  componentWillUnmount() {
    NoteStore.unlisten(this.handleStoreChanged);
  }

  @autobind
  handleStoreChanged(storeState) {
    this.setState({noteStore: storeState});
  }

  render() {
    const notes = this.state.noteStore.notes;

    return (
      <div>
        <button
          className="add-note"
          onClick={this.addNote}
        >
          +
        </button>

        <Notes
          notes={notes}
          onEdit={this.editNote}
          onDelete={this.deleteNote}
        />
      </div>
    );
  }

  // Note that now that we're using stores, we don't need @autobind any more.
  addNote() {
    NoteActions.create({task: 'New task'});
  }

  editNote(id, task) {
    // Don't do anything if trying to set an empty value
    if(!task.trim()) {
      return;
    }

    NoteActions.update({id, task});
  }

  deleteNote(id, e) {
    // Avoid bubbling the event to edit
    e.stopPropagation();

    NoteActions.delete(id);
  }
}
