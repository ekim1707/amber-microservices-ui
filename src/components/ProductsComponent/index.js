import React from 'react';
import "./styles.scss";
import content from "./content";
import { 
    Container,
    Button,
    Header,
    Grid,
    Card,
    Image
} from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import NavBar from "./NavBar";
import Modal from "./Modal";

const ProductsComponent = ({
    isOpen,
    productsArray,
    reviewsArray,
    handleClick,
    clickedProductID,
    clickedProductIndex,
    navBarArray,
    isSelected,
    setIsSelected,
    isCreateOpen,
    setIsCreateOpen,
    createFormData,
    handleOnChange,
    isConfirmOpen,
    setIsConfirmOpen,
    isActive,
    isNotEditable,
    handleFormActionsClick,
    titlesRefsArray,
    ratingsRefsArray,
    reviewsRefsArray
}) => {
    return (
        <Container className="productsComponent">
            <Button.Group className="navButtonContainer" vertical labeled icon>
                {content.NAV_BUTTON_ARRAY.map(({
                    PATH,
                    ICON,
                    NAME
                }, i) => 
                    <NavLink to={PATH} exact key={i}>
                        <Button
                            className="primaryNavButton"
                            icon={ICON} 
                            labelPosition="left"
                            content={NAME}
                        />
                    </NavLink>
                )}
            </Button.Group>
            <Header className="productsComponentTitle" size="huge" textAlign="center">{content.TITLE}</Header>
            <NavBar navBarArray={navBarArray} isSelected={isSelected} setIsSelected={setIsSelected} />
            <Grid columns={1}>
                <Grid.Column>
                    <Card.Group centered>
                        {productsArray.length === 0 ? 
                        <Card className="productCardContainer">
                            <Card.Header style={{ color: "#fff" }} >{content.NOTHING_YET}</Card.Header>
                        </Card> 
                        :
                        productsArray.map(({ id, make, model, imageUrl }, i) => 
                            isSelected === "All" | isSelected === make ?
                                <Card className="productCardContainer" onClick={() => handleClick(id)} key={i}>
                                    <Image size="small" src={imageUrl} wrapped style={{ margin: "auto"}} />
                                    <Card.Header className="productCardModelLabel">{model}</Card.Header>
                                </Card> 
                                : 
                                ""
                        )}
                    </Card.Group>
                </Grid.Column>
            </Grid>
            {isOpen && (
                <Modal 
                    productsArray={productsArray}
                    reviewsArray={reviewsArray}
                    clickedProductID={clickedProductID}
                    clickedProductIndex={clickedProductIndex}
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
            )}
        </Container>
    );
};

export default ProductsComponent;