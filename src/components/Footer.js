export default function Footer() {
    const currentYear = new Date().getFullYear();
  
    return (
      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto px-6 py-4 text-center">
          <p>&copy; {currentYear} E-Commerce Moderno. Todos os direitos reservados.</p>
          <p className="text-sm text-gray-400 mt-1">
            Um projeto construído com Next.js, Tailwind CSS e MongoDB.
          </p>
        </div>
      </footer>
    );
  }