import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { UploadIcon } from "lucide-react";
const AddMenu = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: null,
  });
  const { axios, navigate, loading, setLoading, categories } =
    useContext(AppContext);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
    setFormData({ ...formData, image: selectedFile });
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/menu/add",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/admin/menu");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="py-12">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl w-full flex flex-col gap-5"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Menu Name*
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
            placeholder="Enter menu name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Menu Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
            placeholder="Enter menu price"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Menu Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
            placeholder="Enter menu description"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Category
          </label>
          <select
            name="category"
            id=""
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          >
            <option value="">Select a category</option>
            {categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Menu Image
          </label>
          <input
            type="file"
            id="fileUpload"
            className="hidden"
            onChange={handleFileChange}
            required
          />
          <label
            htmlFor="fileUpload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 transition"
          >
            <UploadIcon className="w-8 h-8 text-gray-500 mb-2" />
            <span className="text-gray-600 text-sm">
              {file ? file.name : "Click to upload an image"}
            </span>
          </label>
        </div>
        {preview && <img src={preview} alt="preview" className="w/2" />}
        <button className="bg-orange-500 text-whitepx-8 py-3 cursor-pointer">
          {loading ? "adding.." : "add menu"}
        </button>
      </form>
    </div>
  );
};

export default AddMenu;
