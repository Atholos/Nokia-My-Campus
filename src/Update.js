import React from 'react';
import {useSelector} from 'react-redux';
import Data from './hooks/Data';
import UpdateApp from './hooks/UpdateServiceWorker';

const {SW_INIT, SW_UPDATE} = Data();

const Update = () => {
  // Defining constants for redux depending on serviceworker state
  const isServiceWorkerInitialized = useSelector(
      state => state.UpdateReducer.serviceWorkerInitialized);
  const isServiceWorkerUpdated = useSelector(
      state => state.UpdateReducer.serviceWorkerUpdated);
  const serviceWorkerRegistration = useSelector(
      state => state.UpdateReducer.serviceWorkerRegistration);
  const updateServiceWorker = () => {
    const registrationWaiting = serviceWorkerRegistration.waiting;
    // If new update is waiting, reload current window with the new content
    if (registrationWaiting) {
      registrationWaiting.postMessage({type: 'SKIP_WAITING'});
      registrationWaiting.addEventListener('statechange', e => {
        if (e.target.state === 'activated') {
          window.location.reload()
        }
      });
    }
  };
  return (
      // UpdateApp in UpdateServiceWorker.js, SW_INIT and SW_UPDATE is used with redux dispatch depending on serviceworker state
      <div>
        {isServiceWorkerInitialized && (
            <UpdateApp
                type={SW_INIT}
            />
        )}
        {isServiceWorkerUpdated && (
            <UpdateApp
                type={SW_UPDATE}
                onUpdate={() => updateServiceWorker()}
            />
        )}
      </div>

  );
};



export default Update;
