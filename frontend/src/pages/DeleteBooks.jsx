import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteBooks = () => {
  // State for loading indicator
  const [loading, setLoading] = useState(false);

  // Hook for navigation
  const navigate = useNavigate();

  // Extracting id from URL params
  const { id } = useParams();

  const { enqueueSnackbar } = useSnackbar();

  // Function to handle book deletion
  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book deleted successfully", { variant: "sucess" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("error, try again", { variant: "error" });
        console.log(error);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3x1 my-4"> Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-x1 w[600] p-8 mx-auto">
        <h3 className="text-2x1">
          {" "}
          Are you sure you want to delete this book?
        </h3>

        <button
          className="p-4 bg-red-500 text-white m-8 w-full"
          onClick={handleDeleteBook}>
          Yes, delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBooks;
