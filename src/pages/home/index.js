import React, { useContext, useEffect, useRef, useState } from "react";
import "./home.scss";
import UserContext from "../../contexts/context";
import Table from "../../components/table/table";
import Header from "../../components/header/header";
import AddIcon from "../../public/icons/add.svg";
import { rootRef } from "../../services/firebase";

function HomePage() {
  const userCtx = useContext(UserContext);
  const setStateUser = userCtx[1];
  const userState = userCtx[0];

  const [account, setAcc] = useState("");
  const [password, setPwd] = useState("");
  const [comment, setComment] = useState("");
  const [users, setUsers] = useState({});
  const [comments, setComments] = useState({});
  const userRef = rootRef.ref("/users");
  const commentRef = rootRef.ref("/comments");

  const refreshInput = (form) => {
    switch (form) {
      case "comment":
        setComment("");
        break;
      case "user":
        setAcc("");
        setPwd("");
        break;
    }
  };

  const submitForm = (form) => {
    switch (form) {
      case "comment":
        const commentData = {
          content: comment,
          status: 1,
          use: 0,
          log: "",
        };
        commentRef.push(commentData).then((result) => {
          refreshInput("comment");
        });
        break;
      case "user":
        const userData = {
          account: account,
          password: password,
          totalLike: 0,
          totalComment: 0,
          status: 1,
          use: 0,
          log: "",
        };
        userRef.push(userData).then((result) => {
          refreshInput("user");
        });
        break;
    }
  };

  const userHeaderData = [
    {
      title: "Account",
      colIdentify: "account",
      Tag: (
        <input
          placeholder="Account"
          value={account}
          onChange={(e) => {
            setAcc(e.target.value);
          }}
        />
      ),
    },
    {
      title: "Password",
      colIdentify: "password",
      Tag: (
        <input
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPwd(e.target.value);
          }}
        />
      ),
    },
    {
      title: "Total Like",
      colIdentify: "totalLike",
    },
    {
      title: "Total Comment",
      colIdentify: "totalComment",
    },
    {
      title: "Log",
      colIdentify: "log",
    },
    {
      title: "Status",
      colIdentify: "status",
      Tag: (
        <button
          className="bt_add"
          onClick={() => {
            submitForm("user");
          }}
        >
          <img src={AddIcon} className="icon_add" />
        </button>
      ),
      colDefault: (
        <label className="switch">
          <input type="checkbox" checked />
          <span className="slider round"></span>
        </label>
      ),
    },
  ];

  const commentHeaderData = [
    {
      title: "Content",
      colIdentify: "content",
      Tag: (
        <input
          placeholder="Content"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
      ),
    },
    {
      title: "Log",
      colIdentify: "log",
    },
    {
      title: "Status",
      colIdentify: "status",
      Tag: (
        <button
          className="bt_add"
          onClick={() => {
            submitForm("comment");
          }}
        >
          <img src={AddIcon} className="icon_add" />
        </button>
      ),
    },
  ];

  //Add record to table
  useEffect(() => {
    userRef.on("child_added", function (user) {
      const newUsers = users;
      newUsers[user.key] = user.val();
      setUsers({ ...newUsers });
    });

    commentRef.on("child_added", function (commentData) {
      const newComments = comments;
      newComments[commentData.key] = commentData.val();
      setComments({ ...newComments });
    });
    // ----------End----------

    //Update state if record updated
    userRef.on("child_changed", (data) => {
      var newState = users;
      newState[data.key] = data.val();
      setUsers({ ...newState });
    });
    commentRef.on("child_changed", (data) => {
      var newState = comments;
      newState[data.key] = data.val();
      setComments({ ...newState });
    });
    // ----------End----------
  }, []);

  return (
    <React.Fragment>
      {userState.email ? (
        <React.Fragment>
          <Header />
          <div className="home">
            {/* Table List User */}
            <div className="tb_user">
              <h1>List User Account</h1>
              <Table
                headers={userHeaderData}
                rows={users}
                collectionRef={userRef}
              />
            </div>
            {/*------ End ------*/}

            {/* Table List Comment */}
            <div className="tb_comment">
              <h1>List Comment</h1>
              <Table
                headers={commentHeaderData}
                rows={comments}
                collectionRef={commentRef}
              />
            </div>
            {/*------ End ------*/}
          </div>
        </React.Fragment>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
}

export default HomePage;
