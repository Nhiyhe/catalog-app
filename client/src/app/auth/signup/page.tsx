"use client";

import axios from "axios";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) return;
    try {
      const response = await axios.post("/api/users/signup", {
        email,
        password,
      });
      console.log(response.data);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Register for an account.</h4>
      <div>
        <label htmlFor="password">Email</label>
        <input
          type="text"
          placeholder="Email"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <input type="submit" value="Register" />
    </form>
  );
};

export default SignUpPage;
