import jsPDF from "jspdf";

/**
 * Generate a receipt PDF from cart items.
 * @param {Array} cartItems - array of items in the cart
 *  Each item should have: name, price, quantity, tax, itemTax, totalPrice
 */
export const generateReceipt = (cartItems) => {
  if (!cartItems || !cartItems.length) return;

  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text("Receipt for Pharmacy", 14, 16);
  doc.setFontSize(12);
  doc.setLineHeightFactor(1.5);

  let startY = 30;

  cartItems.forEach((item, index) => {
    doc.text(`Item ${index + 1}:`, 14, startY);
    startY += 8;

    doc.text(`Name: ${item.name}`, 14, startY);
    doc.text(`Price: $${item.price.toFixed(2)}`, 100, startY);
    startY += 8;

    doc.text(`Quantity: ${item.quantity}`, 14, startY);
    doc.text(`Item Tax: ${item.itemTax}`, 100, startY);
    startY += 8;

    doc.text(`Tax Amount: $${item.tax.toFixed(2)}`, 14, startY);
    doc.text(`Total Price: $${item.totalPrice.toFixed(2)}`, 100, startY);
    startY += 10;

    // Line separator
    doc.line(14, startY, 196, startY);
    startY += 5;
  });

  // Save PDF
  doc.save("receipt.pdf");
};