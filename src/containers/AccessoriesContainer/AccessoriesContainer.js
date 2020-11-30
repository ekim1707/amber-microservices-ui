import React, { useState, useEffect } from 'react'
import AccessoriesComponent from "../../components/AccessoriesComponent";
import accessoriesService from "../../services/accessoriesService";

const AccessoriesContainer = () => {
    const [accessoriesDataArray, setAccessoriesDataArray] = useState([]);
    const [activeIndexArray, setActiveIndexArray] = useState([]);

    useEffect(() => {
        accessoriesService.getAllAccessories()
            .then(res => setAccessoriesDataArray(res.data ? res.data : []));
    }, []);

    const handleClick = async (index, id) => {
        const getAccessoryResponse = await accessoriesService.getAccessoryById(id)
            .then(res => res);
        const updatedRating = getAccessoryResponse.data.rating;
        if (getAccessoryResponse.status === 200) {
            let newRating;
            if (activeIndexArray.includes(index)) {
                newRating = index % 2 === 0 ? updatedRating + 1 : updatedRating - 1;
                const editResponse = await accessoriesService.editAccessory(id, { ...getAccessoryResponse.data, rating: newRating });
                if (editResponse.status === 200) {
                    accessoriesService.getAllAccessories()
                        .then(res => setAccessoriesDataArray(res.data));
                    let filtered = activeIndexArray.filter(activeIndex => activeIndex !== index);
                    setActiveIndexArray(filtered);
                } else {
                    // react-toastify server error notification goes here
                }
            } else {
                if (activeIndexArray.includes(index + 1) || activeIndexArray.includes(index - 1)) {
                    newRating = index % 2 === 0 ? updatedRating - 2 : updatedRating + 2;
                } else {
                    newRating = index % 2 === 0 ? updatedRating - 1 : updatedRating + 1;
                }
                const editResponse = await accessoriesService.editAccessory(id, { ...getAccessoryResponse.data, rating: newRating });
                if (editResponse.status === 200) {
                    accessoriesService.getAllAccessories()
                        .then(res => setAccessoriesDataArray(res.data));
                    let filtered = activeIndexArray.filter(activeIndex => activeIndex !== index + 1 && activeIndex !== index - 1);
                    setActiveIndexArray([ ...filtered, index ]);
                } else {
                    // react-toastify server error notification goes here
                }
            }
        } else {
            // react-toastify server error notification goes here
        }
    }

    return (
        <AccessoriesComponent 
            accessoriesArray={accessoriesDataArray}
            activeIndexArray={activeIndexArray}
            handleClick={handleClick}
        />
    )
}

export default AccessoriesContainer;