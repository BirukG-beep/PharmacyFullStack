import React from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { useListMedicine } from '../../../sharedFiles/hooks/useListMedicine';

const SearchAndFilter = ({ onSearchChange, onFilterChange, filterOptions = [] }) => {
  const { medicines, loading, error } = useListMedicine();

  console.log(medicines)

  if (loading) return <p>Loading...</p>;
if (error) return <p>Error loading medicines</p>;

  // Extract unique medicine groups for filter options
  const uniqueGroups = [...new Set(medicines.map(med => med.medicineGroup))];

  console.log("Medicines from useListMedicine:", medicines);
  console.log(uniqueGroups);

  return (
    <div style={{
      width: '100%',
      margin: '0 30px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      justifyContent: "space-between"
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '5px 10px',
     
        backgroundColor: '#fff',
        width:"40%",
      }}>
        <FaSearch style={{ marginRight: '8px', color: '#007bff' }} />
        <input
          type="text"
          placeholder="Search..."
          onChange={onSearchChange}
          style={{
            border: 'none',
            outline: 'none',
            padding: '8px',
            fontSize: '16px',
          
            flex: 1
          }}
        />
      </div>
      <div style={{
        display: 'flex',
        width:"40%",
        alignItems: 'center',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '5px 10px',
        backgroundColor: '#fff',
        marginRight: "60px"
      }}>
        <FaFilter style={{ marginRight: '8px', color: '#007bff' }} />
        <select
          onChange={(e) => onFilterChange(e.target.value)}
          style={{
            border: 'none',
            outline: 'none',
            fontSize: '16px',
            padding: '8px',
            textAlign:'center',
            fontFamily:"DM Sans, sans-serif",
            flex: 1
          }}
        >
          <option value="">Select Option</option>
          {uniqueGroups.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchAndFilter;
