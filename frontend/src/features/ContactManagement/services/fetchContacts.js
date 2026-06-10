export  const fetchContacts = async () => {
    try {
        const token = localStorage.getItem("token");
      const response = await fetch('http://localhost:4000/api/customer', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();

      console.log(data)
      return data;
      
    } catch (error) {
      console.error(error);
      alert('Failed to fetch contacts');
    }
  };