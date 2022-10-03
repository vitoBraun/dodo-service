import React, { useCallback, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { faultIndexes, brancheNames, managers } from "../constants";
import { createOrderThunk, getOrdersThunk } from "../redux/orders";
import { AppDispatch } from "../store";
import { convertFileToUrl } from "../common/ApiService";
export default function AddOrderPage() {
  const [formState, setFormState] = useState({
    branch: "",
    manager: "",
    faultIndex: "",
    description: "",
    files: [],
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleAddOrder = useCallback(
    (formState: any) => {
      return dispatch(createOrderThunk(formState)).then((action: any) => {
        if (!action.error) {
          dispatch(getOrdersThunk());
          navigate("/orders/new");
        }
      });
    },
    [dispatch, navigate]
  );

  const handleChange = async (file: File[]) => {
    if (file[0] instanceof File) {
      let url = await convertFileToUrl(file[0]);
      setFormState((prev: any) => {
        return {
          ...prev,
          files: [url, ...formState["files"]],
        };
      });
    }
  };

  return (
    <div style={{ margin: 10 }}>
      <form>
        <select
          style={{ margin: 10 }}
          onChange={(e) => {
            setFormState((prev) => {
              return { ...prev, branch: e.target.value, manager: "" };
            });
          }}
          defaultValue={formState.branch}
        >
          <option value="">--Объект--</option>
          {brancheNames.map((object) => (
            <option key={`branch-key-${object.id}`} value={object.id}>
              {object.id} - {object.name}
            </option>
          ))}
        </select>
        <br />
        <select
          style={{ margin: 10 }}
          onChange={(e) => {
            setFormState((prev) => {
              return { ...prev, manager: e.target.value };
            });
          }}
          defaultValue={formState.manager}
        >
          <option value="">--Менеджер смены--</option>
          {managers
            .filter((manager) => manager.branch === formState.branch)
            .map((worker) => (
              <option key={`worker-key-${worker.id}`} value={worker.id}>
                {worker.name}
              </option>
            ))}
        </select>
        <br />
        <select
          style={{ maxWidth: 380, margin: 10 }}
          onChange={(e) => {
            setFormState((prev) => {
              return { ...prev, faultIndex: e.target.value };
            });
          }}
          defaultValue={formState.faultIndex}
        >
          <option value="">--Индекс поломки--</option>
          {faultIndexes.map((fualt) => (
            <option key={`fualt-key-${fualt.id}`} value={fualt.id}>
              {fualt.id} - {fualt.description}
            </option>
          ))}
        </select>
        <br />
        Введите описание проблемы:
        <br />
        <textarea
          onChange={(e) => {
            setFormState((prev) => {
              return { ...prev, description: e.target.value };
            });
          }}
          placeholder="Описание"
          rows={3}
          style={{ width: "100%", margin: 10 }}
        />
        <div>
          Добавте фото
          <input
            type="file"
            onChange={(e: any) => {
              handleChange(e.target.files);
            }}
          />
        </div>
        <div style={{ margin: 10 }}>
          {formState.files.map((url) => (
            <img
              alt="pic"
              src={`https://imagesvito.storage.yandexcloud.net/${url}`}
              width={100}
              key={`img_${url}`}
              style={{ margin: 5 }}
            />
          ))}
        </div>
        <Button
          className="btn btn-primary btn-md"
          style={{
            whiteSpace: "nowrap",
            margin: "25px auto",
            color: "white",
            border: "none",
            backgroundColor: "green",
          }}
          onClick={() => {
            handleAddOrder(formState);
          }}
          disabled={
            !formState.branch ||
            !formState.manager ||
            !formState.faultIndex ||
            !formState.files.length
          }
        >
          Отправить
        </Button>
      </form>
    </div>
  );
}
