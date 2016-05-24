// Symbol to avoid name conflicts
const storePublicMethodIndicator = Symbol('store public method indicator');

const makeStoreModelWithPublicMethods = (Component) => (
  class StoreModelWithPublicMethods extends Component {
    constructor(props){
      const mySelf = super(props);

      const publicInterface = {};
      for (const key in mySelf) {
        if (mySelf[key][storePublicMethodIndicator]) {
          console.log('key:', key);
          console.log('mySelf[key]:', mySelf[key]);
          publicInterface[key] = mySelf[key].bind(mySelf);
        }
      }

      this.exportPublicMethods(publicInterface);
    }
  }
);

//TODO fix this whole thing
export default function(target, key, descriptor) {
  console.warn('Do not use storePublic decorator, it is unfinished');
  return;

  // Check if this decorator is being applied to a class or one of its methods
  if (arguments.length === 1) {
    return makeStoreModelWithPublicMethods(target);
  } else {
    // Indicate that this method should be added to the list of public methods
    //   given to alt in `exportPublicMethods`
    descriptor.value[storePublicMethodIndicator] = 1;
    return descriptor;
  }
}
