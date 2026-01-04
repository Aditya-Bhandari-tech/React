import React, { useState } from "react";

const BACKEND_URL = "http://localhost:5000"; // <-- change this to your backend

const styles = {
  wrap: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f3f4f6", padding: 20 },
  card: { width: 380, background: "#fff", borderRadius: 12, boxShadow: "0 6px 20px rgba(0,0,0,0.08)", padding: 20 },
  title: { textAlign: "center", fontSize: 22, marginBottom: 12 },
  btnRow: { display: "flex", gap: 8, justifyContent: "center", marginBottom: 12 },
  toggleBtn: active => ({ padding: "8px 12px", borderRadius: 8, cursor: "pointer", border: "1px solid #ddd", background: active ? "#2563eb" : "#f3f4f6", color: active ? "#fff" : "#111" }),
  label: { display: "block", marginBottom: 8, fontSize: 13 },
  input: { width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid #ddd", marginBottom: 12, boxSizing: "border-box" },
  submit: { width: "100%", padding: 10, borderRadius: 8, background: "#16a34a", color: "#fff", border: "none", cursor: "pointer" },
  msgError: { background: "#fee2e2", color: "#b91c1c", padding: 8, borderRadius: 8, marginTop: 10 },
  msgSuccess: { background: "#ecfdf5", color: "#065f46", padding: 8, borderRadius: 8, marginTop: 10 },
  tip: { marginTop: 12, fontSize: 12, color: "#6b7280" }
};

export default function AuthPage() {
  const [mode, setMode] = useState("login"); // 'login' or 'register'
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);

    if (mode === "register") {
      if (!form.name.trim()) return setMessage({ type: "error", text: "Name is required" });
      if (form.password !== form.confirmPassword) return setMessage({ type: "error", text: "Passwords do not match" });
    }
    if (!form.email || !form.password) return setMessage({ type: "error", text: "Email and password are required" });

    setLoading(true);
    try {
      const url = mode === "login" ? `${BACKEND_URL}/api/auth/login` : `${BACKEND_URL}/api/auth/register`;
      const body = mode === "login"
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const errText = data?.message || JSON.stringify(data) || "Server error";
        setMessage({ type: "error", text: errText });
      } else {
        setMessage({ type: "success", text: data?.message || "Success" });
        if (data?.token) localStorage.setItem("token", data.token);
        if (data?.user) localStorage.setItem("user", JSON.stringify(data.user));
        setForm(prev => ({ ...prev, password: "", confirmPassword: "" }));
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Network error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.card}>
        <h2 style={styles.title}>{mode === "login" ? "Login" : "Register"}</h2>

        <div style={styles.btnRow}>
          <button
            type="button"
            onClick={() => { setMode("login"); setMessage(null); }}
            style={styles.toggleBtn(mode === "login")}
          >Login</button>
          <button
            type="button"
            onClick={() => { setMode("register"); setMessage(null); }}
            style={styles.toggleBtn(mode === "register")}
          >Register</button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === "register" && (
            <>
              <label style={styles.label}>Name</label>
              <input name="name" value={form.name} onChange={handleChange} style={styles.input} placeholder="Your name" />
            </>
          )}

          <label style={styles.label}>Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} style={styles.input} placeholder="you@example.com" />

          <label style={styles.label}>Password</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} style={styles.input} placeholder="password" />

          {mode === "register" && (
            <>
              <label style={styles.label}>Confirm Password</label>
              <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} style={styles.input} placeholder="confirm password" />
            </>
          )}

          <button type="submit" disabled={loading} style={{ ...styles.submit, opacity: loading ? 0.7 : 1 }}>
            {loading ? "Please wait..." : (mode === "login" ? "Login" : "Create account")}
          </button>
        </form>

        {message && (
          <div style={message.type === "error" ? styles.msgError : styles.msgSuccess}>
            {message.text}
          </div>
        )}

        <div style={styles.tip}>
          Tip: After success check browser DevTools → Application → Local Storage for keys `token` and `user`.
        </div>
      </div>
    </div>
  );
}
