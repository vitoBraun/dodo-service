import React from "react";
import OrderItem from "./OrderItem";
import styles from "./Order.module.css";
import { useSelector } from "react-redux";
import { selectOrders } from "../redux/orders/selectors";
import { orderStatusesMenu } from "../constants";

export default function ItemList({ status = "new" }) {
  const { byId, isLoading } = useSelector(selectOrders);

  return (
    <div className={styles.list}>
      <h1>{orderStatusesMenu[status]}</h1>
      {!isLoading &&
        byId !== undefined &&
        Object.keys(byId).map(
          (key, index) =>
            byId[key]?.status === status && (
              <OrderItem key={byId[key]?._id} item={byId[key]} />
            )
        )}
    </div>
  );
}
