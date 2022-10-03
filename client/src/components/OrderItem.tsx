import React from "react";
import styles from "./Order.module.css";
import { useNavigate } from "react-router-dom";
import { executors, managers } from "../constants";

export default function OrderItem({ item }: { item: any }) {
  let style;
  switch (item.faultIndex) {
    case 1:
      style = styles.count;
      break;
    case 2:
      style = styles.countYellow;
      break;
    case 3:
      style = styles.countOrange;
      break;
    case 4:
      style = styles.countRed;
      break;
    default:
      break;
  }

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/order/${item._id}`);
  };
  return (
    <button className={styles.item} onClick={handleClick}>
      <div className={styles.imgWrapper}>
        <img
          alt={item.description}
          src={`https://imagesvito.storage.yandexcloud.net/${item.files[0]}`}
        />
      </div>
      <div className={styles.orderInfo}>
        <div className={styles.detailsItem}>
          {new Date(item?.created).toLocaleString()}
        </div>
        <div className={styles.description}>{item.description}</div>
        <div className={styles.textcols}>
          <div className={styles.textcolsItem}>
            <div className={styles.detailsItem}>Объект: {item.branch}</div>
            <div className={styles.detailsItem}>
              Постановщик:{" "}
              {managers.find((mng) => mng.id === item?.manager)?.name}
            </div>
          </div>
          <div className={styles.textcolsItem}>
            <div className={styles.detailsItem}>
              Индекс поломки:
              <div className={style}>{item.faultIndex}</div>
            </div>
            {item.executor && (
              <div className={styles.detailsItem}>
                Исполнитель:
                <div>
                  {executors.find((ex) => ex.id === item?.executor)?.name}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
