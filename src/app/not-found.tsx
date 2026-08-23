import Link from "next/link";

const NotFound = () => (
  <main className="shell py-24">
    <p className="text-meta">404</p>
    <h1 className="text-page-title mt-4">Not found</h1>
    <p className="text-body mt-4">
      <Link href="/" className="link-muted">
        Back home
      </Link>
    </p>
  </main>
);

export default NotFound;
