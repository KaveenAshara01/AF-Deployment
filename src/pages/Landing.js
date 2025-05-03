import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
      <div className="text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in">
          Discover the World
        </h1>
        <p className="text-xl md:text-2xl mb-8 animate-fade-in delay-200">
          Explore countries, uncover facts, and save your favorites.
        </p>
        <button
          onClick={() => navigate('/home')}
          className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-100 hover:scale-105 transition-transform duration-300 animate-fade-in delay-400"
        >
          Explore
        </button>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
}

export default Landing;