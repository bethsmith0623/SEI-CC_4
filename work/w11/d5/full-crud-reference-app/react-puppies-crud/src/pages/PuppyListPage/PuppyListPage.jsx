import React from 'react';
import './PuppyListPage.css';
import PuppyCard from '../../components/PuppyCard/PuppyCard';

function PuppyListPage(props) {
  return (
    <>
      <h1>Puppy List</h1>
      <div className='PuppyListPage-grid'>
        {props.puppies.map(puppy =>
          <PuppyCard
            key={puppy._id}
            puppy={puppy}
            handleDeletePuppy={props.handleDeletePuppy}
          />
        )}
      </div>
    </>
  );
}

export default PuppyListPage;