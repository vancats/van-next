import { Footer } from "components/Footer";
import "./global.css";
import Sidebar from "components/Sidebar";
import { locales } from "config";

export async function generateStaticParams() {
  return locales.map((lng) => ({ lng }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  return (
    <html lang={lng}>
      <body>
        <div className="container">
          <div className="main">
            <Sidebar lng={lng} />
            <section className="col note-viewer">{children}</section>
          </div>
        </div>
        <Footer lng={lng} />
      </body>
    </html>
  );
}
