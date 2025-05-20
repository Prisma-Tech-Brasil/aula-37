const servicoDeUsuario = require("../services/servicoDeUsuario");
const { HttpError } = require("../errors/HttpError");

class ControladorDeUsuario {
  pegarTodos(_req, res) {
    try {
      const usuarios = servicoDeUsuario.buscarTodos();

      res.status(200).json(usuarios);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.status).json({ erro: error.message });
      }

      res
        .status(500)
        .json({ erro: error.message });
    }
  }

  pegarUmPeloID(req, res) {
    try {
      const id = req.params.id;
      const usuario = servicoDeUsuario.pegarPeloID(id);

      res.status(200).json(usuario);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.status).json({ erro: error.message });
      }

      res
        .status(500)
        .json({ erro: error.message });
    }
  }

  cadastrar(req, res) {
    try {
      const { nome, email, cpf, senha } = req.body;
      const resposta = servicoDeUsuario.cadastrar(nome, email, cpf, senha);

      res.status(201).json(resposta);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.status).json({ erro: error.message });
      }

      res
        .status(500)
        .json({ erro: error.message });
    }
  }

  conectar(req, res) {
    try {
      const { email, senha } = req.body;
      const resposta = servicoDeUsuario.conectar(email, senha);

      res.status(200).json(resposta);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.status).json({ erro: error.message });
      }

      res
        .status(500)
        .json({ erro: error.message });
    }
  }

  atualizar(req, res) {
    try {
      const dados = req.body;
      const usuarioId = req.params.id;
      const resposta = servicoDeUsuario.atualizar(usuarioId, dados);

      res.status(200).json(resposta);
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.status).json({ erro: error.message });
      }

      res
        .status(500)
        .json({ erro: error.message });
    }
  }

  deletar(req, res) {
    try {
      const id = req.params.id;
      servicoDeUsuario.deletar(id);

      res
        .status(200)
        .json({ mensagem: `Usuário com ID ${id} deletado com sucesso.` });
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.status).json({ erro: error.message });
      }

      res
        .status(500)
        .json({ erro: error.message });
    }
  }
}

module.exports = new ControladorDeUsuario();
