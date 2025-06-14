import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostItemSection = () => {
  const [activeTab, setActiveTab] = useState('lost');
  const navigate = useNavigate();

  const handlePostClick = () => {
    navigate(activeTab === 'lost' ? '/post-lost' : '/post-found');
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#FFFAF0]">
      <div className="">
        <div className="bg-[#F0EAD6] rounded-xl shadow-md overflow-hidden p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#3E2F1C] mb-4">
            Help someone or get help fast
          </h2>
          <p className="text-[#3E2F1C] mb-6">
            Lost something? Don't wait—let the community know! Posting takes less than a minute.
          </p>

          {/* Tab Selector */}
          <div className="flex mb-6 border-b border-[#9A8C7A]">
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'lost' ? 'text-[#F4A261] border-b-2 border-[#F4A261]' : 'text-[#9A8C7A]'}`}
              onClick={() => setActiveTab('lost')}
            >
              Post Lost Item
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'found' ? 'text-[#2A9D8F] border-b-2 border-[#2A9D8F]' : 'text-[#9A8C7A]'}`}
              onClick={() => setActiveTab('found')}
            >
              Post Found Item
            </button>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#FFFAF0] p-4 rounded-lg border border-[#F4A261]">
              <div className="flex items-center mb-2">
                <span className="bg-[#F4A261] text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">1</span>
                <h3 className="font-medium text-[#3E2F1C]">Fill in details</h3>
              </div>
              <p className="text-sm text-[#9A8C7A]">Describe your item</p>
            </div>
            <div className="bg-[#FFFAF0] p-4 rounded-lg border border-[#2A9D8F]">
              <div className="flex items-center mb-2">
                <span className="bg-[#2A9D8F] text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">2</span>
                <h3 className="font-medium text-[#3E2F1C]">Add location</h3>
              </div>
              <p className="text-sm text-[#9A8C7A]">Where it was lost/found</p>
            </div>
            <div className="bg-[#FFFAF0] p-4 rounded-lg border border-[#E76F51]">
              <div className="flex items-center mb-2">
                <span className="bg-[#E76F51] text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">3</span>
                <h3 className="font-medium text-[#3E2F1C]">Upload photo</h3>
              </div>
              <p className="text-sm text-[#9A8C7A]">Help with identification</p>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={handlePostClick}
            className={`w-full py-3 px-6 rounded-lg font-bold text-white text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${activeTab === 'lost' ? 'bg-[#F4A261] hover:bg-[#E76F51]' : 'bg-[#2A9D8F] hover:bg-[#21867A]'}`}
          >
            + Post {activeTab === 'lost' ? 'Lost' : 'Found'} Item
          </button>

          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-[#9A8C7A]">
            <p>Only 3 simple steps • Takes less than 60 seconds!</p>
            <p className="mt-2 sm:mt-0"> login needed to post</p>
          </div>

          <div className="mt-8 p-4 bg-[#FFFAF0] rounded-lg border border-[#2A9D8F]">
            <h3 className="font-bold text-[#3E2F1C] mb-2">What happens after posting?</h3>
            <ul className="list-disc pl-5 text-[#3E2F1C]">
              <li>Your item will be visible to thousands</li>
              <li>We'll automatically check for potential matches</li>
              <li>Sign in to track and message users</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostItemSection;