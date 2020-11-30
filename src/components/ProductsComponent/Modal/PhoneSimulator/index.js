import React, { useState, useEffect } from 'react';
import "./styles.scss";
import content from "./content";
import { Grid, Icon, Image } from "semantic-ui-react";

const PhoneSimulator = ({
    dialNumber,
    setDialNumber,
    isExpanded,
    isVisible,
    isCalling,
    setIsCalling,
    isDarkMode,
    specifications,
    make,
    model
}) => {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}));

    useEffect(() => {
        let minuteTimer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}));
        }, 60000);
        return () => clearInterval(minuteTimer);
    }, [])

    const { width, height } = specifications;

    let customComponentCN;
    let customContentContainerCN;
    let customDetailsHeaderCN;
    let customCardHeaderCN;
    let customCardContentCN;
    let customDefaultButtonContainerCN;
    switch (model) {
        case "iPhone SE":
            customContentContainerCN = "iPhoneSEContentContainer";
            break;
        case "OnePlus":
            customComponentCN = "onePlusComponent"
            customContentContainerCN = "onePlusContentContainer";
            customDetailsHeaderCN = "onePlusDetailsHeader";
            customCardHeaderCN = "onePlusCardHeader";
            customCardContentCN = "onePlusCardContent";
            customDefaultButtonContainerCN = "onePlusDefaultButtonContainer";
            break;
        case "Galaxy S20 FE 5G":
            customComponentCN = "onePlusComponent"
            customContentContainerCN = "onePlusContentContainer";
            customDetailsHeaderCN = "onePlusDetailsHeader";
            customCardHeaderCN = "onePlusCardHeader";
            customCardContentCN = "onePlusCardContent";
            customDefaultButtonContainerCN = "onePlusDefaultButtonContainer";
            break;
        case "Galaxy Note20 Ultra 5G":
            customComponentCN = "onePlusComponent galaxyNote20Component"
            customContentContainerCN = "onePlusContentContainer galaxyNote20ContentContainer";
            customDetailsHeaderCN = "onePlusDetailsHeader";
            customCardHeaderCN = "onePlusCardHeader";
            customCardContentCN = "onePlusCardContent";
            customDefaultButtonContainerCN = "onePlusDefaultButtonContainer";
            break;
        case "VELVETÔäó 5G":
            customComponentCN = "onePlusComponent lGComponent"
            customContentContainerCN = "onePlusContentContainer lGContentContainer";
            customDetailsHeaderCN = "onePlusDetailsHeader";
            customCardHeaderCN = "onePlusCardHeader";
            customCardContentCN = "onePlusCardContent";
            customDefaultButtonContainerCN = "onePlusDefaultButtonContainer";
            break;
        default:
            break;
    }
    let darkMode = isDarkMode ? "darkMode" : "lightMode";
    
    return (
        <div className={`phoneSimulatorComponent ${customComponentCN}`} style={isExpanded ? { width, height } : { width }}>
            <div 
                className={`phoneSimulatorContentContainer ${customContentContainerCN} ${darkMode}`} 
                style={{ opacity: isVisible ? 1 : 0 }}
            >
                <div className={`phoneDetailsHeader ${customDetailsHeaderCN}`}>
                    <div className="serviceInfoLabel">{content.TMO_SERVICE_LABEL}</div>
                    <div className="timeLabel">{currentTime}</div>
                    <div className="batteryPercentageLabel">{content.BATTERY_PERCENTAGE_LABEL}</div>
                </div>
                <div className={`cardHeader ${customCardHeaderCN}`}>
                    {dialNumber.length > 0 && (
                        <React.Fragment>
                            <span className="dialNumberContentContainer">{dialNumber}</span>
                            {make === "Apple" && <span className="addNumberLabel">{content.ADD_NUMBER_LABEL}</span>}
                        </React.Fragment>
                    )}
                </div>
                <Grid className={`cardContent ${customCardContentCN}`} columns={3}>
                    {content.NUMPAD.map((VALUES_ARRAY, i) => 
                        <Grid.Row className="cardRow" key={i}>
                            {VALUES_ARRAY.map(({ NUMBER, LETTERS }, i) => 
                                <Grid.Column className="cardColumn" key={i}>
                                    <div 
                                        onClick={() => setDialNumber(dialNumber + NUMBER.toString())}
                                        className={`defaultButtonContainer ${customDefaultButtonContainerCN}`}
                                    >
                                        <div className="defaultButtonLabel">
                                            {NUMBER}
                                            <div style={{ fontSize: ".35em" }}>
                                                {LETTERS ? LETTERS : !["*", "#"].includes(NUMBER) && <span>&nbsp;</span>}
                                            </div>
                                        </div>
                                    </div>
                                </Grid.Column>
                            )}
                        </Grid.Row>
                    )}
                    <Grid.Row className="cardRow">
                        {["", "", ""].map((_, i) =>                     
                            <Grid.Column className="cardColumn" key={i}>
                                {i === 1 && (isCalling ?                                         
                                    <div onClick={() => setIsCalling(false)} className="defaultButtonContainer" >                                      
                                        <Image className="endCallIcon" size="medium" src={`${process.env.PUBLIC_URL}/img/end_call.png`} />
                                    </div> 
                                    :
                                    <a 
                                        onClick={() => setIsCalling(true)}
                                        href={`tel:+${dialNumber}`}
                                        className="defaultButtonContainer" 
                                        style={{ background: "green" }}
                                    >                                        
                                            <div className="defaultButtonLabel" style={{ lineHeight: 1, fontSize: "1.5em" }}>
                                                <Icon name="call" style={{ margin: 0, color: "#fff" }} />
                                            </div>
                                    </a>
                                )}
                                {i !== 1 && (
                                    <div className="defaultButtonContainer" style={{ background: "transparent", cursor: i === 2 ? "pointer" : "default"}}>
                                        {i === 2 && dialNumber.length > 0 && (
                                            <div 
                                                onClick={() => setDialNumber(dialNumber ? dialNumber.slice(0, -1) : "")}
                                                className="defaultButtonLabel activeOpacityControl"
                                                style={{ background: "transparent", fontSize: "1.25em", lineHeight: 1 }}
                                            >
                                                <div className="customDeleteButtonBackground"></div>
                                                <Image className="deleteButton" size="tiny" src={`${process.env.PUBLIC_URL}/img/delete_light.png`} />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </Grid.Column>
                        )}
                    </Grid.Row>
                </Grid>
            </div>
        </div>
    )
}

export default PhoneSimulator;