import { useState } from "react";
import QRCode from "react-qr-code";
import "./styles.css";

export default function QRCodeGenerator() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [qrValue, setQrValue] = useState("");

  const generateQRCode = () => {
    console.log(name, phone, email, address);

    const vCard = `
BEGIN:VCARD
VERSION:3.0
FN:${name}
TEL:${phone}
EMAIL:${email}
ADR:${address}
END:VCARD
    `.trim();

    setQrValue(vCard);
  };
  return (
    <div className="container">
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Full Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Name"
            required
          />
        </label>
        <label>
          Mobile Number:
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter Your Mobile Number"
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            required
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Your Address"
            required
          />
        </label>
        <button type="button" onClick={generateQRCode}>
          Generate QR Code
        </button>
      </form>
      {qrValue && (
        <div style={{ marginTop: "20px" }}>
          <h2>Your QR Code</h2>
          <QRCode value={qrValue} size={256} />
        </div>
      )}
    </div>
  );
}
