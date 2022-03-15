import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-6xl font-bold mb-6 cursor-default text-gray-800">
      <img className="inline mr-6" width="100" src="boulderer.png" />
      <span>boulderer</span>
    </header>
  );
};

export default Header;
