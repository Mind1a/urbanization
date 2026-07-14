import Link from "next/link";

export default function Activities() {
  return (
    <section className="mx-auto max-w-7xl py-20">
      <h1 className="mb-8 text-4xl font-bold">Activities</h1>

      <div className="flex flex-col gap-4">
        <Link href="/activities/1">Seminars</Link>
        <Link href="/activities/2">Discussions</Link>
        <Link href="/activities/3">Exhibitions</Link>
        <Link href="/activities/4">Presentations</Link>
      </div>
    </section>
  );
}
