import React, { useEffect, useState } from "react";
import "./popup.scss";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function Popup({ data, open, setOpen, collectionRef }) {
  const [dataForm, setdataForm] = useState({});

  const submitForm = () => {
    //userRef.child(data.id).set()
    collectionRef
      .child(`/${data[0]}`)
      .set(dataForm)
      .then((result) => {
        closePopup();
      });
  };

  const updateStatus = (value) => {
      const newState = dataForm;
      newState.status = value == 1 ? 0 : 1
      setdataForm({...newState})
  }

  const closePopup = () => {
    setOpen(false);
  };

  useEffect(() => {
    setdataForm({ ...data[1] });
  }, [data]);

  return (
    <div className="popup">
      <Modal
        isOpen={open}
        style={customStyles}
        onRequestClose={() => {
          closePopup();
          setdataForm({ ...data });
        }}
      >
        {Object.entries(dataForm).map(([key, value], keyIndex) =>
          key != "use" && key != "log" ? (
            key != "status" ? (
              <React.Fragment>
                <p>{key.toUpperCase()}</p>
                <input
                  value={dataForm[key]}
                  key={keyIndex}
                  onChange={(e) => {
                    const newState = { ...dataForm };
                    newState[key] = e.target.value;
                    setdataForm(newState);
                  }}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <p>{key.toUpperCase()}</p>
                <label class="switch">
                  <input type="checkbox" checked={dataForm[key] == 1} />
                  <span class="slider round" onClick={() => {
                      updateStatus(dataForm[key]);
                  }}></span>
                </label>
              </React.Fragment>
            )
          ) : null
        )}
        <button
          className="bt_save"
          onClick={() => {
            submitForm();
          }}
        >
          Save
        </button>
      </Modal>
    </div>
  );
}

export default Popup;
