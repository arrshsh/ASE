import { Button, message } from "antd";
import React, { useEffect, useState } from "react";
import ProductsForm from "./ProductsForm";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../../redux/loadersSlice";
import { DeleteProduct, GetProducts } from "../../../apicalls/product";
import moment from "moment";
import Requests from "./Requests";
import Divider from "../../../components/Divider";

function Products() {
  const [showBidsModal, setShowBidsModal] = useState();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProduct] = useState();
  const [showProductForm, setShowProductForm] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  async function deleteProduct(id) {
    try {
      dispatch(SetLoader(true));
      const response = await DeleteProduct(id);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
      }
    } catch (error) {
      message.error(error.message);
    }
  }

  async function getData() {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts({
        seller: user._id,
      });

      dispatch(SetLoader(false));
      if (response.success) {
        setProduct(response.data);
      }
    } catch (error) {
      message.error(error.message);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-lg">Your Donations</h1>
        <Button
          type="default"
          onClick={() => {
            setShowProductForm(true);
            setSelectedProduct(null);
          }}
        >
          Add Food Item
        </Button>
      </div>

      <div className="flex flex-col mt-2 gap-2">
        {products &&
          products.map((item) => {
            return (
              <div>
                <div className="flex flex-col border justify-between border-solid  rounded-[10px] p-2">
                  <div className="bg-gray-300 h-10 flex-col flex  justify-center items-center rounded-lg">
                    <p>
                      <b>Posted At : </b>
                      {moment(item.createdAt).format("DD-MM-YY hh:mm A")}
                    </p>
                  </div>
                  <div className="flex p-3">
                    <img
                      alt=""
                      className="h-36 w-36 object-cover"
                      src={item.images[0]}
                    ></img>

                    <div className="break-all flex flex-col break-words text-sm  justify-between px-3">
                      <p>
                        <b>Food Item : </b>
                        {item.name}
                      </p>
                      <p>
                        <b>Quantity : </b>
                        {item.age}
                      </p>
                      <p>
                        <b>Shell Life : </b>
                        {item.price} hrs
                      </p>

                      <p>
                        <b>Category : </b>
                        {item.category}
                      </p>
                      <p>
                        <b>Status : </b>
                        {item.status}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-5 items-center ">
                    <i
                      className="ri-delete-bin-line  text-2xl cursor-pointer"
                      onClick={() => deleteProduct(item._id)}
                    ></i>
                    <i
                      class="ri-pencil-line text-2xl cursor-pointer"
                      onClick={() => {
                        setSelectedProduct(item);
                        setShowProductForm(true);
                      }}
                    ></i>
                    <span
                      className="underline cursor-pointer"
                      onClick={() => {
                        setShowBidsModal(true);
                        setSelectedProduct(item);
                      }}
                    >
                      Show Requests
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {showProductForm && (
        <ProductsForm
          showProductForm={showProductForm}
          setShowProductForm={setShowProductForm}
          selectedProduct={selectedProduct}
          getData={getData}
        ></ProductsForm>
      )}

      {showBidsModal && (
        <Requests
          setShowBidsModal={setShowBidsModal}
          showBidsModal={showBidsModal}
          selectedProduct={selectedProduct}
        ></Requests>
      )}
    </div>
  );
}

export default Products;
