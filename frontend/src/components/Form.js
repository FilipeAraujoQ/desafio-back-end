import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getLivros, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const livros = ref.current;

      livros.livro.value = onEdit.livro;
      livros.autor.value = onEdit.autor;
      livros.data.value = onEdit.data;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const livros = ref.current;

    if (
      !livros.livro.value ||
      !livros.autor.value ||
      !livros.data.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          livro: livros.livro.value,
          autor: livros.autor.value,
          data: livros.data.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          livro: livros.livro.value,
          autor: livros.autor.value,
          data: livros.data.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    livros.livro.value = "";
    livros.autor.value = "";
    livros.data.value = "";

    setOnEdit(null);
    getLivros();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>livro</Label>
        <Input name="livro" />
      </InputArea>
      <InputArea>
        <Label>E-mail</Label>
        <Input name="autor" />
      </InputArea>
      <InputArea>
        <Label>Data de Nascimento</Label>
        <Input name="data" type="date" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
