import { QuizActions } from './quiz.actions';
import { QuizState } from './store';
import { tassign } from 'tassign';
import { TempDataService } from './service/temp-data.service';

let temp = new TempDataService();
const INITIAL_STATE: QuizState = {isLoggedIn: false, isAdminLoggedIn: false, quizzes: [], isLoading: false }

export function quizReducer(state: QuizState = INITIAL_STATE, action:any) {
 switch (action.type) {
  case QuizActions.ADMIN_LOG_IN:
    // state.isLoggedIn = action.payload; // No No! You cannot modify state in Redux!
    // return state;
    // Make a copy of the state
    // Change isLoggedIn variable in the copy.
    console.log(action);
    // Shallow copy of the state object and changes isLoggedIn of the copy.
    return tassign(state, { isAdminLoggedIn: action.payload});
    // return Object.assign({}, state, { isLoggedIn: action.payload });

  case QuizActions.LOG_IN:
    // state.isLoggedIn = action.payload; // No No! You cannot modify state in Redux!
    // return state;
    // Make a copy of the state
    // Change isLoggedIn variable in the copy.
    console.log(action);
    // Shallow copy of the state object and changes isLoggedIn of the copy.
    return tassign(state, {isLoggedIn: action.payload});
    // return Object.assign({}, state, { isLoggedIn: action.payload });

  case QuizActions.GET_QUIZZES_LOADING:
    return tassign(state, { isLoading: true});

  case QuizActions.GET_QUIZZES_SUCCESS:
    return tassign(state, { isLoading: false, quizzes: action.payload});

  case QuizActions.GET_QUIZZES_FAILED:
    return tassign(state, { isLoading: false});

  case QuizActions.CREATE_QUIZ:
    // Create a copy of the array with the original quiz objects + action.payload.
    // return a new state object.
    // Javascript spread operator (...)
    // state.quizzes.push(action.payload);
    // return state;
    // newState.push(action.payload);
    return tassign(state, { quizzes: [...state.quizzes.splice(action.payload._id, 1, action.payload)] });

  case QuizActions.UPDATE_QUIZ:
    //action.payload: index of quiz
    //how to replace an object in an array without mutating state
    return tassign(state, { quizzes: [...state.quizzes, action.payload]})

  case QuizActions.DELETE_QUIZ:
    //action.payload: id of the quiz
    //how to create a new array with missing object from another array
    //const newArray = state.quizzes.filter(x => x._id != action.payload);
    return tassign(state, { quizzes: state.quizzes.filter(quiz => quiz._id !== action.payload)});
  
  case QuizActions.CREATE_RATING:
    //action.payload: rating object, id of quiz

    //action.payload.rating
    //action.payload.quizId
    //How to add an object to an array within an object in an array

  default:
    return state;
}
}
