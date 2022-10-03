import React, { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./OrderPage.module.css";
import { orderStatuses, executors, managers } from "../constants";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectOrders } from "../redux/orders/selectors";
import { AppDispatch } from "../store";
import { getOrdersThunk, updateOrderThunk } from "../redux/orders";
import { convertFileToUrl } from "../common/ApiService";

export default function OrderPage() {
  const { id } = useParams();

  const { byId } = useSelector(selectOrders);
  let item: any;
  if (id) {
    item = byId[id];
  }
  let status;
  if (item?.status) {
    status = orderStatuses?.[item?.status];
  }

  const [toWorkState, setToWorkState] = useState({
    id,
    operatorsComment: "",
    executor: "",
    files: [],
    status: "work",
  });

  const [toCompleteState, setToCompleteState] = useState({
    id,
    engineersComment: "",
    doneFiles: [],
    status: "done",
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleToWork = useCallback(() => {
    return dispatch(updateOrderThunk(toWorkState)).then((action: any) => {
      if (!action.error) {
        dispatch(getOrdersThunk());
        navigate("/orders/work");
      }
    });
  }, [dispatch, navigate, toWorkState]);

  const handleComplete = useCallback(() => {
    // eslint-disable-next-line no-restricted-globals
    const complete = confirm("Отметить заявку выполненной?");
    if (complete) {
      return dispatch(updateOrderThunk(toCompleteState)).then((action: any) => {
        if (!action.error) {
          dispatch(getOrdersThunk());
          navigate("/orders/done");
        }
      });
    }
  }, [dispatch, navigate, toCompleteState]);

  const handleClose = useCallback(() => {
    const toCloseState = {
      id,
      status: "closed",
    };
    // eslint-disable-next-line no-restricted-globals
    const complete = confirm("Подтвердите закрытие заявки");
    if (complete) {
      return dispatch(updateOrderThunk(toCloseState)).then((action: any) => {
        if (!action.error) {
          dispatch(getOrdersThunk());
          navigate("/orders/closed");
        }
      });
    }
  }, [dispatch, id, navigate]);

  const handleAddFile = async (file: File[]) => {
    if (file[0] instanceof File) {
      let url = await convertFileToUrl(file[0]);
      setToCompleteState((prev: any) => {
        return {
          ...prev,
          doneFiles: [url, ...toCompleteState["doneFiles"]],
        };
      });
    }
  };

  return (
    <>
      <div className={styles.main}>
        <h2>{item?.description}</h2>
        Фото поломки
        {item.files.map((url: string) => (
          <img
            alt={item?.description}
            width="100%"
            style={{ marginBottom: 20 }}
            src={`https://imagesvito.storage.yandexcloud.net/${url}`}
            key={`photoBefore_${url}`}
          />
        ))}
        {(item?.status === "done" || item?.status === "closed") && (
          <>
            Фото после ремонта
            {item.doneFiles.map((url: string) => (
              <img
                alt={item?.description}
                width="100%"
                style={{ marginBottom: 20 }}
                src={`https://imagesvito.storage.yandexcloud.net/${url}`}
                key={`photoafter_${url}`}
              />
            ))}
          </>
        )}
        <table
          style={{
            textAlign: "left",
            width: "100%",
            margin: 20,
          }}
        >
          <tbody>
            {(item?.status === "done" || item?.status === "closed") && (
              <tr>
                <td>Комментарий инженера: </td>
                <td>{item?.engineersComment}</td>
              </tr>
            )}

            <tr>
              <td>Статус заявки:</td>
              <td>{status}</td>
            </tr>
            <tr>
              <td>Создано:</td>
              <td>{new Date(item?.created).toLocaleString()}</td>
            </tr>
            {item?.status === "work" && (
              <tr>
                <td>Взято в работу:</td>
                <td>{new Date(item?.takenToWork).toLocaleString()}</td>
              </tr>
            )}
            {item?.operatorsComment && (
              <tr>
                <td>Комментарий:</td>
                <td>{item?.operatorsComment}</td>
              </tr>
            )}
            {(item?.status === "done" || item?.status === "closed") && (
              <tr>
                <td>Выполнено:</td>
                <td>{new Date(item?.completed).toLocaleString()}</td>
              </tr>
            )}
            <tr>
              <td>Постановщик:</td>
              <td>{managers.find((mng) => mng.id === item?.manager)?.name}</td>
            </tr>
            {item?.status !== "new" && (
              <tr>
                <td>Исполнитель:</td>
                <td>
                  {executors.find((ex) => ex.id === item?.executor)?.name}
                </td>
              </tr>
            )}

            {item?.status === "new" && (
              <tr>
                <td>Исполнитель:</td>
                <td>
                  <select
                    onChange={(e) => {
                      setToWorkState((prev) => {
                        return { ...prev, executor: e.target.value };
                      });
                    }}
                    defaultValue=""
                  >
                    <option value="">--Не выбрано--</option>
                    {executors.map((executor) => (
                      <option key={`exec_${executor.id}`} value={executor.id}>
                        {executor.name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            )}
            <tr>
              <td>Индекс поломки:</td>
              <td>{item?.faultIndex}</td>
            </tr>
            <tr>
              <td>Объект:</td>
              <td>{item?.branch}</td>
            </tr>
          </tbody>
        </table>
        {item?.status === "work" && (
          <>
            <div style={{ margin: 10 }}>
              {toCompleteState.doneFiles.map((url) => (
                <img
                  alt="pic"
                  src={`https://imagesvito.storage.yandexcloud.net/${url}`}
                  width={100}
                  key={`img_${url}`}
                  style={{ margin: 5 }}
                />
              ))}
            </div>
            <div>
              Добавить фото после ремонта
              <input
                type="file"
                onChange={(e: any) => {
                  handleAddFile(e.target.files);
                }}
              />
            </div>
            <div>
              Добавить комментарий:
              <br />
              <textarea
                placeholder="Комментарий"
                rows={2}
                style={{ width: "100%" }}
                onChange={(e) => {
                  setToCompleteState((prev) => {
                    return { ...prev, engineersComment: e.target.value };
                  });
                }}
              />
            </div>
            <Button
              style={{
                margin: "0 auto",
                color: "white",
                border: "none",
                backgroundColor: "green",
              }}
              onClick={handleComplete}
              disabled={!toCompleteState?.doneFiles.length}
            >
              Пометить выполненной
            </Button>
          </>
        )}
        {item?.status === "done" && (
          <>
            <Button
              style={{
                margin: "0 auto",
                color: "white",
                border: "none",
                backgroundColor: "green",
              }}
              onClick={handleClose}
            >
              Закрыть заявку
            </Button>
          </>
        )}
        {item?.status === "new" && (
          <>
            <div>
              Добавить комментарий:
              <br />
              <textarea
                placeholder="Комментарий"
                rows={2}
                style={{ width: "100%" }}
                onChange={(e) => {
                  setToWorkState((prev) => {
                    return { ...prev, operatorsComment: e.target.value };
                  });
                }}
              />
            </div>
            <Button
              style={{
                margin: "0 auto",
                color: "white",
                border: "none",
                backgroundColor: "green",
              }}
              onClick={handleToWork}
              disabled={!toWorkState.executor}
            >
              Отправить в работу
            </Button>
          </>
        )}
      </div>
    </>
  );
}
