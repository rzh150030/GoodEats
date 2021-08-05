const CREATE_REVIEW = "review/createReview";
const LOAD_REVIEWS = "review/loadReviews";
const UPDATE_REVIEW = "review/updateReview";
const DELETE_REVIEW = "review/deleteReview";

const makeReview = (review) => ({
    type: CREATE_REVIEW,
    review
});

const loadRecipeReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    payload: reviews //reviews come in as key:value, set payload to remove redundancies
});

const updateRecipeReview = (review) => ({
    type: UPDATE_REVIEW,
    review
});

const deleteRecipeReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
});

//thunk for creating review
export const createReview = (review, recipeId) => async dispatch => {
    const response = await fetch(`/api/reviews/create/${recipeId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({review})
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(makeReview(data));
        return null;
    }
    else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    }
    else {
        return ['An error occurred. Please try again later.'];
    }
};

//thunk for getting all recipe's reviews
export const loadReviews = (recipeId) => async dispatch => {
    const response = await fetch(`/api/reviews/${recipeId}`)

    if (response.ok) {
        const data = await response.json();
        dispatch(loadRecipeReviews(data));
    }
};

//thunk for updating a review
export const updateReview = (updatedReview, reviewId) => async dispatch => {
    const response = await fetch(`/api/reviews/update/${reviewId}`, {
        methods: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({updatedReview})
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(updateRecipeReview(data));
        return null;
    }
    else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    }
    else {
        return ['An error occurred. Please try again later.'];
    }
};

//thunk for deleting a review
export const deleteReview = (reviewId) => async dispatch => {
    const response = await fetch(`/api/reviews/delete/${reviewId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        console.log("AAAAAAAA")
        dispatch(deleteRecipeReview(reviewId));
        return null;
    }
    else if (response.status < 500) {
        console.log("alksdjalkd")
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    }
    else {
        return ['An error occurred. Please try again later.'];
    }
};

const initialState = {reviews: {}};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_REVIEW:
            let newReviewState = {...state};
            newReviewState.reviews[action.review.id] = action.review;
            return newReviewState;
        case LOAD_REVIEWS:
            return {reviews: action.payload.reviews};
        case UPDATE_REVIEW:
            let updateReviewState = {...state};
            updateReviewState.reviews[action.review.id] = action.review;
            return updateReviewState;
        case DELETE_REVIEW:
            let deleteReviewState = {...state};
            delete deleteReviewState.reviews[action.reviewId]
            return deleteReviewState;
        default:
            return state;
    }
}
