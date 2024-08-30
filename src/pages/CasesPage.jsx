import { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { useCases } from '../context/CaseContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';

function CasesPage() {
  const { getCases, cases, deleteCase } = useCases();
  const [loading, setLoading] = useState(true);

  // generar el excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(cases); // Usa caseData aquí
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Cases');

    // Convertir el libro a un archivo .xlsx
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });

    saveAs(blob, `cases_${Date.now()}.xlsx`);
  };

  useEffect(() => {
    const fetchCases = async () => {
      try {
        await getCases();
      } catch (error) {
        console.error('Error fetching cases:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!cases || cases.length === 0) {
    return <div>No cases available</div>;
  }

  return (
    <div className='px-4'>
      <button
        onClick={exportToExcel}
        className="mb-4 px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
      >
        Exportar a excel
      </button>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-4 border-b">ID</th>
            <th className="px-4 py-4 border-b">Descripcion</th>
            <th className="px-4 py-4 border-b">Nombre del Fiscal</th>
            <th className="px-4 py-4 border-b">Telefono del Fiscal</th>
            <th className="px-4 py-4 border-b">Estado</th>
            <th className="px-4 py-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-2 border-b">{item.id}</td>
              <td className="px-4 py-2 border-b">{item.description}</td>
              <td className="px-4 py-2 border-b">{item.name}</td>
              <td className="px-4 py-2 border-b">{item.phone}</td>
              <td className="px-4 py-2 border-b">{item.state}</td>
              <td className="px-4 py-2 border-b flex flex-nowrap">
                <Link to={`/case/${item.id}`}
                  className="mx-2 px-2 py-1 text-white bg-blue-500 hover:bg-blue-600 rounded"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>

                </Link>
                <button
                  onClick={() => deleteCase(item.id)}
                  className="px-2 py-1 text-white bg-red-500 hover:bg-red-600 rounded"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>

                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CasesPage;