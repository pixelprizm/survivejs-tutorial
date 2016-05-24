import uuid from 'node-uuid';
import alt from '../libs/alt';
import LaneActions from '../actions/LaneActions';

class LaneStore {
  constructor() {
    this.bindActions(LaneActions);

    this.lanes = [];
  }

  create(laneName) {
    // note: Could use `instanceof` to check that `lane` is an
    //   object of a `Lane` class.

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
