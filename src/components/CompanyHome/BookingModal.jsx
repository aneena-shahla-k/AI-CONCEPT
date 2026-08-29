import React, { useState } from "react";
import { X, Calendar, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import "./BookingModal.css";

export default function BookingModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    serviceType: "Web Architecture & E-Commerce",
    preferredDate: "",
    preferredSlot: "10:00 AM - 01:00 PM (Morning)",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // WhatsApp വഴി നേരിട്ട് ബുക്ക് ചെയ്യാനുള്ള ഫങ്ഷൻ
  const handleWhatsAppBooking = () => {
    const phoneNumber = "919000000000"; // നിങ്ങളുടെ WhatsApp നമ്പർ ഇവിടെ നൽകുക
    const message = encodeURIComponent(
      `*NEW 1:1 DISCOVERY CALL REQUEST*\n\n` +
      `*Name:* ${formData.name || "Client"}\n` +
      `*Contact:* ${formData.contact}\n` +
      `*Focus Area:* ${formData.serviceType}\n` +
      `*Preferred Date:* ${formData.preferredDate || "Earliest Available"}\n` +
      `*Preferred Time:* ${formData.preferredSlot}\n` +
      `*Notes:* ${formData.notes || "None"}`
    );

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    setSubmitted(true);
  };

  // ഇമെയിൽ വഴി അയയ്ക്കാനുള്ള ഫങ്ഷൻ
  const handleEmailBooking = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`1:1 Call Request: ${formData.name}`);
    const body = encodeURIComponent(
      `--- 1:1 DISCOVERY SPRINT REQUEST ---\n\n` +
      `Name: ${formData.name}\n` +
      `Contact (Phone/Email): ${formData.contact}\n` +
      `Domain: ${formData.serviceType}\n` +
      `Date: ${formData.preferredDate}\n` +
      `Time Slot: ${formData.preferredSlot}\n` +
      `Brief Notes: ${formData.notes}`
    );

    window.location.href = `mailto:info@aiconcept.in?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="bk-modal-backdrop" onClick={onClose}>
      <div className="bk-modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="bk-modal-header">
          <div className="bk-modal-title">
            <div className="bk-modal-badge">
              <Calendar size={14} />
            </div>
            <div>
              <h4>BOOK 1:1 DISCOVERY CALL</h4>
              <p>Quick 15-minute architectural & roadmap session</p>
            </div>
          </div>
          <button type="button" className="bk-modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <div className="bk-modal-success">
            <CheckCircle2 size={44} className="bk-success-icon" />
            <h3>Call Request Initiated</h3>
            <p>We will confirm your selected slot and share the direct meeting link shortly.</p>
            <button 
              type="button" 
              className="bk-done-btn"
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
            >
              CLOSE
            </button>
          </div>
        ) : (
          <form onSubmit={handleEmailBooking} className="bk-modal-form">
            <div className="bk-form-grid">
              <div className="bk-input-group">
                <label>YOUR NAME *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="bk-input-group">
                <label>WHATSAPP / PHONE NUMBER *</label>
                <input
                  type="text"
                  name="contact"
                  required
                  placeholder="+91 00000 00000"
                  value={formData.contact}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="bk-form-grid">
              <div className="bk-input-group">
                <label>PREFERRED DATE</label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                />
              </div>

              <div className="bk-input-group">
                <label>TIME WINDOW</label>
                <select
                  name="preferredSlot"
                  value={formData.preferredSlot}
                  onChange={handleChange}
                >
                  <option>10:00 AM - 01:00 PM (Morning)</option>
                  <option>02:00 PM - 05:00 PM (Afternoon)</option>
                  <option>06:00 PM - 09:00 PM (Evening)</option>
                </select>
              </div>
            </div>

            <div className="bk-input-group">
              <label>PROJECT DOMAIN</label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
              >
                <option>Web Architecture & E-Commerce</option>
                <option>Business ERP / CRM System</option>
                <option>Mobile App Development</option>
                <option>Custom AI Agents & Automation</option>
              </select>
            </div>

            <div className="bk-actions-split">
              <button
                type="button"
                className="bk-whatsapp-btn"
                onClick={handleWhatsAppBooking}
              >
                <MessageSquare size={15} />
                <span>BOOK VIA WHATSAPP</span>
              </button>

              <button type="submit" className="bk-mail-btn">
                <Send size={14} />
                <span>REQUEST VIA EMAIL</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}