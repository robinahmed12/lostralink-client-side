import React, { useEffect, useState } from 'react';
import AllItemsCard from './AllItemsCard';

const LostFoundItem = () => {
    const [items, setItems] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch("http://localhost:3000/allItems");
                if (!response.ok) {
                    throw new Error('Failed to fetch items');
                }
                const data = await response.json();
                setItems(data);
            } catch (err) {
                setError(err.message);
            } finally {
                // console.log();
                
            }
        };

        fetchItems();
    
        return () => {
            
        };
    }, []); 



    if (error) {
        return (
            <div className="min-h-screen bg-[#FFFAF0] flex justify-center items-center">
                <div className="text-[#E76F51] text-xl">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FFFAF0] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-[#3E2F1C] mb-8 text-center">Lost & Found Items</h1>
                
                {items.length === 0 ? (
                    <div className="text-center text-[#9A8C7A] py-12">
                        <p className="text-xl">No items found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                        {items.map(item => (
                            <AllItemsCard key={item._id} item={item} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LostFoundItem;