import React, { useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FaSearch, FaTrashAlt, FaTimes, FaArrowLeft } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import debounce from 'lodash/debounce';
import { useContacts } from './hooks/useContacts';
import { filterContacts, groupContactsByPhone } from './utils/contactUtils';
import {
  Container,
  SearchContainer,
  Input,
  ContactList,
  ContactItem,
  ContactText,
  BackButton,
  MedicineItem,
  ContactDetail,
  DeleteButton,
  ClearButton,
} from './style/style'; // adjust path to your styled components

const ContactListPage = () => {
  const settings = useSelector((state) => state.settings);
  const isDarkTheme = settings.displaySettings.theme === 'dark';
 

  const { contacts, loading, error, removeContact, removeAllContacts } = useContacts();

    console.log(contacts)

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);

  // Group contacts (if needed – remove if not using purchases)
  const groupedContacts = useMemo(() => {
    return groupContactsByPhone(contacts);
  }, [contacts]);

  // Filter based on search term
  const filteredContacts = useMemo(() => {
    return filterContacts(groupedContacts, searchTerm);
  }, [groupedContacts, searchTerm]);

  // Debounced search handler
  const handleSearch = useCallback(
    debounce((e) => {
      setSearchTerm(e.target.value);
    }, 300),
    []
  );

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  const handleBack = () => {
    setSelectedContact(null);
  };

  const handleDelete = async (phone, e) => {
    e.stopPropagation();
    try {
      await removeContact(phone);
      toast.success('Contact deleted');
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const handleClearAll = async () => {
    if (window.confirm('Delete all contacts?')) {
      try {
        await removeAllContacts();
        toast.success('All contacts cleared');
      } catch (err) {
        toast.error('Clear all failed');
      }
    }
  };

  const formatDate = (date) => {
  const d = new Date(date);
  return `${d.toDateString()} ${d.toLocaleTimeString()}`;
};

  if (loading) return <div>Loading contacts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container
      style={{
        backgroundColor: isDarkTheme ? '#2c3e50' : '#edf1f5',
        height: '89vh',
        boxSizing: 'border-box',
      }}
    >
      {selectedContact ? (
        // Contact detail view
        <>
          <BackButton onClick={handleBack}>
            <FaArrowLeft style={{ marginRight: '5px' }} /> Back to List
          </BackButton>
          <ContactDetail>
            <h2>Contact Details</h2>
            <p>
              <strong>Name:</strong> {selectedContact.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedContact.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedContact.phone}
            </p>
            <p>
              <strong>DateTime:</strong> {selectedContact.dateTime}
            </p>
            {selectedContact.purchase && selectedContact.purchase.length > 0 ? (
              <>
                <h3>Medicine Purchases</h3>
                <div style={{display:"flex"  , gap:"10px"}}>
                {selectedContact.purchase.map((purchase, idx) => (
                  <MedicineItem key={idx} style={{padding:"10px",color:"#edf1f5",borderRadius:"10px" , backgroundColor:"#16222f"}}>
                    <p>
                      <strong>Medicine:</strong> {purchase.medicineName}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {purchase.quantity}
                    </p>
                   <p>
  <strong>Time:</strong> {formatDate(purchase.purchaseDate)}
</p>
                    <p>
                      <strong>Price:</strong> {purchase.price}
                    </p>
                    <p>
                      <strong>Total:</strong> {purchase.total}
                    </p>
                    
                  </MedicineItem>
                ))}
                </div>
              </>
            ) : (
              <p>No purchases recorded.</p>
            )}
          </ContactDetail>
        </>
      ) : (
        // List view
        <>
          <ClearButton onClick={handleClearAll}>
            <FaTimes style={{ marginRight: '5px' }} /> Clear All
          </ClearButton>
          <h2>Contact List</h2>
          <SearchContainer>
            <Input
              type="text"
              placeholder="Search by name or email..."
              onChange={handleSearch}
            />
            <FaSearch
              style={{ position: 'absolute', right: '10px', top: '8px' }}
            />
          </SearchContainer>
          <ContactList>
            {filteredContacts.map((contact) => (
              <ContactItem
                key={contact.phone}
                onClick={() => handleContactClick(contact)}
              >
                <div style={{ flex: 1 }}>
                  <ContactText>{contact.name}</ContactText>
                  <ContactText>{contact.email}</ContactText>
                  <ContactText>{contact.phone}</ContactText>
                </div>
                <div>
                  <ContactText>
                    Purchases: {contact.purchases?.length || 0}
                  </ContactText>
                  <ContactText>{contact.dateTime}</ContactText>
                </div>
                <div style={{ marginLeft: '90px' }}>
                  <DeleteButton
                    onClick={(e) => handleDelete(contact._id, e)}
                  >
                    <FaTrashAlt />
                  </DeleteButton>
                </div>
              </ContactItem>
            ))}
          </ContactList>
        </>
      )}
      <ToastContainer />
    </Container>
  );
};

export default ContactListPage;