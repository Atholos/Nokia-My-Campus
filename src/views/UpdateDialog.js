import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.minimal.css";
// UpdateDialog, shown when app updates

const UpdateDialog = (params) => {

    const notify = ({closeToast}) => (
        <div>
            <div className={'toastText'}>There is an update available</div>
            <button className={'toastButton'} onClick={params.onUpdate}>Update now</button>
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
      <div onLoad={toast.dark(notify, {position: "bottom-center", className: "toastContainer"})}>
          <ToastContainer style={{color: "#124191"}} autoClose={false} closeButton={false}/>
      </div>
  );
};
export default UpdateDialog;
