import React from 'react';
import loader from '../assets/loader.gif'

function Loader() {
    return (
        <div style = 
        {
          { 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh',
            backgroundColor: '#1c273a',
          }
        }>

        <img src={loader} alt="Loading" style = {
          {
            userSelect: 'none',
            webkitUserDrag: 'none',
            userDrag: 'none',
          }
        }/>
      </div>
    );
}

export default Loader;
