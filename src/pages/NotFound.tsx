import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-bold text-gray-200 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Pagina non trovata
        </h2>
        <p className="text-gray-600 mb-8">
          La pagina che cerchi non esiste o è stata spostata.
        </p>
        <a href="/" className="btn btn-primary group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          Torna a CSD Station
        </a>
      </div>
    </div>
  );
};

export default NotFound;
