import MainDashboard from '../Dashboard';
import Inventory from '../Inventory';
import ListMedicine from '../Inventory/apps/Pages/ListMedicine';
import MedicineGroup from '../Inventory/apps/Pages/medicineGroup';
import SalesReport from '../Report';
import SalesReportOne from '../Report/apps/SaleReport';
import PaymentReport from '../Report/apps/PaymentReport';
import Configurations from '../Configuration';
import ContactManagement from '../ContactManagement';
import ContactListPage from '../ContactManagement/ContactListPage';
import ContactReport from '../ContactManagement/ContactReport';
import Notifications from '../Notification';
import Settings from '../Settings';
import GetTechHelp from '../Help';
import UserSupplierPage from './UserSupplierPage';
import CustomerPage from './apps/customerManagement';
import MedicineForm from './MedicineForm/';
import MedicineDashboard from './apps/MedicineDashBoard';
import UserDashboard from './UserDashboard.jsx';
import UserProfile from '../UserProfile';
import MedicineInventory from './apps/MedicineInvetory';
import MedicineItem from './MedicineItem.jsx';
import MedicineDetails from './apps/MedicineGroup';
import SalesChart from './SalesChart.jsx';
import Cosmo from '../Inventory/apps/Pages/cosmo';
import MedicineList from "./MedicineList"


export const componentMap = {
  1: (user) => user.role === 'mainAdmin' ? <MainDashboard /> : <Inventory />,
  13: () => <Inventory />,
  6: () => <MedicineForm />,
  100: () => <SalesChart />,
  20: () => <CustomerPage />,
  3: () => <Notifications />,
  7: () => <ListMedicine />,
  8: () => <MedicineGroup />,
  15: () => <SalesReport />,
  65: () => <MedicineDetails />,
  9: () => <SalesReportOne />,
  10: () => <PaymentReport />,
  22: () => <UserSupplierPage />,
  2: () => <Configurations />,
  11: () => <ContactManagement />,
  17: () => <ContactListPage />,
  26: () => <UserDashboard />,
  18: () => <ContactReport />,
  4: () => <Settings />,
  5: () => <GetTechHelp />,
  24: () => <MedicineDashboard />,
  27: () => <UserProfile />,
  28: () => <MedicineInventory />,
  29: () => <MedicineItem />,
  101: () => <Cosmo />,
  98:() => <MedicineList />
};