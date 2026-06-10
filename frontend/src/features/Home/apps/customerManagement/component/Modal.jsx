import {Form , Input , Button , Modal} from "antd"
import { useState } from "react";
import {useCustomer} from "../hooks/customer"
export const EditModal = ({modal , setModal , editingCustomer , setEditingCustomer}) =>{

  const {edit}  = useCustomer();

  const handleSaveEdit = () =>{
    edit(editingCustomer);
  }
    return (
         <Modal
        title="Edit Customer"
        open={modal}
        onCancel={() => setModal(false)}
        footer={null}
      >
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input
              value={editingCustomer?.name || ''}
              onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              type="email"
              value={editingCustomer?.email || ''}
              onChange={(e) => setEditingCustomer({ ...editingCustomer, email: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Phone">
            <Input
              value={editingCustomer?.phone || ''}
              onChange={(e) => setEditingCustomer({ ...editingCustomer, phone: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="DateTime">
            <Input
              value={editingCustomer?.dateTime || ''}
              onChange={(e) => setEditingCustomer({ ...editingCustomer, dateTime: e.target.value })}
            />
          </Form.Item>
          <Button type="primary" onClick={handleSaveEdit}>Save</Button>
        </Form>
      </Modal>
    )
}

export default EditModal;