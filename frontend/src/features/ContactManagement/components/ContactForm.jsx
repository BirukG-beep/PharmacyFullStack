import { FaUser, FaEnvelope, FaPhone, FaPlus , FaAddressBook } from 'react-icons/fa';

const ContactForm = ({
  setContactDisplay,
  handleSubmit,
  errors,
  register,
  editIndex,
  contacts,
  setContacts,
  setEditIndex,
  reset,
  onSubmit // utility function
}) => {
  // Wrapper to pass form data and all dependencies to the utility
  const onFormSubmit = (formData) => {
    console.log("Form submitted with data:", formData); // Debug log
    onSubmit(formData, editIndex, contacts, setEditIndex, setContacts, reset, setContactDisplay);
  };

  return (
    <div className="modal">
      <div className="formBox">
        <div className='titlecontainer'>
          <p className='text'>You Can Add Your Contact Information To Be Able To Communicate With You</p>
        </div>
        <button className="closeBtn" onClick={() => setContactDisplay(false)}>×</button>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="inputGroup">
            <FaUser />
            <input {...register("name", { required: true })} placeholder="Name" />
            {errors.name && <span>Name required</span>}
          </div>
          <div className="inputGroup">
            <FaEnvelope />
            <input
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+$/i
              })}
              placeholder="Email"
            />
            {errors.email && <span>Valid email required</span>}
          </div>
             <div className="inputGroup">
            <FaAddressBook />
            <input {...register("address", { required: true })} placeholder="Adress" />
            {errors.name && <span>Adress</span>}
          </div>
          <div className="inputGroup">
            <FaPhone />
            <input {...register("phone")} placeholder="Phone" />
          </div>
          <button type="submit" className="submitBtn">
            <FaPlus /> {editIndex !== null ? 'Update' : 'Add'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;