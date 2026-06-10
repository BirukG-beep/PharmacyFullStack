import styled from 'styled-components';
export const Container = styled.div`
  padding: 2rem;
  background-color: #f1f5f9;
  height: 82vh;
  overflow-y: auto;
`;

export const SearchContainer = styled.div`
  margin-bottom: 1rem;
  position: relative;
`;

export const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
`;

export const ContactList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-height: 400px;
  overflow-y: auto;
`;

export const ContactItem = styled.li`
  display: flex;
  flex-direction:column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 0.5rem;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const ContactText = styled.span`
  font-size: 1rem;
  color: #333;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #007bff;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;

  &:hover {
    color: #0056b3;
  }
`;

export const ContactDetail = styled.div`
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: 'DM Sans', sans-serif;
`;

export const MedicineItem = styled.div`
  margin-bottom: 10px;
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #dc3545;
  font-size: 1.2rem;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;

  &:hover {
    color: #c82333;
  }
`;

export const ClearButton = styled.button`
  background: #dc3545;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 1rem;

  &:hover {
    background: #c82333;
  }
`;