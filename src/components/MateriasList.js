import React, { useState, useEffect } from 'react';
import MateriaService from '../services/MateriaService';
import { Link } from 'react-router-dom';
import { Pagination } from '@mui/material';

const MateriasList = () => {
  const [materias, setMaterias] = useState([]);
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

  const retrieveMaterias = () => {
    const params = getRequestParams(page, pageSize);

    MateriaService.getAllMaterias(params)
      .then((response) => {
        const { materias, totalPages } = response.data;

        setMaterias(materias);
        setCount(totalPages);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(retrieveMaterias, [page, pageSize]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  return (
    <div>
      <h4>Materias List</h4>
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
      <ul className="list-group">
        {materias && materias.map((materia, index) => (
          <li className="list-group-item" key={index}>
            <div><strong>Nombre:</strong> {materia.nombre}</div>
            <div><strong>Grupo:</strong> {materia.grupo}</div>
            <div><strong>Inscritos:</strong> {materia.inscritos}</div>
            {materia.idMateria ? (
              <Link to={`/materias/${materia.idMateria}/estudiantes`} className="btn btn-info ml-2">+</Link>
            ) : (
              <span className="text-danger">ID de materia no disponible</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MateriasList;
