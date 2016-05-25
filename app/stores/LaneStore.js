import uuid from 'node-uuid';
import alt from '../libs/alt';
import LaneActions from '../actions/LaneActions';

class LaneStore {
  constructor() {
    this.bindActions(LaneActions);

    this.lanes = [];
  }

  create(laneName) {
    // note: Could use `instanceof` to mandate that the caller passes in an
    //   object of a `Lane` class.  Or a type-checker like Flow.

    const newLane = {
      name: laneName,
      noteIds: [],
      id: uuid.v4(),
    }

    const lanes = this.lanes;

    this.setState({
      lanes: lanes.concat(newLane)
    });
  }

  update(updatedLane) {
    const lanes = this.lanes.map(lane => {
      if(lane.id === updatedLane.id) {
        return Object.assign({}, lane, updatedLane);
      }

      return lane;
    });

    this.setState({lanes});
  }

  delete(id) {
    this.setState({
      lanes: this.lanes.filter(lane => lane.id !== id),
    });
  }

  attachToLane({laneId, noteId}) {
    const newLanes = this.lanes.map(lane => {
      if(lane.id === laneId) {
        if(lane.noteIds.includes(noteId)) {
          console.warn('Already attached note to lane', this.lanes);
        }
        else {
          lane.noteIds.push(noteId);
        }
      }

      return lane;
    });

    this.setState({lanes: newLanes});
  }

  detachFromLane({laneId, noteId}) {
    const newLanes = this.lanes.map(lane => {
      if(lane.id === laneId) {
        lane.noteIds = lane.noteIds.filter(id => id !== noteId);
      }

      return lane;
    });

    this.setState({lanes: newLanes});
  }
}

export default alt.createStore(LaneStore, 'LaneStore');
