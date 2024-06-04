import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MateriaService from '../services/MateriaService';
import { Pagination } from '@mui/material';

const EstudiantesList = () => {
  const { idMateria } = useParams();
  const [estudiantes, setEstudiantes] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  const pageSizes = [3, 6, 9];

  const getRequestParams = (page, pageSize) => {
    let params = {};

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const retrieveEstudiantes = () => {
    const params = getRequestParams(page, pageSize);

    MateriaService.getEstudiantesByMateria(idMateria, params)
      .then((response) => {
        const { estudiantes, totalPages } = response.data;

        setEstudiantes(estudiantes);
        setCount(totalPages);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveEstudiantes();
  }, [idMateria, page, pageSize]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  return (
    <div>
      <h4>Estudiantes Inscritos</h4>
      <div className="mt-3">
        {"Items per Page: "}
        <select onChange={handlePageSizeChange} value={pageSize}>
          {pageSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <Pagination
          className="my-3"
          count={count}
          page={page}
          siblingCount={1}
          boundaryCount={1}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
        />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Documento</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes && estudiantes.map((estudiante, index) => (
            <tr key={index}>
              <td>{estudiante.nombre}</td>
              <td>{estudiante.apellido}</td>
              <td>{estudiante.numDocumento}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EstudiantesList;
