import React from 'react';
import {Link} from 'react-router-dom';

function PuppyCard({puppy, handleDeletePuppy}) { 
  return (
    <div className='panel panel-default'>
      <div className="panel-heading">
        <h3 className='panel-title'>{puppy.name}</h3>
      </div>
      <div className='panel-body'>
        <dl>
          <dt>Breed</dt>
          <dd>{puppy.breed}</dd>
          <dt>Age</dt>
          <dd>{puppy.age}</dd>
        </dl>
      </div>
      <div className='panel-footer'>
        {/* 
          The following is another approach to provide 
          data to a different route that's different
          from the Star Wars lab's solution code.
          The state object can be accessed in the new
          route via the location.state object
        */}
        <Link
          className='btn btn-xs btn-warning'
          to={{
            pathname: '/edit',
            state: {puppy}
          }}
        >
          EDIT
        </Link>
        <button
          className='btn btn-xs btn-danger margin-left-10'
          onClick={() => handleDeletePuppy(puppy._id)}
        >
          DELETE
        </button>
      </div>
    </div>
  );
}

export default PuppyCard;