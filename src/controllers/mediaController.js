const Media = require("../models/Media");
const Genero = require("../models/Genero");
const Director = require("../models/Director");
const Productora = require("../models/Productora");
const Tipo = require("../models/Tipo");

// GET all media (populated)
const getMedias = async (req, res) => {
  try {
    const medias = await Media.find()
      .populate("genero", "nombre estado")
      .populate("director", "nombres estado")
      .populate("productora", "nombre estado")
      .populate("tipo", "nombre")
      .sort({ fechaCreacion: -1 });
    res.json({ ok: true, data: medias });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

// GET media by ID (populated)
const getMediaById = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id)
      .populate("genero", "nombre estado")
      .populate("director", "nombres estado")
      .populate("productora", "nombre estado")
      .populate("tipo", "nombre");
    if (!media) {
      return res
        .status(404)
        .json({ ok: false, mensaje: "Media no encontrada" });
    }
    res.json({ ok: true, data: media });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

// POST create media (validates that genre, director, and producer are Active)
const createMedia = async (req, res) => {
  try {
    const {
      serial,
      titulo,
      sinopsis,
      url,
      imagenPortada,
      anioEstreno,
      genero,
      director,
      productora,
      tipo,
    } = req.body;

    // Validate genre is Active
    const generoDoc = await Genero.findById(genero);
    if (!generoDoc)
      return res
        .status(404)
        .json({ ok: false, mensaje: "Género no encontrado" });
    if (generoDoc.estado !== "Activo")
      return res
        .status(400)
        .json({ ok: false, mensaje: "El género seleccionado no está Activo" });

    // Validate director is Active
    const directorDoc = await Director.findById(director);
    if (!directorDoc)
      return res
        .status(404)
        .json({ ok: false, mensaje: "Director no encontrado" });
    if (directorDoc.estado !== "Activo")
      return res
        .status(400)
        .json({
          ok: false,
          mensaje: "El director seleccionado no está Activo",
        });

    // Validate producer is Active
    const productoraDoc = await Productora.findById(productora);
    if (!productoraDoc)
      return res
        .status(404)
        .json({ ok: false, mensaje: "Productora no encontrada" });
    if (productoraDoc.estado !== "Activo")
      return res
        .status(400)
        .json({
          ok: false,
          mensaje: "La productora seleccionada no está Activa",
        });

    // Validate tipo exists
    const tipoDoc = await Tipo.findById(tipo);
    if (!tipoDoc)
      return res.status(404).json({ ok: false, mensaje: "Tipo no encontrado" });

    const media = new Media({
      serial,
      titulo,
      sinopsis,
      url,
      imagenPortada,
      anioEstreno,
      genero,
      director,
      productora,
      tipo,
    });
    const mediaGuardada = await media.save();

    const mediaPopulada = await mediaGuardada.populate([
      { path: "genero", select: "nombre estado" },
      { path: "director", select: "nombres estado" },
      { path: "productora", select: "nombre estado" },
      { path: "tipo", select: "nombre" },
    ]);

    res.status(201).json({ ok: true, data: mediaPopulada });
  } catch (error) {
    res.status(400).json({ ok: false, mensaje: error.message });
  }
};

// PUT update media (validates Active status)
const updateMedia = async (req, res) => {
  try {
    const {
      serial,
      titulo,
      sinopsis,
      url,
      imagenPortada,
      anioEstreno,
      genero,
      director,
      productora,
      tipo,
    } = req.body;

    // Validate genre is Active (if provided)
    if (genero) {
      const generoDoc = await Genero.findById(genero);
      if (!generoDoc)
        return res
          .status(404)
          .json({ ok: false, mensaje: "Género no encontrado" });
      if (generoDoc.estado !== "Activo")
        return res
          .status(400)
          .json({
            ok: false,
            mensaje: "El género seleccionado no está Activo",
          });
    }

    // Validate director is Active (if provided)
    if (director) {
      const directorDoc = await Director.findById(director);
      if (!directorDoc)
        return res
          .status(404)
          .json({ ok: false, mensaje: "Director no encontrado" });
      if (directorDoc.estado !== "Activo")
        return res
          .status(400)
          .json({
            ok: false,
            mensaje: "El director seleccionado no está Activo",
          });
    }

    // Validate producer is Active (if provided)
    if (productora) {
      const productoraDoc = await Productora.findById(productora);
      if (!productoraDoc)
        return res
          .status(404)
          .json({ ok: false, mensaje: "Productora no encontrada" });
      if (productoraDoc.estado !== "Activo")
        return res
          .status(400)
          .json({
            ok: false,
            mensaje: "La productora seleccionada no está Activa",
          });
    }

    // Validate tipo exists (if provided)
    if (tipo) {
      const tipoDoc = await Tipo.findById(tipo);
      if (!tipoDoc)
        return res
          .status(404)
          .json({ ok: false, mensaje: "Tipo no encontrado" });
    }

    const media = await Media.findByIdAndUpdate(
      req.params.id,
      {
        serial,
        titulo,
        sinopsis,
        url,
        imagenPortada,
        anioEstreno,
        genero,
        director,
        productora,
        tipo,
      },
      { new: true, runValidators: true },
    )
      .populate("genero", "nombre estado")
      .populate("director", "nombres estado")
      .populate("productora", "nombre estado")
      .populate("tipo", "nombre");

    if (!media) {
      return res
        .status(404)
        .json({ ok: false, mensaje: "Media no encontrada" });
    }

    res.json({ ok: true, data: media });
  } catch (error) {
    res.status(400).json({ ok: false, mensaje: error.message });
  }
};

// DELETE media
const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findByIdAndDelete(req.params.id);
    if (!media) {
      return res
        .status(404)
        .json({ ok: false, mensaje: "Media no encontrada" });
    }
    res.json({
      ok: true,
      mensaje: "Media eliminada correctamente",
      data: media,
    });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: error.message });
  }
};

module.exports = {
  getMedias,
  getMediaById,
  createMedia,
  updateMedia,
  deleteMedia,
};
