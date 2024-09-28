import { Footer } from "@components/shared/footer";
import { Header } from "@components/shared/header";
import React from "react";

export default function Page() {
  return (
    <main>
      <Header />

      <section className="m-auto max-w-2xl space-y-4">
        <h1 className="text-4xl lg:text-7xl">About Us</h1>
        <h2 className="m-auto text-balance text-slate-400">
          Welcome to our website. We are dedicated to providing the best service possible.
        </h2>
      </section>
      <section></section>
      <Footer />
    </main>
  );
}
