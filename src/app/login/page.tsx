"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/ui/Brand";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("That username and password did not match.");
    } else {
      // Redirect manually or useRouter
      window.location.href = "/dashboard";
    }
  };

  return (
    <main id="main-content" className="login-layout">
      <div className="login-panel">
        <Link href="/" className="login-brand" aria-label="YAER home">
          <Wordmark decorative />
        </Link>
        <p className="eyebrow">Your publishing space</p>
        <h1>
          Welcome back<span className="acid-text">.</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          {error && (
            <p role="alert" className="text-red-400 text-sm">
              {error}
            </p>
          )}
          <button type="submit" className="button-acid">
            Sign in <span aria-hidden="true">↗</span>
          </button>
        </form>
        <Link href="/" className="text-link">
          ← Back to the website
        </Link>
      </div>
    </main>
  );
}
