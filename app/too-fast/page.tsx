import React from "react";

const TooFast = () => {
  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center bg-gray-800/50 p-8 rounded-xl border border-gray-700 backdrop-blur-sm">
        <h1 className="text-5xl font-bold text-white mb-6">Slow Down</h1>
        <p className="text-lg text-gray-300 mb-6">
          Looks like you've been a little too eager. We've put a temporary pause
          on your excitement. 🚦
        </p>
        <p className="text-gray-400">Chill for a bit, and try again shortly</p>
      </div>
    </main>
  );
};

export default TooFast;
