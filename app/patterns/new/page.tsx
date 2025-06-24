"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PatternForm } from "@/components/PatternForm";

export default function NewPatternPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (data: {
    title: string;
    imageUrl: string;
    link: string;
    content: string;
    pdfUrl: string;
    category: string;
    labels: string[];
  }) => {
    const res = await fetch("/api/patterns", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/patterns");
    } else {
      const json = await res.json();
      setError(json.message || "Failed to add pattern");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Add New Pattern</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <PatternForm onSubmit={handleSubmit} />
    </div>
  );
}
