import React from 'react';
import "./styles.scss";
import content from "./content";
import { 
    Container,
    Grid,
    Button,
    Header,
    Card,
    Image
} from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const ShoppingCartComponent = ({ formDataArray, quantityDataArray, handleClick, totalPrice }) => {
    return (
        <Container className="shoppingCartComponent">
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
            <Header className="shoppingCartTitle" size="huge" textAlign="center">{content.TITLE}</Header>
            <Grid columns={2}>
                <Grid.Column width="12">
                    {formDataArray.length < 1 && <Header className="cartItemTitle" size="huge" >{content.EMPTY_CART_LABEL}</Header>}
                    {formDataArray.length > 0 && (
                        <Card.Group>
                            {formDataArray.map(({ id, model, fullPrice, imageUrl }, i) =>
                                <Card fluid key={i}>
                                    <Card.Content>
                                        <Grid columns={3}>
                                            <Grid.Column><Image size="tiny" src={imageUrl} wrapped /></Grid.Column>
                                            <Grid.Column className="cartItemContentContainer">
                                                <Header size="huge">{model}</Header>
                                                <Header size="small">
                                                    {content.PRICE_LABEL}
                                                    <span className="fontMoneyGreen">${fullPrice}</span>
                                                </Header>
                                                <Button.Group>
                                                    <Button 
                                                        onClick={() => {
                                                            window.localStorage.setItem(id.toString(), quantityDataArray[i] + 1);
                                                            handleClick(i, true);
                                                        }}
                                                        icon={{ name: "arrow up", size: "large" }}
                                                    />
                                                    <Button className="quantityButton">
                                                        <Header className="quantityButtonLabel" size="medium">{quantityDataArray[i]}</Header>
                                                    </Button>
                                                    <Button 
                                                        onClick={() => {
                                                            window.localStorage.setItem(id.toString(), quantityDataArray[i] - 1);
                                                            handleClick(i, false);
                                                        }}
                                                        icon={{ name: "arrow down", size: "large" }}
                                                        disabled={quantityDataArray[i] < 1 ? true : false}
                                                    />
                                                </Button.Group>
                                            </Grid.Column>
                                            <Grid.Column className="cartItemSubTotalContainer">
                                                <Header size="large">
                                                    {content.SUBTOTAL_LABEL}
                                                    <span className="fontMoneyGreen">${Math.ceil(fullPrice * quantityDataArray[i] * 100)/100}</span>
                                                </Header>
                                            </Grid.Column>
                                        </Grid>
                                    </Card.Content>
                                </Card>
                            )}
                        </Card.Group>
                    )}
                </Grid.Column>
                <Grid.Column width="4">
                    <Card className="shoppingCartTotalPriceContainer" fluid>
                        <Header size="huge" textAlign="center">{content.TOTAL_PRICE_LABEL}</Header>
                        <Header size="huge" className="fontMagentaPink" textAlign="center">${totalPrice}</Header>
                    </Card>
                </Grid.Column>
            </Grid>
        </Container>
    );
};

export default ShoppingCartComponent;