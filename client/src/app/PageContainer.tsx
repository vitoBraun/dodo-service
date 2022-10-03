import React, { useEffect } from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import OrderPage from "./OrderPage";
import styles from "./PageContainer.module.css";
import ItemList from "../components/ItemList";
import AddOrderPage from "./AddOrderPage";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../redux/auth/selectors";
import LoginPage from "./LoginPage";
import { checkAuthenticationThunk } from "../redux/auth";
import { getOrdersThunk } from "../redux/orders";
import { AppDispatch } from "../store";

export default function PageContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo, isLoading } = useSelector(selectAuth);
  useEffect(() => {
    dispatch(checkAuthenticationThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOrdersThunk());
  }, [dispatch]);

  return (
    <div className={styles.main}>
      <Routes>
        <Route
          path="/"
          element={
            userInfo ? <ItemList /> : isLoading ? <>загрузка</> : <LoginPage />
          }
        />
        {userInfo ? (
          <>
            <Route path="/user/auth" element={<Navigate to="/" />} />
            <Route path="/orders/new" element={<ItemList />} />
            <Route path="/orders/work" element={<ItemList status="work" />} />
            <Route path="/orders/done" element={<ItemList status="done" />} />
            <Route
              path="/orders/closed"
              element={<ItemList status="closed" />}
            />
            <Route path="/order/add" element={<AddOrderPage />} />
            <Route path="/order/:id" element={<OrderPage />} />
          </>
        ) : (
          <></>
        )}
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
