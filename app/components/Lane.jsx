import autobind from 'autobind-decorator';
import React from 'react';

import connectStateToStore from '../libs/connectStateToStore';
import Editable from './Editable.jsx';
import LaneActions from '../actions/LaneActions';
import NoteActions from '../actions/NoteActions';
import Notes from './Notes';
import NoteStore from '../stores/NoteStore';

@connectStateToStore(NoteStore, 'noteStore')
export default class Lane extends React.Component {
  render() {
    const {lane, ...props} = this.props;

    return (
      <div {...props}>
        <div className="lane-header" onClick={this.activateLaneEdit}>
          <div className="lane-add-note">
            <button onClick={this.addNote}>+</button>
          </div>
          <Editable
            className="lane-name"
            editing={lane.editing}
            value={lane.name}
            onEdit={this.editName}
          />
          <div className="lane-delete">
            <button onClick={this.deleteLane}>x</button>
          </div>
        </div>
        <Notes
          notes={NoteStore.getNotesByIds(lane.noteIds)}
          onValueClick={this.activateNoteEdit}
          onEdit={this.editNote}
          onDelete={this.deleteNote}
        />
      </div>
    );
  }

  @autobind
  addNote() {
    const laneId = this.props.lane.id;
    const note = NoteActions.create({task: 'New task'});

    LaneActions.attachToLane({
      laneId,
      noteId: note.id,
    })
  }

  editNote(id, text) {
    // Don't edit if trying to set empty value
    if(!text.trim()) {
      NoteActions.update({id, editing: false});

      return;
    }

    NoteActions.update({id, task: text, editing: false});
  }

  @autobind
  deleteNote(noteId, e) {
    // Avoid bubbling to edit
    e.stopPropagation();

    const laneId = this.props.lane.id;

    LaneActions.detachFromLane({laneId, noteId})
    NoteActions.delete(noteId);
  }

  @autobind
  editName(text) {
    const laneId = this.props.lane.id;

    // Don't edit if trying to set empty value
    if(!text.trim()) {
      LaneActions.update({id: laneId, editing: false});

      return;
    }

    LaneActions.update({id: laneId, name: text, editing: false});
  }

  @autobind
  deleteLane() {
    const laneId = this.props.lane.id;

    LaneActions.delete(laneId);
  }

  @autobind
  activateLaneEdit() {
    const laneId = this.props.lane.id;

    LaneActions.update({id: laneId, editing: true});
  }

  activateNoteEdit(id) {
    NoteActions.update({id, editing: true});
  }
}
