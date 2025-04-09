import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { FiTrash2 } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useDeleteDcoumentMutation,
  useUpdateDocumentMutation,
} from "../../features/todo/TodoApiSlice";

const TodoDocument = () => {
  const location = useLocation();
  const taskData = location.state?.itemData;
  const navigate = useNavigate();

  if (!taskData) {
    return <div>No task data provided.</div>;
  }

  const [title, setTitle] = useState(taskData?.title || "");
  const [content, setContent] = useState(taskData?.description || "");
  const titleRef = useRef(title);
  const contentRef = useRef(content);
  const timeoutRef = useRef(null);

  const [updateDocument] = useUpdateDocumentMutation();
  const [deleteDocument] = useDeleteDcoumentMutation();

  useEffect(() => {
    titleRef.current = title;
    contentRef.current = content;
  }, [title, content]);

  useEffect(() => {
    setTitle(taskData?.title || "");
    setContent(taskData?.description || "");
  }, [taskData]);

  const triggerDebouncedUpdate = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      updateDocument({
        id: taskData?._id,
        title: titleRef.current,
        description: contentRef.current,
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    triggerDebouncedUpdate();
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
    triggerDebouncedUpdate();
  };

  const handleDeleteDocument = async (id) => {
    try {
      await deleteDocument({ id }).unwrap();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => navigate("/");

  return (
    <div className="bg-white rounded-lg shadow-md w-full h-screen p-4 flex flex-col">
      {/* Mobile Back + Title + Delete */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2 w-full">
          {/* Back Button - shown only on small screens */}
          <button
            onClick={handleBack}
            className="md:hidden text-gray-600 hover:text-black"
          >
            <IoArrowBack size={22} />
          </button>

          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="text-md text-black font-semibold border-none outline-none w-full"
          />
        </div>

        {/* Delete Button */}
        <button
          className="text-gray-500 hover:text-red-500"
          onClick={() => handleDeleteDocument(taskData?._id)}
        >
          <FiTrash2 size={18} />
        </button>
      </div>

      {/* Editor */}
      <ReactQuill
        value={content}
        onChange={handleContentChange}
        theme="snow"
        className="text-black flex-1 overflow-y-auto"
        placeholder="Write something..."
        modules={{
          toolbar: [
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
            ["clean"],
          ],
        }}
      />
    </div>
  );
};

export default TodoDocument;
