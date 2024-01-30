import React, { useState } from 'react';

const ApiComponent = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      // Simulamos un problema de CORS con una API externa usando fetch
      const response = await fetch('https://cors-anywhere.herokuapp.com/https://es.wikipedia.org/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Verificamos si la respuesta fue exitosa (código 200)
      if (response.ok) {
        const responseData = await response.text(); // Leemos la respuesta como texto
        setData(responseData);
      } else {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error instanceof Error && error.message.includes('text/html')) {
        // El error es HTML, maneja de acuerdo a tus necesidades
        setData('Error: Respuesta HTML');
      } else {
        // Otro tipo de error, maneja de acuerdo a tus necesidades
        setData('Error fetching data');
      }
    }
  };

  return (
    <div>
      <h2>API Component</h2>
      <button onClick={fetchData}>Obtener Datos de la API</button>

      {data && (
        <div>
          {typeof data === 'string' ? (
            // Si la respuesta es una cadena, mostrarla como HTML
            <div dangerouslySetInnerHTML={{ __html: data }} />
          ) : (
            // Si no es una cadena, mostrar como JSON
            <pre>{JSON.stringify(data, null, 2)}</pre>
          )}
        </div>
      )}
    </div>
  );
};

export default ApiComponent;
