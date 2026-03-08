const Genero = require("../models/Genero");

// GET all genres
const getGeneros = async (req, res) => {
  try {
    const generos = await Genero.find().sort({ fechaCreacion: -1 });
    res.json({ ok: true, data: generos });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

// GET only active genres
const getGenerosActivos = async (req, res) => {
  try {
    const generos = await Genero.find({ estado: "Activo" }).sort({ nombre: 1 });
    res.json({ ok: true, data: generos });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

// GET genre by ID
const getGeneroById = async (req, res) => {
  try {
    const genero = await Genero.findById(req.params.id);
    if (!genero) {
      return res
        .status(404)
        .json({ ok: false, mensaje: "Género no encontrado" });
    }
    res.json({ ok: true, data: genero });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

// POST create genre
const createGenero = async (req, res) => {
  try {
    const { nombre, estado, descripcion } = req.body;
    const genero = new Genero({ nombre, estado, descripcion });
    const generoGuardado = await genero.save();
    res.status(201).json({ ok: true, data: generoGuardado });
  } catch (error) {
    res.status(400).json({ ok: false, mensaje: error.message });
  }
};

// PUT update genre
const updateGenero = async (req, res) => {
  try {
    const { nombre, estado, descripcion } = req.body;
    const genero = await Genero.findByIdAndUpdate(
      req.params.id,
      { nombre, estado, descripcion },
      { new: true, runValidators: true },
    );
    if (!genero) {
      return res
        .status(404)
        .json({ ok: false, mensaje: "Género no encontrado" });
    }
    res.json({ ok: true, data: genero });
  } catch (error) {
    res.status(400).json({ ok: false, mensaje: error.message });
  }
};

// DELETE genre
const deleteGenero = async (req, res) => {
  try {
    const genero = await Genero.findByIdAndDelete(req.params.id);
    if (!genero) {
      return res
        .status(404)
        .json({ ok: false, mensaje: "Género no encontrado" });
    }
    res.json({
      ok: true,
      mensaje: "Género eliminado correctamente",
      data: genero,
    });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

module.exports = {
  getGeneros,
  getGenerosActivos,
  getGeneroById,
  createGenero,
  updateGenero,
  deleteGenero,
};
