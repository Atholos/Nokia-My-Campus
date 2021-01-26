import React from 'react';
// UpdateDialog, shown when app updates

const UpdateDialog = (params) => {
  return (
      <div className="UpdatedRoot">
        <div className="AppUpdated">
          <h1 className="AppUpdatedHeading">There is a new update,
          press confirm to continue.</h1>
          <button className="AppUpdatedButton" onClick={params.onUpdate}>CONFIRM</button>
        </div>
      </div>


  );
};
export default UpdateDialog;
