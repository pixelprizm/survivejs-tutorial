import autobind from 'autobind-decorator'

const makeStoreConnectedComponent = (Component, store, componentStateKey) => (
  class StoreConnectedComponent extends Component {
    constructor(props){
      super(props);
      this.state = this.state || {};
      this.state[componentStateKey] = store.getState();
    }

    componentWillMount(){
      store.listen(this.storeChanged);

      super.componentWillMount && super.componentWillMount();
    }
    componentWillUnmount(){
      store.unlisten(this.storeChanged);

      super.componentWillUnmount && super.componentWillUnmount();
    }

    @autobind
    storeChanged(state){
      const newState = {};
      newState[componentStateKey] = state;
      this.setState(newState);
    }
  }
);

export default (store, componentStateKey) => {
  return (target) => makeStoreConnectedComponent(target, store, componentStateKey);
};
