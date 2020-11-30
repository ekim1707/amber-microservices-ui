/* eslint-disable default-case */
import React, { useState, useReducer, useEffect, createRef } from 'react';
import ProductsComponent from "../../components/ProductsComponent";
import productsService from '../../services/productsService';
import reviewsService from "../../services/reviewsService";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProductsContainer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [productsDataArray, setProductsDataArray] = useState([]);
    const [reviewsDataArray, setReviewsDataArray] = useState([]);

    const [clickedProductID, setClickedProductID] = useState(null);
    const [clickedProductIndex, setClickedProductIndex] = useState(null);
    const [isSelected, setIsSelected] = useState("All");

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [createFormData, setCreateFormData] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        { title: "", rating: "5", review: "" }
    );
    const [isConfirmOpen, setIsConfirmOpen] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        { confirmReviewCreate: false, confirmReviewDelete: false }
    );
    const [isActive, setIsActive] = useState(null);
    const [isNotEditable, setIsNotEditable] = useState(true);
    const [titlesRefsArray, setTitlesRefsArray] = useState([]);
    const [ratingsRefsArray, setRatingsRefsArray] = useState([]);
    const [reviewsRefsArray, setReviewsRefsArray] = useState([]);
    const toastSettings = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    };
    
    useEffect(() => {
        productsService.getAllProducts()
            .then(res => setProductsDataArray(res.data ? res.data : []));
    }, []);

    const makeOnlyArray = productsDataArray ? productsDataArray.map(product => product.make) : [];
    const navBarArray = makeOnlyArray.filter((make, i) => makeOnlyArray.indexOf(make) === i);
    navBarArray.unshift("All");

    const handleClick = (productId) => {
        if(!isOpen) {
            reviewsService.getProductReviews(productId)
                .then(res => {
                    setReviewsDataArray(res.data);
                    setTitlesRefsArray(res.data.map(() => createRef()));
                    setRatingsRefsArray(res.data.map(() => createRef()));
                    setReviewsRefsArray(res.data.map(() => createRef()));
            });
            productsDataArray.forEach((product, i) => {
                if (product.id === productId) setClickedProductIndex(i);
            });
            setClickedProductID(productId);
            setIsOpen(true);
        }
    }

    const handleOnChange = (e) => setCreateFormData({ ...createFormData, [e.target.id]: e.target.value });

    const handleFormActionsClick = async (index, data, action, value) => {
        switch(action) {
            case "close":
                setIsOpen(false);
                setIsCreateOpen(false);
                setReviewsDataArray([]);
                setCreateFormData({ title: "", rating: "5", review: "" });
                setIsActive(null);
                setIsNotEditable(true);
                break;
            case "create":
                const createResponse = await reviewsService.createProductReview({
                    productId: clickedProductID,
                    title: createFormData.title,
                    rating: createFormData.rating,
                    review: createFormData.review,
                    can_delete: true,
                    prod_type: "P"
                });
                setIsConfirmOpen({ ...isConfirmOpen, confirmReviewCreate: false });
                if (createResponse.status === 200) {
                    reviewsService.getProductReviews(clickedProductID)
                        .then(res => {
                            setReviewsDataArray(res.data);
                            setTitlesRefsArray(res.data.map(() => createRef()));
                            setRatingsRefsArray(res.data.map(() => createRef()));
                            setReviewsRefsArray(res.data.map(() => createRef()));
                    });
                    setIsCreateOpen(false);
                    setCreateFormData({ title: "", rating: "5", review: "" });
                    toast.success("Success!", toastSettings);
                } else {
                    toast.error("Sorry! It's not you, it's us. Please try again later.", toastSettings);
                }
                break;
            case "edit":
                if (index === isActive) {
                    if (value) {
                        if (
                            titlesRefsArray[index].current.value.length !== 0 &&
                            ["1", "2", "3", "4", "5"].includes(ratingsRefsArray[index].current.value) &&
                            reviewsRefsArray[index].current.value.length !== 0
                        ) {
                            const editResponse = await reviewsService.editProductReview({
                                ...data,
                                title: titlesRefsArray[index].current.value,
                                rating: ratingsRefsArray[index].current.value,
                                review: reviewsRefsArray[index].current.value
                            });
                            if (editResponse.status === 200) {
                                reviewsService.getProductReviews(clickedProductID)
                                    .then(res => {
                                        setReviewsDataArray(res.data);
                                        setTitlesRefsArray(res.data.map(() => createRef()));
                                        setRatingsRefsArray(res.data.map(() => createRef()));
                                        setReviewsRefsArray(res.data.map(() => createRef()));
                                });
                                toast.success("Success!", toastSettings);
                            } else {
                                toast.error("Sorry! It's not you, it's us. Please try again later.", toastSettings);
                            }
                        } else {
                            if (titlesRefsArray[index].current.value.length < 1) {
                                toast.error("Please enter a title", toastSettings);
                            }
                            if (!["1", "2", "3", "4", "5"].includes(ratingsRefsArray[index].current.value)) {
                                toast.error("Ratings must be integers between 1-5", toastSettings);
                            }
                            if (reviewsRefsArray[index].current.value.length < 1) {
                                toast.error("Please enter a review", toastSettings);
                            } 
                            break;
                        }
                    }
                    isActive || isActive === 0 ? setIsActive(null) : setIsActive(index);
                    setIsNotEditable(value);
                    break;
                }
                if (isActive === null) {
                    setIsActive(index);
                    setIsNotEditable(value);
                    break;
                }
                toast.error("You must submit your previous edit before proceeding.", toastSettings);
                break;
            case "delete":
                const deleteResponse = await reviewsService.deleteProductReview(data.id);
                setIsConfirmOpen({ ...isConfirmOpen, confirmReviewDelete: false });
                if (deleteResponse.status === 200) {
                    reviewsService.getProductReviews(clickedProductID)
                        .then(res => {
                            setReviewsDataArray(res.data);
                            setTitlesRefsArray(res.data.map(() => createRef()));
                            setRatingsRefsArray(res.data.map(() => createRef()));
                            setReviewsRefsArray(res.data.map(() => createRef()));
                    });
                    toast.success("Success!", toastSettings);
                } else {
                    toast.error("Sorry! It's not you, it's us. Please try again later.", toastSettings);
                }
                break;
        }
    };

    return (
        <React.Fragment>
            <ProductsComponent
                isOpen={isOpen}
                productsArray={productsDataArray}
                reviewsArray={reviewsDataArray}
                handleClick={handleClick}
                clickedProductID={clickedProductID}
                clickedProductIndex={clickedProductIndex}
                navBarArray={navBarArray}
                isSelected={isSelected}
                setIsSelected={setIsSelected}
                isCreateOpen={isCreateOpen}
                setIsCreateOpen={setIsCreateOpen}
                createFormData={createFormData}
                handleOnChange={handleOnChange}
                isConfirmOpen={isConfirmOpen}
                setIsConfirmOpen={setIsConfirmOpen}
                isActive={isActive}
                isNotEditable={isNotEditable}
                handleFormActionsClick={handleFormActionsClick}
                titlesRefsArray={titlesRefsArray}
                ratingsRefsArray={ratingsRefsArray}
                reviewsRefsArray={reviewsRefsArray}
            />
            <ToastContainer />
        </React.Fragment>
    );
};

export default ProductsContainer;