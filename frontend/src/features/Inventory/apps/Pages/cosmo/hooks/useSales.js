
import {createSale , updateCosmo} from "../services/cosmoService"
export const useSales = (
  user,
  fetchItems,
  addToCart
) => {

  const handleSale = async ({ item, quantity  }) => {
    const updatedItem = {
      ...item,
      quantity: item.quantity - quantity,
    };

    const token = localStorage.getItem("token");

    console.log(item)
    await updateCosmo(item._id, 
       updatedItem );

    await createSale({
      name: item.name,
      price: item.price,
      quantity,
      pharmacist: user.username,
      _id:item._id
    });

    fetchItems();

    console.log(item , quantity)

    // 🔥 connect cart here
    addToCart(item, quantity);
  };

  return { handleSale };
};