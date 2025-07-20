export default function Footer() {
    const currentYear = new Date().getFullYear();
  
    return (
      <footer className="bg-[--color-background] text-[--color-text-dark] mt-12">
        <div className="container mx-auto px-6 py-4 text-center">
          <p>&copy; {currentYear} E-Commerce Moderno. Todos os direitos reservados.</p>
          <p className="text-sm text-[--color-text-dark] mt-1">
            Um projeto construído com Next.js, Tailwind CSS e MongoDB.
          </p>
        </div>
      </footer>
    );
  }