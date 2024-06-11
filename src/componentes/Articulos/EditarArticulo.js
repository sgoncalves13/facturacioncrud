import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditarArticulo() {
  const articulo_editar = JSON.parse(localStorage.getItem("articulo_editar"));
  let navigate = useNavigate();

  const token = localStorage.getItem('idToken'); // Obtiene el token de localStorage

  const [descripcion, setDescripcion] = useState(articulo_editar.descripcion);
  const [descripcion_compra, setDescripcion_compra] = useState(articulo_editar.descripcion_compra);
  const [descripcion_venta, setDescripcion_venta] = useState(articulo_editar.descripcion_venta);

  const handleEdit = async (event) => {
    event.preventDefault();
    articulo_editar.descripcion = descripcion;
    articulo_editar.descripcion_compra = descripcion_compra;
    articulo_editar.descripcion_venta = descripcion_venta;

    const response = await fetch(`https://localhost:7207/api/Articulo/UpdateArticulo`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Agrega el token al encabezado de autorización
      },
      body: JSON.stringify(articulo_editar),
    });

    if (response.ok) {
      console.log('Artículo actualizado');
      alert('Articulo con id: ' + String(articulo_editar.id) +' actualizado existosmente');
      navigate('/Articulos');

    } else {
      const errorText = await response.text();
      console.error('Error:', errorText);
      alert('Error al actualizar el articulo con id: ' + String(articulo_editar.id) + '. Detalles: ' + errorText);
    }
  };

  return (
    <div>
      <h2>Editar Artículo</h2>
      <form onSubmit={handleEdit}>
        <label>
          Descripción:
          <input
            type="text"
            name="descripcion"
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
          />
        </label>
        <br />
        <label>
          Descripción de compra:
          <input
            type="text"
            name="descripcion_compra"
            value={descripcion_compra}
            onChange={e => setDescripcion_compra(e.target.value)}
          />
        </label>
        <br />
        <label>
          Descripción de venta:
          <input
            type="text"
            name="descripcion_venta"
            value={descripcion_venta}
            onChange={e => setDescripcion_venta(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default EditarArticulo;