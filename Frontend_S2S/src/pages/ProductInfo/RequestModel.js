import { Form, Input, Modal, message } from "antd";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { PlaceNewRequest } from "../../apicalls/product";
import { AddNotification } from "../../apicalls/Notifications";

function RequestModel({ showBidModal, setShowBidModel, getData, product }) {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const rules = [
    {
      required: true,
      message: "Required",
    },
  ];

  async function onFinish(values) {
    try {
      dispatch(SetLoader(true));
      const response = await PlaceNewRequest({
        ...values,
        product: product._id,
        seller: product.seller._id,
        buyer: user._id,
      });
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);

        // send notification to seller
        await AddNotification({
          title: "A request received",
          // changed title: "A new bid has been placed", to title: "A request received",
          message: `A new request has been received on your food item ${product.name} by ${user.name}, willing to pickup at ${values.bidAmount} `,
          // values.bidAmount to expected pickup time 
          user: product.seller._id,
          onClick: "/profile",
          read: false,
        });

        getData();
        setShowBidModel(false);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoader(false));
    }
  }

  return (
    <Modal
      onCancel={() => setShowBidModel(false)}
      open={showBidModal}
      centered
      width={600}
      onOk={() => formRef.current.submit()}
    >
      <div className="flex flex-col gap-5 mb-5">
        <h1 className="text-2xl font-semibold text-orange-900 text-center">
          New Request
        </h1>
        <Form layout="vertical" ref={formRef} onFinish={onFinish}>
          <Form.Item label="Estimated Pick-up time" name="time" rules={rules}>
            {/* changed bid amunt thingy to estimated pickup time  */}
            <Input></Input>
          </Form.Item>

          <Form.Item label="Message" name="message" rules={rules}>
            <Input.TextArea></Input.TextArea>
          </Form.Item>

          <Form.Item label="Mobile" name="mobile" rules={rules}>
            <Input type="number"></Input>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default RequestModel;
