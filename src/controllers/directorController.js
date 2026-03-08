const Director = require("../models/Director");

// GET all directors
const getDirectores = async (req, res) => {
  try {
    const directores = await Director.find().sort({ fechaCreacion: -1 });
    res.json({ ok: true, data: directores });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

// GET only active directors
const getDirectoresActivos = async (req, res) => {
  try {
    const directores = await Director.find({ estado: "Activo" }).sort({
      nombres: 1,
    });
    res.json({ ok: true, data: directores });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

// GET director by ID
const getDirectorById = async (req, res) => {
  try {
    const director = await Director.findById(req.params.id);
    if (!director) {
      return res
        .status(404)
        .json({ ok: false, mensaje: "Director no encontrado" });
    }
    res.json({ ok: true, data: director });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

// POST create director
const createDirector = async (req, res) => {
  try {
    const { nombres, estado } = req.body;
    const director = new Director({ nombres, estado });
    const directorGuardado = await director.save();
    res.status(201).json({ ok: true, data: directorGuardado });
  } catch (error) {
    res.status(400).json({ ok: false, mensaje: error.message });
  }
};

// PUT update director
const updateDirector = async (req, res) => {
  try {
    const { nombres, estado } = req.body;
    const director = await Director.findByIdAndUpdate(
      req.params.id,
      { nombres, estado },
      { new: true, runValidators: true },
    );
    if (!director) {
      return res
        .status(404)
        .json({ ok: false, mensaje: "Director no encontrado" });
    }
    res.json({ ok: true, data: director });
  } catch (error) {
    res.status(400).json({ ok: false, mensaje: error.message });
  }
};

// DELETE director
const deleteDirector = async (req, res) => {
  try {
    const director = await Director.findByIdAndDelete(req.params.id);
    if (!director) {
      return res
        .status(404)
        .json({ ok: false, mensaje: "Director no encontrado" });
    }
    res.json({
      ok: true,
      mensaje: "Director eliminado correctamente",
      data: director,
    });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

module.exports = {
  getDirectores,
  getDirectoresActivos,
  getDirectorById,
  createDirector,
  updateDirector,
  deleteDirector,
};
