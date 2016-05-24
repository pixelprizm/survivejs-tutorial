// Symbol to avoid name conflicts
const storeChangedSymbol = Symbol('storeChanged handler');

const makeStoreConnectedComponent = (Component, store, componentStateKey) => (
  class StoreConnectedComponent extends Component {
    constructor(props){
      super(props);
      // note: manually binding since @autobind apparently only works with
      //   string keys
      this[storeChangedSymbol] = this[storeChangedSymbol].bind(this);

      this.state = this.state || {};
      this.state[componentStateKey] = store.getState();
    }

    // note: this should be moved to 
    componentWillMount(){
      // note: manually binding since autobind
      store.listen(this[storeChangedSymbol]);

      super.componentWillMount && super.componentWillMount();
    }
    componentWillUnmount(){
      store.unlisten(this[storeChangedSymbol]);

      super.componentWillUnmount && super.componentWillUnmount();
    }

    [storeChangedSymbol](state) {
      const newState = {};
      newState[componentStateKey] = state;
      this.setState(newState);
    };
  }
);

export default (store, componentStateKey) => {
  return function(target, key, descriptor) {
    if (arguments.length > 1) {
      console.log('connectStateToStore decorator:', arguments);
      throw new Error(
        '@connectStateToStore decorator can only be applied to classes, not ' +
          typeof descriptor.value
      );
    }

    return makeStoreConnectedComponent(target, store, componentStateKey);
  };
}
