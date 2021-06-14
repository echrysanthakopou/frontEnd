import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';


export default function ViewList() {

    function clickUpdate(){
        console.log(" update");
    }

    return (
        <div>

<p>

            <button onClick={clickUpdate()}>ΤΡΟΠΟΠΟΙΗΣΗ</button>

</p>
        </div>

    );
}
