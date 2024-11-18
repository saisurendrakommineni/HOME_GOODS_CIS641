import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "./firebase";
import Itemtypes from "./Pages/ItemTypes"; // Assuming this is where you get the item types from

function InventoryCounter() {
    const [categoryCounts, setCategoryCounts] = useState({});
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const itemsRef = ref(database, 'items');

        const countItems = (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const counts = {};
                let total = 0;
                // Loop through each category and count the items
                for (let category in data) {
                    const categoryItems = data[category];
                    const categoryItemCount = Object.keys(categoryItems).length;
                    counts[category] = {
                        itemCount: categoryItemCount,
                        items: categoryItems, // Store the actual items for later display
                    };
                    total += categoryItemCount;  // Add category count to total
                }
                setCategoryCounts(counts);
                setTotalItems(total); // Set total count
            } else {
                setCategoryCounts({});
                setTotalItems(0);
            }
            setLoading(false);
        };

        onValue(itemsRef, countItems, (error) => {
            console.error("Error fetching items:", error);
            setLoading(false);
        });
    }, []);

    if (loading) return <p>Loading inventory...</p>;

    return (
        <div>
            <h2>Total Items in Inventory: {totalItems}</h2>
            <h3>Items by Category:</h3>
            {Object.keys(categoryCounts).length > 0 ? (
                <ul>
                    {Object.entries(categoryCounts).map(([category, { itemCount, items }]) => (
                        <li key={category}>
                            <strong>{category}:</strong> {itemCount} items
                            <ul>
                                {Object.entries(items).map(([itemId, itemData]) => (
                                    <li key={itemId}>
                                        <strong>{itemData.name}</strong>: Stock - {itemData.details} {/* Assuming 'details' holds the stock count */}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No items found.</p>
            )}
        </div>
    );
}

export default InventoryCounter;

