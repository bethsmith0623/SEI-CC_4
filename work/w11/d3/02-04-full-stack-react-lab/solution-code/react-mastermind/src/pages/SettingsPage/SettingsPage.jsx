import React from 'react';
import {Link} from 'react-router-dom';
import './SettingsPage.css';

const SettingsPage = (props) => {

  const selectedLevelStyle = {
    border: '2px solid #333'
  };

  function handleDifficultyChange(level) {
    props.handleDifficultyChange(level);
    props.history.push('/');
  }

  const colorKeys = Object.keys(props.colorsLookup);

  const levels = colorKeys.map(level => (
    <div className='Settings-level-row' key={level}>
      <button className="Settings-level-btn btn btn-default"
        style={level === props.difficulty ? selectedLevelStyle : null}
        disabled={level === props.difficulty}
        onClick={() => handleDifficultyChange(level)}
      >
        {level}
      </button>
      <div className='Settings-level-colors'>
        {props.colorsLookup[level].map(color => 
          <div
            className='Settings-color'
            style={{backgroundColor: color}}
            key={color}
          />
        )}
      </div>
    </div>
  ));

  return (
    <div className='Settings'>
      <header className='header-footer'>Set Difficulty Level</header>
      <div>
        {levels}
      </div>
      <div>
        <Link className='Settings-cancel btn btn-default btn-sm' to='/'>Cancel</Link>
      </div>
    </div>
  );

};

export default SettingsPage;
