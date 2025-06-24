"use client";

import { useState, FormEvent } from "react";
import { CATEGORIES } from "@/lib/categories";

export function PatternForm({
  initialData,
  onSubmit,
}: {
  initialData?: {
    title: string;
    imageUrl: string;
    link: string;
    content: string;
    pdfUrl: string;
    category: string;
    labels: string[];
  };
  onSubmit: (formData: {
    title: string;
    imageUrl: string;
    link: string;
    content: string;
    pdfUrl: string;
    category: string;
    labels: string[];
  }) => void;
}) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl ?? "");
  const [link, setLink] = useState(initialData?.link ?? "");
  const [content, setContent] = useState(initialData?.content ?? "");
  const [pdfUrl, setPdfUrl] = useState(initialData?.pdfUrl ?? "");
  const [category, setCategory] = useState(initialData?.category ?? "");
  const [labels, setLabels] = useState<string[]>(initialData?.labels ?? []);
  const [newLabel, setNewLabel] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      imageUrl,
      link,
      content,
      pdfUrl,
      category,
      labels,
    });
  };

  const addLabel = () => {
    if (newLabel && !labels.includes(newLabel)) {
      setLabels([...labels, newLabel]);
    }
    setNewLabel("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 max-w-xl">
      <label className="block">
        <span className="font-semibold">Title</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 border p-2 w-full rounded"
        />
      </label>

      <label className="block">
        <span className="font-semibold">Image URL</span>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="mt-1 border p-2 w-full rounded"
        />
      </label>

      <label className="block">
        <span className="font-semibold">Original Pattern Link</span>
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="mt-1 border p-2 w-full rounded"
        />
      </label>

      {/* Placeholder for a TipTap editor */}
      <label className="block">
        <span className="font-semibold">Pattern Notes</span>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 border p-2 w-full rounded h-32"
          placeholder="Enter your pattern notes here..."
        />
      </label>

      <label className="block">
        <span className="font-semibold">PDF URL</span>
        <input
          type="text"
          value={pdfUrl}
          onChange={(e) => setPdfUrl(e.target.value)}
          className="mt-1 border p-2 w-full rounded"
        />
      </label>

      <label className="block">
        <span className="font-semibold">Category</span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 border p-2 w-full rounded"
        >
          <option value="">Select a category...</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>

      <div>
        <span className="font-semibold">Labels</span>
        <div className="flex space-x-2 mt-1">
          <input
            type="text"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            className="border p-2 w-full rounded"
            placeholder="Add a label"
          />
          <button
            type="button"
            onClick={addLabel}
            className="bg-blue-500 text-white px-3 py-2 rounded"
          >
            Add
          </button>
        </div>
        <div className="mt-2 space-x-2">
          {labels.map((label) => (
            <span
              key={label}
              className="inline-block bg-gray-200 rounded px-2 py-1 text-sm"
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
      >
        Save Pattern
      </button>
    </form>
  );
}
