import React from 'react';

import NavigateSimpleButton from '../components/NavigateSimpleButton';
import NavigateDetailedButton from '../components/NavigateDetailedButton';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Career Test!</h1>
      <NavigateSimpleButton />
      <NavigateDetailedButton />
    </div>
  );
};

export default HomePage;
