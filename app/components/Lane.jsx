import autobind from 'autobind-decorator';
import React from 'react';

import connectStateToStore from '../libs/connectStateToStore';
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
        <div className="lane-header">
          <div className="lane-add-note">
            <button onClick={this.addNote}>+</button>
          </div>
          <div className="lane-name">{lane.name}</div>
        </div>
        <Notes
          notes={NoteStore.getNotesByIds(lane.noteIds)}
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

  editNote(id, task) {
    // Don't edit if trying to set empty value
    if(!task.trim()) {
      return;
    }

    NoteActions.update({id, task});
  }

  @autobind
  deleteNote(noteId, e) {
    // Avoid bubbling to edit
    e.stopPropagation();

    const laneId = this.props.lane.id;

    LaneActions.detachFromLane({laneId, noteId})
    NoteActions.delete(noteId);
  }
}
