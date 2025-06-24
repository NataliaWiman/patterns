import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPatterns } from "@/lib/db";
import Link from "next/link";
import FilteredPatterns from "@/components/FilteredPatterns";

export default async function PatternsPage() {
  const cookieStore = cookies();
  if ((await cookieStore).get("auth")?.value !== "true") {
    redirect("/login");
  }

  const patterns = getPatterns();

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">My Crochet Patterns</h1>
      <Link href="/patterns/new">
        <button className="mb-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
          Add New Pattern
        </button>
      </Link>
      <FilteredPatterns patterns={patterns} />
    </div>
  );
}
