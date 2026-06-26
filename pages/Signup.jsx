import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../utils/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const buttonLabel = useMemo(
    () => (isSubmitting ? "Creating account..." : "Sign up"),
    [isSubmitting]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      await signupUser(email, password);
      setStatus({ type: "success", message: "Account created successfully." });
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      console.log("ERROR OBJECT:", error);
      let message = "Unable to create an account right now.";

      // FastAPI validation errors → array of objects
      if (Array.isArray(error?.detail)) {
        message = error.detail.map((e) => e.msg).join(", ");
      }

      // FastAPI simple string error
      else if (typeof error?.detail === "string") {
        message = error.detail;
      }

      // JS Error object (from auth.js)
      else if (typeof error?.message === "string") {
        message = error.message;
      }

      setStatus({ type: "error", message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        background: "linear-gradient(135deg, #f5f8ff 0%, #eef4ff 100%)",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "460px",
          borderRadius: "28px",
          padding: "2rem",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(242,246,255,0.95) 100%)",
          border: "1px solid rgba(108, 124, 255, 0.18)",
          boxShadow: "0 20px 60px rgba(34, 58, 120, 0.10)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "-20px auto auto -12px",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139, 224, 214, 0.25) 0%, rgba(139, 224, 214, 0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "-30px",
            bottom: "-40px",
            width: "220px",
            height: "220px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(108, 124, 255, 0.18) 0%, rgba(108, 124, 255, 0) 72%)",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <p
            style={{
              marginBottom: "0.4rem",
              color: "#6f7ba8",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontSize: "0.8rem",
            }}
          >
            Welcome to NeuroNav
          </p>
          <h1
            style={{
              fontSize: "1.85rem",
              marginBottom: "0.5rem",
              color: "#23304f",
            }}
          >
            Create your account
          </h1>
          <p
            style={{
              marginBottom: "1.25rem",
              color: "#5b6d89",
              lineHeight: 1.6,
            }}
          >
            Sign up to keep your routine calm, organized, and supported.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.95rem" }}>
            <label
              style={{
                display: "grid",
                gap: "0.35rem",
                color: "#23304f",
                fontWeight: 600,
              }}
            >
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                style={{
                  border: "1px solid #d8def7",
                  borderRadius: "14px",
                  padding: "0.8rem 0.95rem",
                  fontSize: "1rem",
                  outline: "none",
                  background: "#ffffff",
                  color: "#23304f",
                }}
              />
            </label>

            <label
              style={{
                display: "grid",
                gap: "0.35rem",
                color: "#23304f",
                fontWeight: 600,
              }}
            >
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter a secure password"
                required
                minLength={6}
                style={{
                  border: "1px solid #d8def7",
                  borderRadius: "14px",
                  padding: "0.8rem 0.95rem",
                  fontSize: "1rem",
                  outline: "none",
                  background: "#ffffff",
                  color: "#23304f",
                }}
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                border: "none",
                borderRadius: "999px",
                background: "linear-gradient(135deg, #6c7cff 0%, #8ea2ff 100%)",
                color: "#ffffff",
                padding: "0.8rem 1rem",
                fontWeight: 700,
                cursor: isSubmitting ? "not-allowed" : "pointer",
                opacity: isSubmitting ? 0.8 : 1,
              }}
            >
              {buttonLabel}
            </button>
          </form>

          <p style={{ marginTop: "1rem", color: "#5b6d89" }}>
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ color: "#6c7cff", fontWeight: 700, textDecoration: "none" }}
            >
              Sign in
            </Link>
          </p>

          {status.type !== "idle" && (
            <div
              style={{
                marginTop: "1rem",
                padding: "0.8rem 0.95rem",
                borderRadius: "14px",
                background:
                  status.type === "success"
                    ? "rgba(50, 184, 127, 0.12)"
                    : "rgba(235, 87, 87, 0.12)",
                color: status.type === "success" ? "#14804b" : "#b42318",
                border: `1px solid ${
                  status.type === "success"
                    ? "rgba(50, 184, 127, 0.22)"
                    : "rgba(235, 87, 87, 0.22)"
                }`,
              }}
            >
              {status.message}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Signup;
