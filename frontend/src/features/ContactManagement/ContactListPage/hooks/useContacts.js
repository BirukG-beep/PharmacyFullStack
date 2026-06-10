import { useState, useEffect, useCallback, useRef } from 'react';
import {
  fetchContacts,
  deleteContact,
  deleteAllContacts,
  saveContacts,
  updateContactToServer,
} from '../services.js';

export const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mounted = useRef(true);

  // Fetch contacts
  const loadContacts = useCallback(async () => {
 
    try {
      setLoading(true);
      setError(null);
      const response = await fetchContacts();
      console.log(response.data)
      if (mounted.current) setContacts(response.data);
    } catch (err) {
      if (mounted.current) setError(err.message);
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    loadContacts();
    return () => {
      mounted.current = false;
    };
  }, [loadContacts]);

  // Remove a single contact
  const removeContact = useCallback(async (phone) => {
    const previousContacts = contacts;
    setContacts(prev => prev.filter(c => c._id !== phone));
    try {
      await deleteContact(phone);
    } catch (err) {
      setContacts(previousContacts);
      if (mounted.current) setError(err.message);
      throw err;
    }
  }, [contacts]);

  // Remove all contacts
  const removeAllContacts = useCallback(async () => {
    const previousContacts = contacts;
    setContacts([]);
    try {
      await deleteAllContacts();
    } catch (err) {
      setContacts(previousContacts);
      if (mounted.current) setError(err.message);
      throw err;
    }
  }, [contacts]);

  // Save the entire contact list (replaces on server)
  const saveAllContacts = useCallback(async (newContacts) => {
    try {
      if(editIndex !== null) {
        await updateContactToServer(newContacts[editIndex]._id, newContacts[editIndex]);
      }
      await saveContacts(newContacts);
      if (mounted.current) setContacts(newContacts);
      return true;
    } catch (err) {
      if (mounted.current) setError(err.message);
      return false;
    }
  }, []);

  return {
    contacts,
    loading,
    error,
    removeContact,
    removeAllContacts,
    saveAllContacts,
    reload: loadContacts, // optional, to refetch
  };
};