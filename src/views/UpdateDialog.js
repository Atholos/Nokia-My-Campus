import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
// UpdateDialog, shown when app updates

const UpdateDialog = (params) => {

    const notify = ({closeToast}) => (
        <div>
            <p>There is an update available</p>
            <button onClick={params.onUpdate}>Update now</button>
        </div>
    );

  return (
      /*
      <div className="UpdatedRoot">
        <div className="AppUpdated">
          <h1 className="AppUpdatedHeading">There is a new update,
          press confirm to continue.</h1>
          <button className="AppUpdatedButton" onClick={params.onUpdate}>CONFIRM</button>
        </div>
      </div>
       */
      <div>
          {toast.dark(notify)}
          <ToastContainer autoClose={false} closeButton={false}/>
      </div>
  );
};
export default UpdateDialog;
