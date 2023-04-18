import React from 'react';
import Card from './card';
import checklist from 'icons/checklist.png';

function App() {
    const iconUrl = ''

  return (
    <div className="App">
      <Card
        icon={checklist}
        title="Card Title"
        text="This is a card component"
        onClick={() => console.log('Card clicked')}
      />
    </div>
  );
}

export default App;
