import Link from "next/link";
import { Container } from "@/components/Sections";

export const metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <section className="flex min-h-[450px] items-center bg-white pb-[50px] pt-[100px]">
      <Container className="text-center">
        <h1 className="text-[70px] font-black text-p1">404</h1>
        <p className="mt-2 text-lg">Oops! That page can’t be found.</p>
        <Link href="/" className="btn mt-8">
          Back to Home
        </Link>
      </Container>
    </section>
  );
}
