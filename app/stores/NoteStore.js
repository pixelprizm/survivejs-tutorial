import alt from '../libs/alt';
import uuid from 'node-uuid';

import NoteActions from '../actions/NoteActions';

class NoteStore {
  constructor() {
    this.bindActions(NoteActions);

    this.notes = [];

    this.exportPublicMethods({
      getNotesByIds: this.getNotesByIds.bind(this),
    });
  }

  create(newNote) {
    const notes = this.notes;

    newNote.id = uuid.v4();

    this.setState({
      notes: notes.concat(newNote),
    });

    return newNote;
  }

  update(updatedNote) {
    const notes = this.notes.map(note => {
      if(note.id === updatedNote.id) {
        // Object.assign is used to patch the note data here. It
        // mutates target (first parameter). In order to avoid that,
        // I use {} as its target and apply data on it.
        //
        // Example: {}, {a: 5, b: 3}, {a: 17} -> {a: 17, b: 3}
        //
        // You can pass as many objects to the method as you want.
        return Object.assign({}, note, updatedNote);
      }

      return note;
    });

    this.setState({notes});
  }

  delete(id) {
    this.setState({
      notes: this.notes.filter(note => note.id !== id),
    });
  }

  getNotesByIds(ids) {
    // `reduce` is a powerful method that allows us to
    // fold data. You can implement `filter` and `map`
    // through it. Here we are using it to concatenate
    // notes matching to the ids.
    return (ids || []).reduce((reducedList, id) =>
      // Concatenate possible matching ids to the result
      reducedList.concat(
        this.notes.filter(note => note.id === id)
      )
    , []);
  }
}

export default alt.createStore(NoteStore, 'NoteStore');
