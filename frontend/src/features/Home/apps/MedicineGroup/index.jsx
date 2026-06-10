import { useSelector, useDispatch } from 'react-redux';
import { toggleClicked } from '../../../../Reducer/dashboardSlice';
import { setSelectedMedicine } from '../../../../Reducer/MedicineSlice';
import { useMediaQuery } from 'react-responsive';
import { useMedicineGroup } from './useMedicineGroup';
import { useTheme } from '../../../../hooks/useTheme';

import {
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Button,
  Empty,
} from 'antd';

import {
  MedicineBoxOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const MedicineDetails = () => {
  const isMediumOrLarger = useMediaQuery({ query: '(min-width: 500px)' });
  const selectedGroupId = useSelector(state => state.slice.selectedGroupId);

  const dispatch = useDispatch();
  const theme = useTheme();
  const { medicineGroup } = useMedicineGroup();

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: theme.backgroundColor,
        height: '89vh',
        overflowY: 'auto',
      }}
    >
      {/* HEADER */}
      <Title level={3} style={{ color: theme.textColor }}>
        🧾 Group Details: {selectedGroupId}
      </Title>

      {/* EMPTY STATE */}
      {!medicineGroup?.length ? (
        <Empty description="No medicines found" />
      ) : (
        <Row gutter={[16, 16]}>
          {medicineGroup.map((medicine) => (
            <Col xs={24} sm={12} md={8} lg={6} key={medicine._id}>
              <Card
                hoverable
                bordered={false}
                style={{
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                }}
                title={
                  <span>
                    <MedicineBoxOutlined /> {medicine.medicineName}
                  </span>
                }
              >
                {/* DESCRIPTION */}
                <Text type="secondary">
                  {medicine.medicineDescription}
                </Text>

                <br />
                <br />

                {/* TAGS */}
                <div style={{ marginBottom: '10px' }}>
                  <Tag color="blue">{medicine.medicineGroup}</Tag>
                  <Tag color="purple">{medicine.unit}</Tag>
                  <Tag color="geekblue">ID: {medicine.medicineId}</Tag>
                </div>

                {/* DETAILS */}
                <div style={{ marginBottom: '10px' }}>
                  <Text>
                    <DollarOutlined /> Price: <strong>{medicine.price}</strong>
                  </Text>
                  <br />
                  <Text>
                    <ShoppingCartOutlined /> Qty: <strong>{medicine.quantity}</strong>
                  </Text>
                  <br />
                  <Text>Size: {medicine.singleSize}</Text>
                  <br />
                  <Text>Sold In: {medicine.soldIn}</Text>
                  <br />
                  <Text>Strip/Pack: {medicine.stripPerPk}</Text>
                </div>

                {/* ACTION */}
                {isMediumOrLarger && (
                  <Button
                    type="primary"
                    block
                    onClick={() => {
                      dispatch(setSelectedMedicine(medicine));
                      dispatch(toggleClicked(28));
                    }}
                  >
                    Sell Medicine
                  </Button>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default MedicineDetails;