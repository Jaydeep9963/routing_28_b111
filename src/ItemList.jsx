import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ItemList() {
  const [items, setItems] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showDetails, setShowDetails] = useState({});
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://dummyjson.com/users" // Replace with your actual Api Url
        );

        setItems(response.data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleDetails = (itemId) => {
    setShowDetails((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const handleSort = (field) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);

    // Perform sorting logic here
    const sortedItems = [...items].sort((a, b) => {
      if (a[field] < b[field]) {
        return sortOrder === "asc" ? -1 : 1;
      } else if (a[field] > b[field]) {
        return sortOrder === "asc" ? 1 : -1;
      } else {
        return 0;
      }
    });

    // Update the items state with the sorted array
    setItems(sortedItems);
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      {/* Add sorting buttons here, e.g., for sorting by title, summary, etc. */}
      <button onClick={() => handleSort("firstName")}>Sort by firstName</button>
      <ul>
        {items.map((item) => (
          <Link to={`/item/${item.id}`} key={item.id}>
            <li>
              <button onClick={() => toggleDetails(item.id)}>
                <h2>{item.firstName}</h2>
              </button>
              {showDetails[item.id] && (
                <div className="details">
                  <p>{item.gender}</p>
                </div>
              )}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
