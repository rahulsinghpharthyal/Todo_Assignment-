import React from "react";
import { FaClipboardList } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  useCreateDocumentMutation,
  useGetDocumentsQuery,
} from "../../features/todo/TodoApiSlice";

const SideBar = () => {
  const [createDocument] = useCreateDocumentMutation();
  const { data, isLoading } = useGetDocumentsQuery();
  const navigate = useNavigate();

  const handleCreateDocument = async () => {
    try {
      const response = await createDocument();
      navigate(`/todo/${response?.data?.Data?._id}`, {
        state: { itemData: response?.data?.Data },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#f7f7f7] h-full md:h-screen rounded-xl flex flex-col">
      {/* Top Section */}
      <div className="p-4 md:pt-6">
        <button
          onClick={handleCreateDocument}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg mb-4 w-fit"
        >
          <FaClipboardList />
          <span className="font-semibold">TODO</span>
        </button>

        {/* Search Input */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 pl-10 rounded-lg border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FiSearch className="absolute top-3 left-3 text-gray-500" />
        </div>
      </div>

      {/* Documents List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3 hide-scrollbar">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          data?.tasks?.map((item, index) => (
            <div
              key={index}
              onClick={() =>
                navigate(`/todo/${item._id}`, {
                  state: { itemData: item },
                })
              }
              className="p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <h4 className="font-semibold text-gray-900">{item.title}</h4>
              <p className="text-sm text-gray-600 pb-2">
                {item.description.substring(0, 40)}
              <span className="text-sm text-gray-400 float-end">
                {new Date(item.updatedAt).toLocaleDateString()}
              </span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SideBar;
