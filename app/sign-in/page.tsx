/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
// @ts-nocheck
import React, { useState } from "react";
import gqlClient from "@/service/gql";
import { gql } from "graphql-tag";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function SignInPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const SIGNIN_USER = gql`
    mutation SignInUser($email: String!, $password: String) {
      signInUser(email: $email, password: $password)
    }
  `;
  //@ts-ignore
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  //@ts-ignore
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const data = await gqlClient.request(SIGNIN_USER, {
        email: form.email,
        password: form.password,
      });
      //@ts-ignore
      if (data?.signInUser) {
        setSuccess(true);
         window.location.href = "/";
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Error signing in");
      console.error(err);
    }
    setLoading(false);
  };
  return (
    <div className="min-h-screen p-2 flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900  p-8 rounded shadow-md w-full max-w-md flex flex-col gap-4"
      >
        <div className="flex items-center">
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10"
          >
            <defs>
              <linearGradient
                id="blogGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" style={{ stopColor: "#3b82f6" }} />
                <stop offset="100%" style={{ stopColor: "#8b5cf6" }} />
              </linearGradient>
            </defs>
            <rect
              x="25"
              y="15"
              width="50"
              height="70"
              rx="5"
              fill="url(#blogGradient)"
              stroke="white"
              strokeWidth="2"
            />
            <rect x="30" y="25" width="20" height="3" rx="1.5" fill="white" />
            <rect
              x="30"
              y="32"
              width="35"
              height="2"
              rx="1"
              fill="white"
              opacity="0.9"
            />
            <rect
              x="30"
              y="38"
              width="30"
              height="2"
              rx="1"
              fill="white"
              opacity="0.9"
            />
            <rect
              x="30"
              y="44"
              width="35"
              height="2"
              rx="1"
              fill="white"
              opacity="0.9"
            />
            <rect
              x="30"
              y="50"
              width="25"
              height="2"
              rx="1"
              fill="white"
              opacity="0.9"
            />
            <circle cx="15" cy="30" r="3" fill="#3b82f6" opacity="0.7" />
            <circle cx="85" cy="45" r="2" fill="#8b5cf6" opacity="0.7" />
            <circle cx="20" cy="70" r="2" fill="#3b82f6" opacity="0.5" />
          </svg>
          <h2 className="text-2xl font-bold text-center">
            Sign In
          </h2>
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded font-semibold"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && (
          <p className="text-green-500 text-center">Signed in successfully!</p>
        )}
        <div>
          Do not have an account ?{" "}
          <Link className="font-medium text-blue-400" href="/sign-up">
            Sign-up
          </Link>
        </div>
      </form>
    </div>
  );
}
