import React, { Suspense, useState } from "react";
import Fox from "../models/Fox";
import { Canvas } from "@react-three/fiber";
import Loader from "../components/Loader";

const Contact = () => {
  const [form, setform] = useState({ name: "", email: "", message: "" });
  const [currentAnimation, setcurrentAnimation] = useState("idle");
  const [isLoading, setisLoading] = useState(false);
  const handleChange = (e) => {
    setform((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleFocus = () => setcurrentAnimation("walk");
  const handleBlur = () => setcurrentAnimation("idle");
  const handleSubmit = (e) => {
    e.preventDefault();
    setcurrentAnimation("hit");
    setisLoading(true);
    setTimeout(() => {
      setisLoading(false);
      setform({ name: "", email: "", message: "" });
      setcurrentAnimation("idle");
    }, 3000);
  };
  return (
    <section className="relative flex lg:flex-row flex-col max-container">
      <div className="flex-1 min-[50%] flex flex-col">
        <h1 className="head-text">Get in touch</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-7 mt-14"
        >
          <label className="text-black-500 font-semibold">
            Name
            <input
              type="text"
              name="name"
              className="input"
              placeholder="John"
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>

          <label className="text-black-500 font-semibold">
            Email
            <input
              type="email"
              name="email"
              className="input"
              placeholder="john@gmail.com"
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>

          <label className="text-black-500 font-semibold">
            Message
            <textarea
              rows={4}
              type="text"
              name="message"
              className="textarea"
              placeholder="Let me know how can I help you!"
              required
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <button
            type="submit"
            className="btn"
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      <div className="lg:flex-1 w-full lg:h-auto md:h-[550px] h-[350px]">
        <Canvas camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}>
          <Suspense fallback={<Loader />}>
            <directionalLight position={[0, 0, 1]} intensity={2.5} />
            <ambientLight intensity={0.5} />
            <Fox
              position={[0, 0, 0]}
              rotation={[0, -0.5, 0]}
              scale={[0.5, 0.5, 0.5]}
              currentAnimation={currentAnimation}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Contact;
