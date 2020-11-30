import React, { useState, useEffect } from 'react'
import ShoppingCartComponent from "../../components/ShoppingCartComponent";
import productsService from "../../services/productsService";

const ShoppingCartContainer = () => {
    const [productDataArray, setProductDataArray] = useState([]);
    const [formDataArray, setFormDataArray] = useState([]);
    const [quantityDataArray, setQuantityDataArray] = useState([]);

    useEffect(() => {
        productsService.getAllProducts()
            .then(res => setProductDataArray(res.data ? res.data : []));
    }, []);

    useEffect(() => {
        let formData = [];
        productDataArray.forEach((product, i) => {
            if (window.localStorage.getItem(product.id)) {
                formData.push({
                    id: product.id,
                    model: product.model,
                    fullPrice: product.fullPrice,
                    imageUrl: product.imageUrl
                })
            }
        });
        setFormDataArray(formData);
    }, [productDataArray]);

    useEffect(() => {
        let quantityData = [];
        productDataArray.forEach((product, i) => {
            if (window.localStorage.getItem(product.id)) quantityData.push(parseInt(window.localStorage.getItem(product.id)));
        });
        setQuantityDataArray(quantityData);
    }, [productDataArray]);

    const handleClick = (index, add) => {
        let newArray = quantityDataArray.map((quantity, i) => {
            if (i === index) add ? quantity += 1 : quantity -= 1;
            return quantity;
        });
        setQuantityDataArray(newArray);
    }

    let totalPrice = 0;
    formDataArray.forEach((product, i) => totalPrice += product.fullPrice * quantityDataArray[i]);

    return (
        <ShoppingCartComponent 
            formDataArray={formDataArray}
            quantityDataArray={quantityDataArray}
            handleClick={handleClick}
            totalPrice={Math.ceil(totalPrice * 100)/100}
        />
    );
};

export default ShoppingCartContainer;