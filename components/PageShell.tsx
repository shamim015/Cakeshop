import Header from "./Header";
import Footer from "./Footer";

export default function PageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-[60vh] bg-white pb-16 pt-10">
        <div className="container-wide">
          <h1 className="section-title text-center">
            {title}
            <span className="title-line" />
          </h1>
          {subtitle && (
            <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-gray-600">{subtitle}</p>
          )}
          <div className="mt-8">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
