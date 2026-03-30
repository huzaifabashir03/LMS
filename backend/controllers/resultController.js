import Result from '../models/Result.js';
import User from '../models/User.js';

// Create a new result
const createResult = async (req, res) => {
    try {
        const { student, subject, grade } = req.body;

        // Validate input
        if (!student || !subject || !grade) {
            return res.status(400).json({ message: 'Please provide student roll number, subject, and grade' });
        }

        // Validate subject is not empty
        if (typeof subject !== 'string' || subject.trim().length === 0) {
            return res.status(400).json({ message: 'Subject must be a non-empty string' });
        }

        // Validate grade
        const validGrades = ['A', 'B', 'C', 'D', 'F'];
        if (!validGrades.includes(grade.toUpperCase())) {
            return res.status(400).json({ message: 'Grade must be A, B, C, D, or F' });
        }

        // Trim and find user by rollNo (student identifier)
        const trimmedRollNo = String(student).trim();
        if (trimmedRollNo.length === 0) {
            return res.status(400).json({ message: 'Student roll number cannot be empty' });
        }

        const user = await User.findOne({ rollNo: trimmedRollNo });
        
        if (!user) {
            return res.status(404).json({ message: 'Student not found. Please check the roll number.' });
        }

        const result = new Result({
            studentId: user._id,
            subject: subject.trim(),
            grade: grade.toUpperCase()
        });
        await result.save();
        res.status(201).json({ message: 'Result uploaded successfully', result });
    } catch (error) {
        console.error('Create result error:', error);
        res.status(400).json({ message: error.message });
    }
};

// Get all results
const getAllResults = async (req, res) => {
    try {
        const results = await Result.find().populate('studentId', 'name rollNo email department');
        res.status(200).json(results);
    } catch (error) {
        console.error('Get all results error:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get a result by ID
const getResultById = async (req, res) => {
    try {
        const result = await Result.findById(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Result not found' });
        }

        // Students can only view their own results, admins can view any
        if (req.user.role === 'student' && result.studentId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to view this result' });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a result by ID
const updateResult = async (req, res) => {
    try {
        // Validate input if grade is being updated
        if (req.body.grade !== undefined) {
            const validGrades = ['A', 'B', 'C', 'D', 'F'];
            if (!validGrades.includes(req.body.grade.toUpperCase())) {
                return res.status(400).json({ message: 'Grade must be A, B, C, D, or F' });
            }
            req.body.grade = req.body.grade.toUpperCase();
        }

        // Validate subject if being updated
        if (req.body.subject !== undefined && (typeof req.body.subject !== 'string' || req.body.subject.trim().length === 0)) {
            return res.status(400).json({ message: 'Subject must be a non-empty string' });
        }

        const result = await Result.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!result) {
            return res.status(404).json({ message: 'Result not found' });
        }
        res.status(200).json({ message: 'Result updated successfully', result });
    } catch (error) {
        console.error('Update result error:', error);
        res.status(400).json({ message: error.message });
    }
};

// Delete a result by ID
const deleteResult = async (req, res) => {
    try {
        const result = await Result.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Result not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    createResult,
    getAllResults,
    getResultById,
    updateResult,
    deleteResult
};