import React from 'react';
import { Link } from 'react-router-dom';

const AllItemsCard = ({ item }) => {
    const { 
        postType,
        title,
        category,
        location,
        date,
        contactName,
        _id
    } = item;

    // Format date for display
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return (
        <div className="relative mb-6 w-full sm:w-80 md:w-96 lg:w-80 xl:w-96 mx-auto">
            <div className="relative group">
                {/* Card Container */}
                <div className="bg-[#F0EAD6] rounded-lg shadow-md overflow-hidden transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-lg h-full flex flex-col">
                    {/* Status Badge */}
                    <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-white text-sm font-medium 
                        ${postType === 'lost' ? 'bg-[#E76F51]' : 'bg-[#2A9D8F]'}`}>
                        {postType === 'lost' ? 'Lost' : 'Found'}
                    </div>
                    
                    {/* Card Content */}
                    <div className="p-5 flex-grow">
                        <h3 className="text-xl font-bold text-[#3E2F1C] mb-2 truncate">{title}</h3>
                        
                        <div className="mb-3">
                            <span className="text-sm text-[#9A8C7A]">Category:</span>
                            <p className="text-[#3E2F1C]">{category}</p>
                        </div>
                        
                        <div className="mb-3">
                            <span className="text-sm text-[#9A8C7A]">Location:</span>
                            <p className="text-[#3E2F1C]">{location}</p>
                        </div>
                        
                        <div className="mb-4">
                            <span className="text-sm text-[#9A8C7A]">{postType === 'lost' ? 'Lost on:' : 'Found on:'}</span>
                            <p className="text-[#3E2F1C]">{formattedDate}</p>
                        </div>
                        
                        {contactName && (
                            <div className="mb-4">
                                <span className="text-sm text-[#9A8C7A]">Posted by:</span>
                                <p className="text-[#3E2F1C]">{contactName}</p>
                            </div>
                        )}
                    </div>
                    
                    {/* View Details Button */}
                    <div className="px-5 pb-5">
                        <Link 
                            to={`/details/${_id}`}
                            className="block w-full bg-[#F4A261] hover:bg-[#e69555] text-white text-center py-2 px-4 rounded-md transition-colors duration-300"
                            title="Click to see full information"
                        >
                            View Details
                        </Link>
                    </div>
                </div>
                
                {/* Hover Effect Elements */}
                <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-[#F4A261] pointer-events-none transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
            </div>
        </div>
    );
};

export default AllItemsCard;