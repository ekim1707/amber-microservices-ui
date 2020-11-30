import React, { useState, useEffect } from 'react';
import "./styles.scss";
import content from "./content";
import { Grid, Header } from "semantic-ui-react";

const HomePageComponent = (props) => {
    const [countdownValue, setCountdownValue] = useState(8);
    
    useEffect(() => {
        if (countdownValue > 0) {
            setTimeout(() => setCountdownValue(countdownValue - 1), 1000);
        } else {
            props.history.push("/phones");
            setCountdownValue(8);
        }
    }, [countdownValue, props.history]);

    const handleClick = () => props.history.push("/phones");

    return (
        <React.Fragment>
            <div className="homePageComponentBackground"></div>
            <Grid onClick={() => handleClick()} className="homePageComponent" columns={1}>
                <Grid.Column className="homePageComponentColumn">
                    <Header className="homePageComponentTitle rainbowTextAnimation">{content.TITLE}</Header>
                    <Header className="homePageComponentDescription pulseTextAnimation">{content.DESCRIPTION}</Header>
                    <Header className="homePageComponentTimer">{countdownValue}</Header>
                </Grid.Column>
            </Grid>
        </React.Fragment>
    );
};

export default HomePageComponent;