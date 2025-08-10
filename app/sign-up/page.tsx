/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
// @ts-nocheck
import React, { useState } from "react";
import gqlClient from "@/service/gql";
import { gql } from "graphql-tag";
import { useRouter } from "next/navigation";
export default function SignInPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const SIGNUP_USER = gql`
    mutation SignUpUser($email: String!, $name: String!, $password: String!) {
      signUpUser(email: $email, name: $name, password: $password)
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
      const data = await gqlClient.request(SIGNUP_USER, {
        email: form.email,
        password: form.password,
        name:form.name
      });
      //@ts-ignore
      if (data?.signUpUser) {
        setSuccess(true);
        router.push("/");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-black">
          Sign Up
        </h2>
        <input
          type="name"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border px-3 py-2 rounded text-black"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border px-3 py-2 rounded text-black"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border px-3 py-2 rounded text-black"
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
      </form>
    </div>
  );
}
