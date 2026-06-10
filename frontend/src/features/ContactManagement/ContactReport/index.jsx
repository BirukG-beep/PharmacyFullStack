import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import {useContacts} from "../ContactListPage/hooks/useContacts";
import{useTheme} from "../../../hooks/useTheme"
// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Container = styled.div`
height:91vh;
  background-color: #f1f5f9;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const Titles = styled.h2`
  margin-bottom: 1rem;
  margin:0;
  font-size: 1.5rem;
  color: #333;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #555;
  margin: 0.5rem 0;
`;

const Button = styled.button`
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const ChartContainer = styled.div`
  width: 100%;
  max-width: 600px;  // Set max-width for the chart container
  margin: 1rem 0;
`;

const ContactReport = () => {
  const [error, setError] = useState('');
  const theme = useTheme();
    const {contacts} =useContacts();


  // Calculate totals and highest/lowest counts
  const totalContacts = contacts.length;

  const contactCountMap = useMemo(() => {
    const map = new Map();

    contacts.forEach(contact => {
      if (contact.phone) {
        if (!map.has(contact.phone)) {
          map.set(contact.phone, {
            phone: contact.phone,
            count: 0
          });
        }
        map.get(contact.phone).count += 1;
      }
    });

    return Array.from(map.values());
  }, [contacts]);

  const sortedContacts = useMemo(() => {
    return contactCountMap.sort((a, b) => b.count - a.count);
  }, [contactCountMap]);

  const highestContact = sortedContacts[0];
  const lowestContact = sortedContacts[sortedContacts.length - 1];

  const handleRemoveAllContacts = async () => {
    try {
      await axios.delete('http://localhost:4000/api/contact/contacts');
      setContacts([]);
      toast.success('All contacts removed successfully');
    } catch (error) {
      console.error('Error removing contacts:', error);
      toast.error('Failed to remove contacts');
    }
  };

  // Prepare data for the chart
  const chartData = {
    labels: contactCountMap.map(contact => contact.phone),
    datasets: [{
      label: 'Number of Contacts',
      data: contactCountMap.map(contact => contact.count),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  return (
    <Container style={{backgroundColor:theme.backgroundColor , marginTop:"0" , paddingTop:"0" , height:"89vh" , boxSizing:"border-box" , display:"flex" , flexDirection:"column" , justifyContent:"center" , alignItems:"center" , position:"relative"}}>
      <Section>
      <div style={{position:"absolute" , top:"20px" , right:"20px" , backgroundColor:"#1d242e" , padding:"10px" , borderRadius:"10px" , fontFamily:"DM Sans" }}>
        <Titles style={{color:theme.textColor , textAlign:"center"}} >Contact Report</Titles>
        <Description style={{color:theme.textColor}}>Total Contacts: {totalContacts}</Description>
        {highestContact && (
          <Description style={{color:theme.textColor}}>Highest Contact: {highestContact.phone} ({highestContact.count})</Description>
        )}
        {lowestContact && (
          <Description style={{color:theme.textColor}}>Lowest Contact: {lowestContact.phone} ({lowestContact.count})</Description>
        )}
      </div>
        <ChartContainer>
          <Bar data={chartData} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: function(tooltipItem) {
                    return `Count: ${tooltipItem.raw}`;
                  }
                }
              }
            },
            scales: {
              x: {
                beginAtZero: true,
                ticks: {
                  maxRotation: 90,
                  minRotation: 45
                }
              },
              y: {
                beginAtZero: true,
              }
            }
          }} />
        </ChartContainer>
        <Button onClick={handleRemoveAllContacts}>Remove All Contacts</Button>
      </Section>
      <ToastContainer />
    </Container>
  );
};

export default ContactReport;
