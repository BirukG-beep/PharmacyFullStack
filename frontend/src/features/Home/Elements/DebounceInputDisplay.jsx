import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleClicked } from '../../../Reducer/dashboardSlice.js';
// Debounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
   

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Main component
function SearchDebounce({ inputValue }) {
  const dispatch = useDispatch();

  const handleClickd = (id) => {
    dispatch(toggleClicked(id));
  };

  const data = [
    { name: "Dashboard", id: 1 },
    { name: "Inventory", id: 13 },
    { name: "List of Medicines", id: 7 },
    { name: "Medicine Groups", id: 8 },
    { name: "Cosmetics", id: 101 },
    { name: "Report", id: 15 },
    { name: "Sales Report", id: 9 },
    { name: "Payment Report", id: 10 },
    { name: "Configuration", id: 2 },
    { name: "Customer", id: 20 },
    { name: "Contact Report", id: 18 },
    { name: "Notifications", id: 3 },
    { name: "Application Setting", id: 4 },
    { name: "Get Tech Help", id: 5 },
  ];

  const debouncedSearch = useDebounce(inputValue, 500);

  const filteredData =
    debouncedSearch.trim() === ""
      ? []
      : data.filter((item) =>
          item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        );

  return (
    <div
      style={{
        padding: "0px",
        maxWidth: "400px",
        position: "absolute",
        top: "11vh",
        left: "340px",
        width: "270px",
        background: "#fff",
        border: "1px solid #ccc",
        borderRadius: "4px",
        marginTop: "5px",
        zIndex: 1000,
      }}
    >
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <li
              key={index}
              onClick={() => handleClickd(item.id)}
              style={{
                padding: "8px",
                borderBottom: "1px solid #eee",
                cursor: "pointer",
              }}
            >
              {item.name} {/* ✅ render the name string instead of the object */}
            </li>
          ))
        ) : debouncedSearch !== "" ? (
          <li style={{ padding: "8px" }}>No results found</li>
        ) : null}
      </ul>
    </div>
  );
}

export default SearchDebounce;