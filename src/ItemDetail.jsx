import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ItemDetails() {
  const [item, setItem] = useState();
  const itemId = useParams().itemId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/users/${itemId}` // Replace with your actual Api Url
        );

        setItem(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div>
      <h2>{item.firstName}</h2>
      <p>{item.email}</p>
      {/* Add more details as needed */}
    </div>
  );
}

export default ItemDetails;
