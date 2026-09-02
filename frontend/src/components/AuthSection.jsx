import { useState } from "react";

export default function AuthSection({
  onClose,
  handleSignin, submitSignin, signinmessage,
  handleSignup, submitSignup, signupmsg,
}) {
  const [tab, setTab] = useState("signin");

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-edge bg-surface p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">
            {tab === "signin" ? "Sign in" : "Create an account"}
          </h2>
          <button type="button" onClick={onClose} className="text-muted hover:text-ink">
            ✕
          </button>
        </div>

        <div className="mb-5 flex rounded-full border border-edge bg-card p-1">
          <button
            type="button"
            onClick={() => setTab("signin")}
            className={`flex-1 rounded-full py-2 text-sm font-medium transition ${
              tab === "signin" ? "bg-accent text-white" : "text-muted"
            }`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => setTab("signup")}
            className={`flex-1 rounded-full py-2 text-sm font-medium transition ${
              tab === "signup" ? "bg-accent text-white" : "text-muted"
            }`}
          >
            Sign up
          </button>
        </div>

        {tab === "signin" ? (
          <div className="flex flex-col gap-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleSignin}
              className="rounded-lg border border-edge bg-card px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleSignin}
              className="rounded-lg border border-edge bg-card px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
            />
            <button
              type="button"
              onClick={submitSignin}
              className="rounded-lg bg-accent py-2 text-sm font-medium text-white hover:bg-accent-strong"
            >
              Sign in
            </button>
            {signinmessage && <p className="text-center text-sm text-muted">{signinmessage}</p>}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleSignup}
              className="rounded-lg border border-edge bg-card px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleSignup}
              className="rounded-lg border border-edge bg-card px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
            />
            <button
              type="button"
              onClick={submitSignup}
              className="rounded-lg bg-accent py-2 text-sm font-medium text-white hover:bg-accent-strong"
            >
              Create account
            </button>
            {signupmsg && <p className="text-center text-sm text-muted">{signupmsg}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
