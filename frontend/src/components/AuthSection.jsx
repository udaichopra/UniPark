import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  .unipark-root {
    min-height: 100vh;
    background: #060d1a;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
  }

  .unipark-root::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 50% -10%, rgba(59, 130, 246, 0.18) 0%, transparent 70%),
      radial-gradient(ellipse 40% 40% at 80% 80%, rgba(99, 60, 180, 0.12) 0%, transparent 60%);
    pointer-events: none;
  }

  /* Animated grid */
  .grid-bg {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(59,130,246,0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59,130,246,0.045) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }

  .card {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 420px;
    padding: 0 20px;
    animation: fadeUp 0.7s cubic-bezier(.22,1,.36,1) both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .logo-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 32px;
  }

  .logo-icon {
    width: 64px;
    height: 64px;
    border-radius: 20px;
    background: linear-gradient(135deg, #3b82f6 0%, #6d28d9 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 14px;
    box-shadow: 0 0 36px rgba(99,102,241,0.35);
    font-size: 30px;
  }

  .logo-name {
    font-family: 'Syne', sans-serif;
    font-size: 28px;
    font-weight: 800;
    letter-spacing: -0.5px;
    background: linear-gradient(90deg, #60a5fa, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .tagline {
    color: rgba(180, 200, 230, 0.72);
    font-size: 14px;
    font-weight: 300;
    text-align: center;
    line-height: 1.6;
    max-width: 320px;
    margin: 0 auto 36px;
    letter-spacing: 0.01em;
  }

  .auth-box {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 20px;
    padding: 32px 28px;
    backdrop-filter: blur(14px);
    box-shadow: 0 24px 60px rgba(0,0,0,0.4);
  }

  .tab-row {
    display: flex;
    gap: 8px;
    margin-bottom: 28px;
    background: rgba(0,0,0,0.25);
    border-radius: 12px;
    padding: 4px;
  }

  .tab-btn {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 9px;
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.22s;
    letter-spacing: 0.02em;
  }

  .tab-btn.active {
    background: linear-gradient(135deg, #3b82f6, #6d28d9);
    color: #fff;
    box-shadow: 0 4px 18px rgba(99,102,241,0.35);
  }

  .tab-btn:not(.active) {
    background: transparent;
    color: rgba(180,200,230,0.5);
  }

  .tab-btn:not(.active):hover {
    color: rgba(180,200,230,0.9);
  }

  .field {
    margin-bottom: 18px;
  }

  .field label {
    display: block;
    font-size: 12px;
    font-weight: 500;
    color: rgba(148,175,220,0.8);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .field input {
    width: 100%;
    padding: 13px 16px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    color: #e2eaf5;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    outline: none;
    transition: border 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
  }

  .field input:focus {
    border-color: rgba(99,102,241,0.6);
    box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
  }

  .field input::placeholder {
    color: rgba(148,175,220,0.3);
  }

  .submit-btn {
    width: 100%;
    padding: 14px;
    margin-top: 8px;
    background: linear-gradient(135deg, #3b82f6 0%, #6d28d9 100%);
    border: none;
    border-radius: 12px;
    color: #fff;
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 6px 24px rgba(99,102,241,0.35);
  }

  .submit-btn:hover {
    opacity: 0.92;
    transform: translateY(-1px);
    box-shadow: 0 10px 32px rgba(99,102,241,0.45);
  }

  .submit-btn:active {
    transform: translateY(0);
  }

  .msg {
    margin-top: 16px;
    padding: 12px 16px;
    border-radius: 10px;
    font-size: 13.5px;
    text-align: center;
    animation: fadeUp 0.3s ease both;
  }

  .msg.success {
    background: rgba(52,211,153,0.1);
    border: 1px solid rgba(52,211,153,0.25);
    color: #6ee7b7;
  }

  .msg.error {
    background: rgba(248,113,113,0.1);
    border: 1px solid rgba(248,113,113,0.25);
    color: #fca5a5;
  }

  .divider {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 20px 0;
  }

  .divider-line {
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.08);
  }

  .divider-text {
    font-size: 11px;
    color: rgba(148,175,220,0.35);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
`;

export default function AuthSection({
  signinform, signin, handleSignin, submitSignin, signinmessage,
  signupform, signup, handleSignup, submitSignup, signupmsg
}) {
  const [tab, setTab] = useState("signin");

  const handleTabSignin = () => { setTab("signin"); signin && signin(); };
  const handleTabSignup = () => { setTab("signup"); signup && signup(); };

  return (
    <>
      <style>{styles}</style>
      <div className="unipark-root">
        <div className="grid-bg" />
        <div className="card">
          <p className="tagline">
            Discover, list, and book parking spots around university campuses — simply and securely.
          </p>
          <div className="auth-box">
            {/* Tabs */}
            <div className="tab-row">
              <button
                className={`tab-btn${tab === "signin" ? " active" : ""}`}
                onClick={handleTabSignin}
              >Sign In</button>
              <button
                className={`tab-btn${tab === "signup" ? " active" : ""}`}
                onClick={handleTabSignup}
              >Sign Up</button>
            </div>

            {/* Sign In Form */}
            {(tab === "signin") && (
              <div>
                <div className="field">
                  <label>Email</label>
                  <input type="email" name="email" placeholder="you@university.edu" onChange={handleSignin} />
                </div>
                <div className="field">
                  <label>Password</label>
                  <input type="password" name="password" placeholder="••••••••" onChange={handleSignin} />
                </div>
                <button className="submit-btn" onClick={submitSignin}>Sign In →</button>
                {signinmessage && (
                  <div className={`msg ${signinmessage.toLowerCase().includes("error") || signinmessage.toLowerCase().includes("invalid") ? "error" : "success"}`}>
                    {signinmessage}
                  </div>
                )}
              </div>
            )}

            {/* Sign Up Form */}
            {(tab === "signup") && (
              <div>
                <div className="field">
                  <label>Email</label>
                  <input type="email" name="email" placeholder="you@university.edu" onChange={handleSignup} />
                </div>
                <div className="field">
                  <label>Password</label>
                  <input type="password" name="password" placeholder="Create a password" onChange={handleSignup} />
                </div>
                <button className="submit-btn" onClick={submitSignup}>Create Account →</button>
                {signupmsg && (
                  <div className={`msg ${signupmsg.toLowerCase().includes("error") || signupmsg.toLowerCase().includes("invalid") ? "error" : "success"}`}>
                    {signupmsg}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}