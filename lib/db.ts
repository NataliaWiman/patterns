export type Pattern = {
  id: number;
  title: string;
  imageUrl: string;
  link: string;
  content: string;
  pdfUrl: string;
  category: string;
  labels: string[];
};

const patterns: Pattern[] = [];
let nextId = 1;

export function getPatterns(): Pattern[] {
  return patterns;
}

export function addPattern(pattern: Omit<Pattern, "id">): Pattern {
  const newPattern: Pattern = { id: nextId++, ...pattern };
  patterns.push(newPattern);
  return newPattern;
}
