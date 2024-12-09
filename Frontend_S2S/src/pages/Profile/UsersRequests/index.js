import React, { useEffect, useState } from "react";
import { Modal, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../../redux/loadersSlice";
import { GetAllRequests } from "../../../apicalls/product";
import Divider from "../../../components/Divider";
import moment from "moment";

function Requests() {
  const { user } = useSelector((state) => state.users);
  const [requestsData, setRequestsData] = useState();
  const dispatch = useDispatch();

  async function getData() {
    try {
      dispatch(SetLoader(true));
      const response = await GetAllRequests({
        buyer: user._id,
      });
      dispatch(SetLoader(false));
      if (response.success) {
        setRequestsData(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-primary">Requests</h1>

      {requestsData < 1 && (
        <>
          <h1 className="text-xl text-gray-500">There are no requests</h1>
        </>
      )}
      {requestsData &&
        requestsData.map((request) => {
          return (
            <div className="border border-solid border-gray-500 p-2 rounded-lg">
              <h1>Food Item : {request.product.name}</h1>
              <h1>Donor : {request.seller.name}</h1>
              <h1>Offered Time to Pickup : {request.time} minutes</h1>
              <h1>
                Request Date : {moment(request.createdAt).format("DD-MM-YY hh:mm A")}
              </h1>
              <h1>Message : {request.message}</h1>
            </div>
          );
        })}
    </div>
  );
}

export default Requests;
