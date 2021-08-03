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

const initialState = {reviews: {}};

export default function reducer(state = initalState, action) {
    switch (action.type) {
        case CREATE_REVIEW:
            let newReviewState = {...state};
            newReviewState.reviews[action.review.id] = action.review;
            return newReviewState;
        default:
            return state;
    }
}
