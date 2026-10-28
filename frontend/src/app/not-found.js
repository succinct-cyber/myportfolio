import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x py-32 text-center">
      <p className="label mb-3">404</p>
      <h1 className="text-5xl">Nothing here.</h1>
      <Link href="/" className="btn-dark mt-8">Back home</Link>
    </section>
  );
}
