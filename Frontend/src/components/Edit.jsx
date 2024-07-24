import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { editExpense } from "../services/allApis";
import { toast } from "react-toastify";
import { editExpenseResponseContext } from "../Context_api/ContextShare";

function Edit({ expense }) {
  const { editResponse, setEditResponse } = useContext( editExpenseResponseContext);
  const [show, setShow] = useState(false);
  const [expenseData, setExpenseData] = useState({
    id: expense._id,
    amount: expense.amount,
    category: expense.category,
    date: expense.date,
    description: expense.description,
  });

  useEffect(() => {}, []);

  const handleClose = () => {
    setShow(false);
    setExpenseData({
      id: expense._id,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
      description: expense.description,
    });
  };

  const handleShow = () => setShow(true);

  //Function for property edit handling
  const handleSubmit = async () => {
    const { amount, category, date, description } = expenseData;

    if (!amount || !category || !date || !description) {
    } else {
      const formData = new FormData();
      formData.append("amount", amount);
      formData.append("category", category);
      formData.append("date", date);
      formData.append("description", description);

      const header = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      };
      const result = await editExpense(formData, header, expenseData.id);
      if (result.status == 200) {
        toast.success("Expense Updated Successfully");
        setEditResponse(result);
        handleClose();
      } else {
        toast.error(result.response.data);
      }
    }
  };

  return (
    <>
      <button className="btn btn-primary" onClick={handleShow}>
        <i className="fa-solid fa-pen-to-square "></i>
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <FloatingLabel controlId="Amount" label="Amount" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Amount"
                  value={expenseData.amount}
                  onChange={(e) =>
                    setExpenseData({ ...expenseData, amount: e.target.value })
                  }
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="Category"
                label="Category"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Category"
                  value={expenseData.category}
                  onChange={(e) =>
                    setExpenseData({ ...expenseData, category: e.target.value })
                  }
                />
              </FloatingLabel>
              <FloatingLabel controlId="Date" label="Date" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Date"
                  value={expenseData.date}
                  onChange={(e) =>
                    setExpenseData({ ...expenseData, date: e.target.value })
                  }
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="Description"
                label="Description"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Description"
                  value={expenseData.description}
                  onChange={(e) =>
                    setExpenseData({
                      ...expenseData,
                      description: e.target.value,
                    })
                  }
                />
              </FloatingLabel>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Edit;
