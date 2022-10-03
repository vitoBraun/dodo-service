import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import { logoutUserThunk } from "../redux/auth";
import { AppDispatch } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../redux/auth/selectors";

export default function Header() {
  const navigate = useNavigate();
  const { userInfo } = useSelector(selectAuth);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className={styles.header}>
      <div className={styles.navButtons}>
        <button
          style={{
            backgroundImage: `url(/dodologo.png)`,
            width: 60,
            height: 60,
            float: "left",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            border: "none",
          }}
          onClick={() => {
            navigate("/");
          }}
        />
        <div style={{ margin: 8, fontWeight: "bold" }}>Dodo-service</div>
        {userInfo && (
          <Dropdown style={{ margin: 10, float: "right" }}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Меню
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <div
                style={{
                  marginRight: 10,
                  float: "right",
                  fontStyle: "italic",
                  color: "gray",
                }}
              >
                Заявки
              </div>
              <Dropdown.Item
                onClick={() => {
                  navigate("/orders/new");
                }}
              >
                Новые
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  navigate("/orders/work");
                }}
              >
                В работе
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  navigate("/orders/done");
                }}
              >
                Выполнено
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  navigate("/orders/closed");
                }}
              >
                Закрытые
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={() => {
                  navigate("/order/add");
                }}
              >
                Создать заявку ➕
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => {}}>Настройки</Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  dispatch(logoutUserThunk());
                }}
              >
                Выход
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </div>
  );
}
