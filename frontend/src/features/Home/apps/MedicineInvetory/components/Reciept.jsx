import { Card, Row, Col, Button } from 'antd';
import jsPDF from 'jspdf';
import { format } from 'date-fns'; // optional, for date formatting

const Receipt = ({ cartsItem = [] }) => {
  // Calculate totals
  const subtotal = cartsItem.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalTax = cartsItem.reduce((sum, item) => sum + (item.price * item.quantity * item.tax), 0);
  const grandTotal = cartsItem.reduce((sum, item) => sum + item.totalPrice, 0);

  const downloadReceipt = () => {
    const doc = new jsPDF();
    let y = 20;

    // Header
    doc.setFontSize(18);
    doc.text("Taddesse Pharmacy", 105, y, { align: "center" });
    y += 8;
    doc.setFontSize(10);
    doc.text("Your Trusted Health Partner", 105, y, { align: "center" });
    y += 8;
    doc.text(`Date: ${new Date().toLocaleString()}`, 105, y, { align: "center" });
    y += 12;

    // Items header
    doc.setFontSize(11);
    doc.text("Item", 14, y);
    doc.text("Qty", 100, y);
    doc.text("Price", 130, y);
    doc.text("Total", 160, y);
    y += 6;
    doc.line(14, y, 196, y);
    y += 6;

    // Items
    doc.setFontSize(10);
    cartsItem.forEach((item) => {
      doc.text(item.name.substring(0, 20), 14, y);
      doc.text(item.quantity.toString(), 100, y);
      doc.text(`$${item.price.toFixed(2)}`, 130, y);
      doc.text(`$${item.totalPrice.toFixed(2)}`, 160, y);
      y += 6;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    // Totals
    y += 6;
    doc.line(14, y, 196, y);
    y += 6;
    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 130, y);
    y += 6;
    doc.text(`Tax (total): $${totalTax.toFixed(2)}`, 130, y);
    y += 6;
    doc.setFontSize(12);
    doc.text(`Grand Total: $${grandTotal.toFixed(2)}`, 130, y);

    // Footer
    y += 12;
    doc.setFontSize(9);
    doc.text("Thank you for shopping with us!", 105, y, { align: "center" });
    doc.save("receipt.pdf");
  };

  return (
    <div style={{ padding: "24px", background: "#f0f2f5", minHeight: "100vh" }}>
      <Button
        type="primary"
        onClick={downloadReceipt}
        style={{ marginBottom: "24px", float: "right" }}
      >
        Download Receipt (PDF)
      </Button>

      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          padding: "32px 24px",
          fontFamily: "'Courier New', monospace", // gives classic receipt feel
        }}
      >
        {/* Store Header */}
        <div style={{ textAlign: "center", borderBottom: "2px dashed #ccc", paddingBottom: "16px", marginBottom: "24px" }}>
          <h2 style={{ margin: 0, letterSpacing: "1px" }}>🏥 TADDESSE PHARMACY</h2>
          <p style={{ margin: "4px 0 0", color: "#555" }}>Addis Ababa, Bole Road</p>
          <p style={{ margin: 0, fontSize: "12px", color: "#777" }}>Tel: +251-911-123456</p>
          <p style={{ margin: "8px 0 0", fontSize: "12px" }}>
            {new Date().toLocaleString()}
          </p>
        </div>

        {/* Receipt Items Table */}
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #ddd" }}>
              <th style={{ textAlign: "left", padding: "8px 0" }}>Item</th>
              <th style={{ textAlign: "center", padding: "8px 0" }}>Qty</th>
              <th style={{ textAlign: "right", padding: "8px 0" }}>Unit</th>
              <th style={{ textAlign: "right", padding: "8px 0" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartsItem.map((item) => (
              <tr key={item.id} style={{ borderBottom: "1px dotted #eee" }}>
                <td style={{ padding: "8px 0" }}>
                  {item.name}
                  <span style={{ fontSize: "11px", color: "#666", display: "block" }}>
                    ({item.soldIn}) • Tax: {(item.tax * 100).toFixed(0)}%
                  </span>
                </td>
                <td style={{ textAlign: "center", padding: "8px 0" }}>{item.quantity}</td>
                <td style={{ textAlign: "right", padding: "8px 0" }}>{item.price.toFixed(2)} ETB</td>
                <td style={{ textAlign: "right", padding: "8px 0" }}>{item.totalPrice.toFixed(2)} ETB</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals Section */}
        <div style={{ marginTop: "24px", borderTop: "2px dashed #ccc", paddingTop: "16px", textAlign: "right" }}>
          <p style={{ margin: "4px 0", fontSize: "14px" }}>
            Subtotal: <span style={{ fontFamily: "monospace" }}>{subtotal.toFixed(2)}ETB</span>
          </p>
          <p style={{ margin: "4px 0", fontSize: "14px" }}>
            Total Tax: <span style={{ fontFamily: "monospace" }}>{totalTax.toFixed(2)} ETB</span>
          </p>
          <p style={{ margin: "8px 0 0", fontSize: "18px", fontWeight: "bold" }}>
            GRAND TOTAL: {grandTotal.toFixed(2)} ETB
          </p>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: "32px", fontSize: "12px", color: "#888" }}>
          <p>*** Thank you for your purchase! ***</p>
          <p>Keep this receipt for warranty & returns</p>
        </div>
      </div>
    </div>
  );
};

export default Receipt;