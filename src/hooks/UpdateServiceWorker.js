/*
  This file contains the data update with Redux
  Alpha phase
 */
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import UpdateDialog from '../views/UpdateDialog';

// Update app via redux
const UpdateApp = ({type, onUpdate}) => {
  // Redux dispatch, type is either SW_INIT or SW_UPDATE, comes from Update.js when serviceworker is updated
  const dispatch = useDispatch();
  // Define parameters to be sent as params to UpdateDialog component
  const params = {onUpdate};
  useEffect(() => {
    if (!onUpdate) {
      // 2 second timeout and dispatch
      const timer = setTimeout(() => {
        dispatch({type});
      }, 6000);
      // Clear timeout so timer works correctly every time
      return () => clearTimeout(timer)
    }
  }, []);// eslint-disable-line

  return (
        <UpdateDialog {...params}/>
  )
};

export default UpdateApp;
