import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import { addExpense } from "../services/allApis";
import { toast } from "react-toastify";
import { addExpenseResponseContext } from "../Context_api/ContextShare";
import { InputGroup } from "react-bootstrap";
import DatePicker from "react-date-picker";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";

function Add() {
  var val = "";
  const { addResponse, setAddResponse } = useContext(addExpenseResponseContext);
  const [value, onChange] = useState(new Date());
  const [show, setShow] = useState(false);
  const [expense, setExpense] = useState({
    amount: "",
    category: "",
    date: "",
    description: "",
  });
  useEffect(() => {
    setExpense({
      amount: "",
      category: "",
      date: "",
      description: "",
    });
  }, [addResponse]);
  useEffect(() => {
    value ? (val = value.toDateString()) : "";
    setExpense({ ...expense, date: val });
  }, [value]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddExpense = async () => {
    const { amount, category, date, description } = expense;

    if (!amount || !category || !date || !description) {
      toast.error("Fill all fields");
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
      console.log(expense);
      const result = await addExpense(formData, header);
      if (result.status == 200) {
        toast.success("Expense added successfully");
        setExpense({
          amount: "",
          category: "",
          date: "",
          description: "",
        });
        setAddResponse(result);
        handleClose();
      } else {
        toast.error(result.response.data);
      }
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="mb-3">
        Add Expense
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard="false"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <FloatingLabel controlId="Amount" label="Amount" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Amount"
                  onChange={(e) =>
                    setExpense({ ...expense, amount: e.target.value })
                  }
                />
              </FloatingLabel>
              Category
              {["radio"].map((type) => (
                <div key={`reverse-${type}`} className="mb-3">
                  <Form.Check
                    label="Food"
                    name="group1"
                    value="Food"
                    type={type}
                    id={`reverse-${type}-1`}
                    onChange={(e) =>
                      setExpense({ ...expense, category: "Food" })
                    }
                  />
                  <Form.Check
                    label="Transportation"
                    name="group1"
                    type={type}
                    id={`reverse-${type}-2`}
                    onChange={(e) =>
                      setExpense({ ...expense, category: "Transportation" })
                    }
                  />
                  <Form.Check
                    label="Entartainment"
                    name="group1"
                    type={type}
                    id={`reverse-${type}-3`}
                    onChange={(e) =>
                      setExpense({ ...expense, category: "Entartainment" })
                    }
                  />

                  <InputGroup>
                    <InputGroup.Radio
                      style={{ color: "white" }}
                      name="group1"
                    />
                    <Form.Control
                      onChange={(e) =>
                        setExpense({ ...expense, category: e.target.value })
                      }
                      placeholder="Type Other Category"
                    />
                  </InputGroup>
                </div>
              ))}
              <FloatingLabel
                controlId="Description"
                label="Description"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Description"
                  onChange={(e) =>
                    setExpense({ ...expense, description: e.target.value })
                  }
                />
              </FloatingLabel>
              Date
              <DatePicker onChange={onChange} value={value} />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddExpense}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Add;
