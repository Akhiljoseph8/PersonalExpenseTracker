import React, { useEffect, useState, useContext } from "react";
import Add from "../components/Add";
import Header from "../components/Header";
import { getExpense, removeExpense } from "../services/allApis";
import Edit from "../components/Edit";
import { toast } from "react-toastify";
import { deleteExpenseResponseContext } from "../Context_api/ContextShare";
import { addExpenseResponseContext } from "../Context_api/ContextShare";
import { editExpenseResponseContext } from "../Context_api/ContextShare";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Home() {
  const { deleteResponse, setDeleteResponse } = useContext(deleteExpenseResponseContext);
  const { addResponse, setAddResponse } = useContext(addExpenseResponseContext);
  const { editResponse, setEditResponse } = useContext( editExpenseResponseContext);
  const [logStatus, setLogStatus] = useState(false);
  const [expense, setExpense] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => {
    setModalShow(false);
    setCategory("");
  };
  const [categorySum, setcategorySum] = useState(0);
  const [category, setCategory] = useState("");
  var sum = 0;
  var catSum = 0;
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setLogStatus(true);
    } else {
      setLogStatus(false);
    }
    getData();
  }, [logStatus, deleteResponse, addResponse, editResponse]);

  //   Funtion for Geting detaials from database
  const getData = async () => {
    const header = {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    };
    const res = await getExpense(header);
    if (res.status == 200) {
      setExpense(res.data);
    } else {
    }
  };

  //Funtion for calulating total eaxpense
  const totalExpense = () => {
    expense.map((item) => {
      sum += item.amount;
    });
  };

  //Function for calculating category expense
  const categoryExpense = (category) => {
    expense.map((item) => {
      item.category == category ? (catSum += item.amount) : "";
    });
    console.log(catSum);
    setcategorySum(catSum);
    setCategory(category);
    setModalShow(true);
  };

  //Function for handling Expense delete
  const handleDelete = async (id) => {
    const header = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    };
    const result = await removeExpense(header, id);
    if (result.status == 200) {
      setDeleteResponse(result);
      toast.success("Expense deleted Successfully");
    } else {
      toast.error("deletion failed");
    }
  };

  totalExpense();

  return (
    <>
      <Modal
        show={modalShow}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {category}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Your total {category} category expense is{" "}
            <span className="text-danger">{categorySum}</span>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>

      <div className="">
        {logStatus ? <Header status={true} /> : <Header />}
        <div className="d-flex justify-content-between">
          <Add />
          <h4 className="me-4">
            Your Total Expense:<span className="text-danger"> {sum}</span>
          </h4>
        </div>

        <div>
          {expense.length > 0 ? (
            <div>
              <p>Click any category for view your categorised expense</p>
              <table className="table borderd">
                <thead>
                  <tr>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {expense
                    ? expense.map((item) => (
                        <tr>
                          <td>{item.amount}</td>
                          <td
                            className="text-primary"
                            onClick={() => categoryExpense(item.category)}
                          >
                            {item.category}
                          </td>
                          <td>{item.date}</td>
                          <td>{item.description}</td>
                          <td>
                            <Edit expense={item} />{" "}
                            <i
                              className="btn btn-danger fa fa-trash"
                              onClick={() => {
                                handleDelete(item._id);
                              }}
                            ></i>
                          </td>
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
export default Home;
