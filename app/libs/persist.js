import makeFinalStore from 'alt-utils/lib/makeFinalStore';

export default function(alt, storageLib, storeKey) {
  const finalStore = makeFinalStore(alt);

  try {
    alt.bootstrap(storageLib.get(storeKey));
  }
  catch(e) {
    console.error('Failed to bootstrap data', e);
  }

  // Store the application's state to localStorage whenever it changes.
  finalStore.listen(() => {
    // Only store the application's state if 'debug' isn't present in the store.
    // This allows us to clear the local memory by executing the following
    //   one-liner in the browser developer console:
    //   localStorage.setItem('debug', 'true'); localStorage.clear();

    if(!storageLib.get('debug')) {
      storageLib.set(storeKey, alt.takeSnapshot());
    }
  });
}
