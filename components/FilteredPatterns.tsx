/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { CATEGORIES } from "@/lib/categories";
import { getPatterns } from "@/lib/db";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function FilteredPatterns({
  patterns,
}: {
  patterns: ReturnType<typeof getPatterns>;
}) {
  "use client";
  const [filtered, setFiltered] = useState(patterns);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  // Gather all unique labels from patterns
  const allLabels = Array.from(
    new Set(patterns.flatMap((p: any) => p.labels || []))
  );

  // Filter patterns when category or labels change
  useEffect(() => {
    let result = patterns;

    if (selectedCategory) {
      result = result.filter((p: any) => p.category === selectedCategory);
    }

    if (selectedLabels.length > 0) {
      // Keep patterns that include all selected labels
      result = result.filter((p: any) =>
        selectedLabels.every((label) => p.labels.includes(label))
      );
    }

    setFiltered(result);
  }, [selectedCategory, selectedLabels, patterns]);

  const toggleLabel = (label: string) => {
    setSelectedLabels((curr) =>
      curr.includes(label) ? curr.filter((l) => l !== label) : [...curr, label]
    );
  };

  return (
    <div>
      {/* Category Filter */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Label Filter */}
      <div className="mb-4">
        <span className="mr-2 font-semibold">Labels:</span>
        {allLabels.map((label) => (
          <label key={label} className="mr-4">
            <input
              type="checkbox"
              checked={selectedLabels.includes(label)}
              onChange={() => toggleLabel(label)}
              className="mr-1"
            />
            {label}
          </label>
        ))}
      </div>

      {/* Render the filtered patterns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((pattern: any) => (
          <div key={pattern.title}>
            {pattern.imageUrl && (
              <Image
                src={pattern.imageUrl}
                alt={pattern.title}
                width={500}
                height={300}
                className="w-full h-auto mb-2"
              />
            )}
            <h2 className="font-bold text-xl">{pattern.title}</h2>
            <p className="text-sm">Category: {pattern.category}</p>
            <p className="text-sm">
              Labels: {pattern.labels && pattern.labels.join(", ")}
            </p>
            {pattern.link && (
              <a
                href={pattern.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Original Pattern
              </a>
            )}
            {pattern.pdfUrl && (
              <p className="mt-1">
                <a
                  href={pattern.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  PDF
                </a>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
