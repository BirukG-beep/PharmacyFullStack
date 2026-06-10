import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import './MedicineDashboard.css'; 
import MedicineTable from './components/MedicineTable';
import ExpireDate from './components/ExpireDate';
import MedicineGraph from './components/MedicineGraph';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
import { useTheme } from '../../../../hooks/useTheme';
import { useMedicine } from './hooks/useMedicine';
const MedicineDashboard = () => {
 const theme = useTheme();
  const [medicineData, setMedicineData] = useState([]);
  const [page, setPage] = useState(0);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [quantitySearchTerm, setQuantitySearchTerm] = useState('');
  const [descriptionSearchTerm, setDescriptionSearchTerm] = useState('');
  const itemsPerPage = 6;
   const {medicine , mark } = useMedicine();
     
      useEffect(() => {
  const filteredData = medicine.filter(dataItem => {
    return !mark.some(markItem => markItem.medicineId === dataItem.medicineId);
  });

  setMedicineData(filteredData);
}, [medicine, mark]);


  // Get current page data
  const getCurrentPageData = () => {
    const start = page * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredMedicines.slice(start, end);
  };

  // Paginate data
  const handleNextPage = () => {
    if ((page + 1) * itemsPerPage < filteredMedicines.length) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const filteredMedicines = medicineData.filter(med => {
    const nameMatch = med.medicineName.toLowerCase().includes(searchTerm.toLowerCase());
    const quantityMatch = quantitySearchTerm ? med.quantity <= parseInt(quantitySearchTerm, 10) : true;
    const descriptionMatch = (med.medicineDescription?.toLowerCase() || '').includes(descriptionSearchTerm.toLowerCase());

    return nameMatch && quantityMatch && descriptionMatch;
  });

  // Chart data
  const labels = getCurrentPageData().map(med => med.medicineName);
  const quantities = getCurrentPageData().map(med => med.quantity);
  const backgroundColors = quantities.map(quantity => quantity < 15 ? 'red' : 'green');

  const data = {
    labels,
    datasets: [
      {
        label: 'Medicine Quantity',
        data: quantities,
        backgroundColor: backgroundColors,
        borderColor: 'black',
        borderWidth: 1,
      }
    ]
  };

  // Filter expired medicines
  const expiredMedicines = medicineData.filter(med => {
    const expiryDate = new Date(med.expirationDate);
    return expiryDate < new Date(); // Compare with current date
  });
  return (
    <div style={{height:"89vh" , boxSizing:"border-box", overflowY: 'auto', backgroundColor:theme.backgroundColor }} className='medicineDashboard'>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height:"89vh" , boxSizing:"border-box", overflowY: 'auto', justifyContent: 'space-between', padding: '20px', backgroundColor:theme.backgroundColor }} className='name3'>
      {/* Graph Container */}
      <MedicineGraph page={page}  data = {data}  handlePrevPage ={handlePrevPage} handleNextPage ={handleNextPage} itemsPerPage = {itemsPerPage}  filteredMedicines = {filteredMedicines}/>
      {/* Table Container */}
      <MedicineTable searchTerm={searchTerm} setSearchTerm={setSearchTerm} setQuantitySearchTerm = {setQuantitySearchTerm} descriptionSearchTerm={descriptionSearchTerm} setDescriptionSearchTerm = {setDescriptionSearchTerm}  quantitySearchTerm = {quantitySearchTerm }  getCurrentPageData = {getCurrentPageData}   />
      {/* Expired Medicines Section */}
    </div>
      <ExpireDate expiredMedicines={expiredMedicines} />
    </div>
  );
};

export default MedicineDashboard;
