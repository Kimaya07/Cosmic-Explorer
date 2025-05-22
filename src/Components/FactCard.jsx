import { Star } from 'lucide-react';

const FactCard = ({ fact, image, onNextFact }) => {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl mb-8">
      <img 
        src={image} 
        alt="Image of space" 
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <p className="text-lg mb-4">{fact}</p>
        <button 
          onClick={onNextFact} 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center transition-colors"
        >
          <span>Discover Another Fact</span>
          <Star className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default FactCard;