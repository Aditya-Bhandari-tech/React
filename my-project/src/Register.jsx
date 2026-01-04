import React, { useState } from "react";

/*
  Register.jsx
  - Single page for registration only.
  - Edit BACKEND_URL and REGISTER_PATH if your API differs.
  - On success, stores token (if returned) and user (if returned) in localStorage.
*/

const BACKEND_URL = "http://localhost:5000"; // <-- change to your backend
const REGISTER_PATH = "/api/auth/register";  // <-- change if your backend path differs

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    phone: "",
    branch: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function validate() {
    if (!form.name.trim()) return "Name is required";
    if (!form.email.trim()) return "Email is required";
    if (!form.password) return "Password is required";
    if (!form.role.trim()) return "Role is required";
    if (!form.phone.trim()) return "Phone is required";
    if (!form.branch.trim()) return "Branch is required";
    // optional: basic phone length check
    if (!/^\d{10}$/.test(form.phone)) return "Phone must be 10 digits";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);

    const err = validate();
    if (err) {
      setMessage({ type: "error", text: err });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}${REGISTER_PATH}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      // try parse JSON safely
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // try to show helpful error text
        const text = data?.message || data?.error || JSON.stringify(data) || `HTTP ${res.status}`;
        setMessage({ type: "error", text });
      } else {
        // success
        setMessage({ type: "success", text: data?.message || "Registered successfully" });

        // save token/user if backend returns them
        if (data?.token) localStorage.setItem("token", data.token);
        if (data?.user) localStorage.setItem("user", JSON.stringify(data.user));

        // optional: clear password only
        setForm(prev => ({ ...prev, password: "" }));
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Network error" });
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    width: "100%", padding: 10, marginBottom: 10, borderRadius: 6, border: "1px solid #ddd", boxSizing: "border-box"
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f7f7fb", padding: 20 }}>
      <div style={{ width: 420, background: "#fff", padding: 20, borderRadius: 10, boxShadow: "0 6px 20px rgba(0,0,0,0.08)" }}>
        <h2 style={{ marginBottom: 8 }}>Register</h2>
        <p style={{ marginTop: 0, marginBottom: 12, color: "#555" }}>Create an account</p>

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Full name" value={form.name} onChange={handleChange} style={inputStyle} />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} style={inputStyle} />
          <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} style={inputStyle} />
          <input name="role" placeholder="Role (admin/student/teacher)" value={form.role} onChange={handleChange} style={inputStyle} />
          <input name="phone" placeholder="Phone (10 digits)" value={form.phone} onChange={handleChange} style={inputStyle} />
          <input name="branch" placeholder="Branch (IT, CS, AIML...)" value={form.branch} onChange={handleChange} style={inputStyle} />

          <button type="submit" disabled={loading} style={{
            width: "100%", padding: 10, borderRadius: 8, border: "none", background: "#0ea5a4", color: "#fff", cursor: "pointer"
          }}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        {message && (
          <div style={{
            marginTop: 12, padding: 10, borderRadius: 6,
            background: message.type === "error" ? "#ffe4e6" : "#ecfdf5",
            color: message.type === "error" ? "#9f1239" : "#065f46"
          }}>
            {message.text}
          </div>
        )}

        <div style={{ marginTop: 12, fontSize: 13, color: "#666" }}>
          Tip: After success — check DevTools → Application → Local Storage for keys <code>token</code> and <code>user</code>.
        </div>
      </div>
    </div>
  );
}
