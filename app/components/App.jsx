import React from 'react';

import connectStateToStore from '../libs/connectStateToStore';
import LaneActions from '../actions/LaneActions';
import Lanes from './Lanes';
import LaneStore from '../stores/LaneStore';

@connectStateToStore(LaneStore, 'laneStore')
export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const lanes = this.state.laneStore.lanes;

    return (
      <div>
        <button
          className="add-lane"
          onClick={this.addLane}
        >
          +
        </button>

        <Lanes lanes={lanes}/>
      </div>
    );
  }

  addLane() {
    LaneActions.create('New lane');
  }
}
