import { db } from "../db.js";

export const getLivros = (_, res) => {
  const sql = "SELECT * FROM livros";

  db.query(sql, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addLivro = (req, res) => {
  const sql =
    "INSERT INTO livros(`livro`, `data`, `autor`) VALUES(?)";

  const values = [
    req.body.livro,
    req.body.data,
    req.body.autor,
  ];

  db.query(sql, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Livro adicionado");
  });
};

export const updateLivro = (req, res) => {
  const sql =
    "UPDATE livros SET `livro` = ?, `data` = ?, `autor` = ? WHERE `id` = ?";

  const values = [
    req.body.livro,
    req.body.data,
    req.body.autor,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Livro atualizado com sucesso.");
  });
};

export const deleteLivro = (req, res) => {
  const q = "DELETE FROM livros WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json(" deletado com sucesso.");
  });
};
