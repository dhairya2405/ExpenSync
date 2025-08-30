const express = require("express");
const {
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel,
    generateRecurringExpenses,
} = require("../controllers/expenseController");
const { protect } = require("../middleware/authMiddleware")

const router = express.Router();
router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpense);
router.get("/downloadexcel", protect, downloadExpenseExcel);
router.delete("/:id", protect, deleteExpense);
router.post("/generate-recurring", protect, generateRecurringExpenses);

module.exports = router;