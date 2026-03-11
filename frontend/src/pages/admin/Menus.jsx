import React from "react";
import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { CircleX } from "lucide-react";
import toast from "react-hot-toast";

const Menus = () => {
  const { menus, fetchMenus, axios } = useContext(AppContext);

  useEffect(() => {
    fetchMenus();
  }, []);

  const deleteMenu = async (id) => {
    try {
      const { data } = await axios.delete(`http://localhost:5000/api/menu/delete/${id}`);
      if (data.success) {
        toast.success(data.message);
        fetchMenus();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="py-4">
      <h1 className="text-3xl font-bold mb-3">All Menus</h1>

      <div className="border border-gray-400 max-w-5xl mx-auto p-3">
        <div className="grid grid-cols-5 font-semibold text-gray-700">
          <div>Image</div>
          <div>Name</div>
          <div>Category</div>
          <div>Price</div>
          <div>Action</div>
        </div>

        <hr className="w-full my-4 text-gray-200" />

        <ul>
          {menus.map((item) => (
            <div key={item._id}>
              <div className="grid grid-cols-5 items-center mb-4">
                <div className="flex items-center gap-2 max-w-md">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover"
                  />
                </div>

                <p>{item?.name}</p>
                <p>{item?.category?.name}</p>
                <p>₹{item.price}</p>

                <button
                  onClick={() => deleteMenu(item._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <CircleX />
                </button>
              </div>

              <hr className="w-full text-gray-300" />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menus;
