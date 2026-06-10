import { useDispatch } from "react-redux";
import { SetPharmacist } from "../../../Reducer/pharmacist";
import UserCard from './components/UserCard';
import SupplierCard from './components/SupplierCard';
import styled from 'styled-components';
import { useTheme } from "../../../hooks/useTheme";
import {useCustomerAndSupplier} from "./hooks"
import {toggleClicked} from "../../../Reducer/dashboardSlice"
const PageContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  height:86vh;
  overflowY:auto;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const UserSupplierPage = () => {

  const theme = useTheme();
  
  const {suppliers , customers , loading , error} = useCustomerAndSupplier();


    const dispatch = useDispatch();


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer style={{backgroundColor: theme.backgroundColor, height:"89vh" , boxSizing:"border-box"}}>
      <Title style={{color: theme.textColor}}>Users and Suppliers</Title>

      <h2 style={{color:theme.textColor}}>Users</h2>
      <CardContainer>
        {customers.length > 0 ? customers.map(user => <UserCard key={user.id} user={user} />) : <p>No users available.</p>}
      </CardContainer>

      <h2 style={{color:theme.textColor}}>Suppliers</h2>
     <CardContainer>
  {suppliers.length > 0
    ? suppliers.map((supplier) => (
        <SupplierCard
          key={supplier.id}
          supplier={supplier}
          onClick={() => {
            dispatch(SetPharmacist(supplier._id));
            dispatch(toggleClicked(98));
          }}
        />
      ))
    : <p>No suppliers available.</p>}
</CardContainer>
    </PageContainer>
  );
};

export default UserSupplierPage;
