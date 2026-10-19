import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-navy-950 px-5 pt-[76px]">
      <div className="text-center">
        <p className="label-gold">Error 404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          This page could not be found
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-white/60">
          The page you're looking for may have moved or no longer exists.
        </p>
        <Link to="/" className="btn-primary mt-8">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>
    </section>
  );
}
