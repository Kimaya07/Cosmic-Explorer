import { Rocket } from 'lucide-react';

const Header = () => {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div className="flex items-center">
        <Rocket className="text-blue-400 mr-2" />
        <h1 className="text-2xl font-bold">Cosmic Explorer</h1>
      </div>
    </header>
  );
};

export default Header;