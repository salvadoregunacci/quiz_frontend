import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchQuestions = createAsyncThunk("general/fetchQuestions", async (catId, {rejectWithValue}) => {
    try {
        const {data} = await axios.get(`/question?category=${catId}`);

        return data;
    } catch(err) {
        return rejectWithValue({
            status: err.response.status,
            data: err.response.data,
        });
    }
});

const initialState = {
    status: "loading",
    countSteps: 0,
    activeStep: 0,
    correctAnswersCount: 0,
    isFinal: false,
    userAnswers: [],
    compeletedQuestions: [],
    questions: [],
    error: false,
    isCompleteManual: false
}

const generalSlice = createSlice({
    name: "general",
    initialState,
    reducers: {
        completeQuiz: (state, action) => {
            const {curQuestionId, selectAnswerId} = action.payload;
            const curQuestion = state.questions.find(item => item.id === curQuestionId);

            state.compeletedQuestions.push(curQuestionId);
            state.userAnswers.push({
                questionId: curQuestionId,
                selectAnswerId,
            });

            if (selectAnswerId === curQuestion.correctAnswer) {
                state.correctAnswersCount++;
            }

            state.activeStep++;

            if (state.activeStep > state.countSteps) {
                state.isFinal = true;
            }
        },
        nextStep: (state) => {
            state.activeStep++;

            if (state.activeStep > state.countSteps) {
                state.isFinal = true;
            }
        },
        resetQuiz: (state) => {
            state.activeStep = 0;
            state.isFinal = false;
            state.userAnswers = [];
            state.countSteps = 0;
            state.compeletedQuestions = [];
            state.correctAnswersCount = 0;
            state.error = false;
        },
        completeManual: (state) => {
            state.isCompleteManual = true;
        },
        _setFullCorrectAnswersCount: (state) => {
            state.correctAnswersCount = 10;
        }
    },
    extraReducers: {
        [fetchQuestions.pending]: (state) => {
            state.error = false;
            state.status = "loading";
        },
        [fetchQuestions.fulfilled]: (state, action) => {
            state.countSteps = action.payload.length;
            state.questions = action.payload;
            state.status = "complete";
        },
        [fetchQuestions.rejected]: (state) => {
            state.error = "Err fetch questions";
        }
    }
});

export default generalSlice.reducer;
export const {completeQuiz, nextStep, resetQuiz, _setFullCorrectAnswersCount} = generalSlice.actions;