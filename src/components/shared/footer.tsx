import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="mt-12 flex items-center justify-between bg-gradient-to-r from-slate-200 to-indigo-100 p-12">
      <div>
        <div>nextlms.</div>
        <Link href="/about">
          <div>About Us</div>
        </Link>
        <div>Careers</div>
        <div>Blog</div>
        <div>Faq</div>
      </div>
      <div>All right reserved 2024</div>
    </footer>
  );
};
