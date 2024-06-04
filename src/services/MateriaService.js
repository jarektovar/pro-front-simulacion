import http from "../http-common";

const getAllMaterias = (params) => {
  return http.get("/materias", { params });
};

const getEstudiantesByMateria = (idMateria, params) => {
  return http.get(`/materias/${idMateria}/estudiantes`, { params });
};

export default {
  getAllMaterias,
  getEstudiantesByMateria
};
