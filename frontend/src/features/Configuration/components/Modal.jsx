import { Modal , Form , Input , Button } from "antd";
const ModalForm = ({isModalOpen , setIsModalOpen , editUser , editFormData , handleFormChange , }) =>{
    return(   <Modal
        title="Edit User"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form onFinish={editUser} layout="vertical">
          <Form.Item label="Name" required>
            <Input
              name="name"
              value={editFormData.name}
              onChange={handleFormChange}
            />
          </Form.Item>

          <Form.Item label="Phone" required>
            <Input
              name="phone"
              value={editFormData.phone}
              onChange={handleFormChange}
            />
          </Form.Item>

          <Form.Item label="Address" required>
            <Input
              name="address"
              value={editFormData.address}
              onChange={handleFormChange}
            />
          </Form.Item>

          <Form.Item label="Email" required>
            <Input
              name="email"
              type="email"
              value={editFormData.email}
              onChange={handleFormChange}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>)
}

export default ModalForm;