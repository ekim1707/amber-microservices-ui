import React, { useState, useEffect } from 'react'
import "./styles.scss";
import content from "./content";
import {
    Button,
    Card,
    Header,
    Grid,
    Icon,
    Image,
    Confirm,
    Label,
    Divider
} from "semantic-ui-react";
import QRCode from "qrcode.react";
import PhoneSimulator from "./PhoneSimulator";
import { NavLink } from "react-router-dom";
import resources from "../../../environments/resources";

const Modal = ({
    productsArray,
    reviewsArray,
    clickedProductID,
    clickedProductIndex,
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
    const {
        make,
        model,
        memory,
        color,
        instock,
        fullPrice,
        imageUrl,
        width,
        length
    } = productsArray[clickedProductIndex];

    let productRatingTotal = 0;
    let count = 0;
    reviewsArray.forEach(review => {
        productRatingTotal += review.rating;
        count += 1;
    });
    let avgRating = productRatingTotal/count;

    const { confirmReviewCreate, confirmReviewDelete } = isConfirmOpen;

    const [cartCounter, setCartCounter] = useState(0);

    useEffect(() => {
        if (window.localStorage.getItem(clickedProductID) !== null) {
            setCartCounter(parseInt(window.localStorage.getItem(clickedProductID)));
        }
    }, [clickedProductID]);
    
    let qrCodeLink = 
        make === "Apple" ? "https://www.t-mobile.com/news/devices/iphone-12-series-5g" :
        make === "8T+5G" ? "https://www.t-mobile.com/news/devices/exclusive-oneplus-8t-5g" :
        make === "Samsung" ? "https://www.t-mobile.com/devices/new-samsung-galaxy-s20-5g-phones" :
        make === "LG" ? "https://www.theverge.com/2020/9/3/21295764/t-mobile-lg-velvet-mediatek-dimensity-1000-soc-processor-5g" : 
        "https://www.t-mobile.com/devices/5g-phones";
        
    const qrCodeImageSettings = {
        src: `${process.env.PUBLIC_URL}/img/tmo_logo_symbol.png`,
        x: null,
        y: null,
        height: 24,
        width: 24,
        excavate: true,
    }
    
    const [dialNumber, setDialNumber] = useState("");
    const [isClicked, setIsClicked] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isCalling, setIsCalling] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    
    const controlClickSimulator = () => {
        if (isClicked && !isDisabled) {
            setIsDisabled(true);
            setIsVisible(false);
            setTimeout(() => {                
                setIsExpanded(false);
                setTimeout(() => {
                    setIsClicked(false);
                    setDialNumber("");
                    setIsDisabled(false);
                }, 2000);
            }, 1000);
        }
        if (!isClicked && !isDisabled) {
            setIsDisabled(true);
            setIsClicked(true);
            setTimeout(() => {
                setIsExpanded(true);
                setTimeout(() => {
                    setIsVisible(true);
                    setIsDisabled(false);
                }, 2000);
            }, 1000);  
        }
    }
    
    const specifications = { width: `${width * 80}px`, height: `${length * 80}px` };
    
    let isRatingValid = ["1", "2", "3", "4", "5"].includes(createFormData.rating);
    
    return (
        <div className="modalComponent">
            <Card className="modalContentContainer">
                <div className="mainHeaderContainer">
                    <div className="headerLogoContainer"><Image size="small" src={`${process.env.PUBLIC_URL}/img/tmo_logo_primary.png`} wrapped /></div>
                    <Header size="huge" className="mainTitle">{make}</Header>
                    <Button.Group className="buttonContainer">
                        <Button 
                            onClick={() => controlClickSimulator()} 
                            className="headerButton"
                            icon={{ name: "mobile alternate", size: "large" }}
                            toggle
                            active={isClicked}
                        />
                        <Button 
                            onClick={() => handleFormActionsClick(null, null, "close")} 
                            className="headerButton"
                            icon={{ name: "close", size: "large" }}
                        />
                    </Button.Group>
                </div>
                <Card.Content className="productDetailsContainer">
                    <Grid>
                        <Grid.Row className="productDetailsRow">
                            <Grid.Column width={isClicked ? 8 : 11} className="productImageColumn">
                                <div className="productImageContainer">
                                    {content.PRODUCT_IMAGE_BUTTON_ARRAY.map((ICON, i) =>
                                        <div className={`productImageRotateButtonContainer${i}`} key={i}>
                                            <Icon size="big" name={`angle ${ICON}`} style={{ color: "#ffbf00"}} />
                                        </div>
                                    )}
                                    <Image 
                                        size="medium"
                                        className="productImage"
                                        src={imageUrl} 
                                        wrapped 
                                    />
                                </div>
                            </Grid.Column>
                            <Grid.Column width={isClicked ? 5 : 5} className="productSpecificationsColumn">
                                <div className="productSpecificationsContainer">
                                <Header className="modelLabel">{model}</Header>
                                <Header size="big">{content.AVERAGE_RATING_LABEL}<span>{avgRating ? Math.round(avgRating*2)/2 : "..."}</span></Header>
                                <Header size="big">{content.MEMORY_LABEL}<span>{memory}</span></Header>
                                <Header size="big">{content.COLOR_LABEL}<span>{color}</span></Header>
                                <Header size="big">{content.IN_STOCK_LABEL}<span>{instock ? "True" : "False"}</span></Header>
                                <Header size="big">{content.PRICE_LABEL}<span style={{ color: "#85bb65" }}>{`$${fullPrice}`}</span></Header>
                                <Button.Group>
                                    <Button 
                                        onClick={() => {
                                            window.localStorage.setItem(clickedProductID.toString(), cartCounter + 1);
                                            setCartCounter(cartCounter + 1);
                                        }}
                                        className="cartToggleButton"
                                        icon={{ name: "arrow up", size: "large" }}
                                    />
                                    <NavLink to={resources.routes.shoppingCartPath}>
                                        <Button className="goToCartButton" animated>
                                            <Button.Content visible>
                                                <Header size="medium" style={{ color: "rgba(0,0,0,.6)" }}>{cartCounter ? cartCounter : 0}</Header>
                                            </Button.Content>
                                            <Button.Content hidden style={{ color: "#fff" }}>{content.GO_TO_CART_LABEL}</Button.Content>
                                        </Button>
                                    </NavLink>
                                    <Button 
                                        onClick={() => {
                                            window.localStorage.setItem(clickedProductID.toString(), cartCounter - 1);
                                            setCartCounter(cartCounter - 1);
                                        }}
                                        className="cartToggleButton"
                                        icon={{ name: "arrow down", size: "large" }}
                                        disabled={cartCounter < 1 ? true : false}
                                    />
                                </Button.Group>
                                <div className="qrCodeContainer">
                                    <a 
                                        className="tmoLink"
                                        href={qrCodeLink}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        {content.QRCODE_LABEL}
                                    </a>
                                    <label>{content.OR_LABEL}</label>
                                    <QRCode 
                                        value={qrCodeLink}
                                        className="qrCode"
                                        bgColor="#ffffff"
                                        fgColor="#000000"
                                        level="L"
                                        includeMargin={false}
                                        renderAs="svg"
                                        imageSettings={qrCodeImageSettings}
                                    />
                                </div>
                                <Button 
                                    onClick={() => setIsDarkMode(!isDarkMode)}
                                    className={isDarkMode ? "lightModeToggleButton" : "darkModeToggleButton"}
                                    icon={isDarkMode ? "lightbulb outline" : "lightbulb"} 
                                    style={isVisible ? { opacity: 1 } : { opacity: 0 }}
                                />
                                </div>
                            </Grid.Column>
                            <Grid.Column className="phoneSimulatorColumn" style={{ width: isClicked ? "250px" : 0}}>
                                <PhoneSimulator 
                                    dialNumber={dialNumber}
                                    setDialNumber={setDialNumber}
                                    isExpanded={isExpanded} 
                                    isVisible={isVisible}
                                    isCalling={isCalling}
                                    setIsCalling={setIsCalling}
                                    isDarkMode={isDarkMode}
                                    specifications={specifications} 
                                    make={make}
                                    model={model}
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={1}>
                            <Grid.Column className="reviewsLargeContainer">
                                <div className="reviewsLabelContainer">
                                    <Header className="reviewsLabel">{content.REVIEWS_LABEL}</Header>
                                    {isCreateOpen ?
                                        <Button.Group>
                                            <Button 
                                                onClick={() => setIsConfirmOpen({ ...isConfirmOpen, confirmReviewCreate: true })}
                                                icon="check"
                                                disabled={
                                                    createFormData.title.length === 0 ||
                                                    !isRatingValid ||
                                                    createFormData.review.length === 0
                                                }
                                            />
                                            <Button onClick={() => setIsCreateOpen(!isCreateOpen)} icon="window minimize" />
                                        </Button.Group> : 
                                        <Button onClick={() => setIsCreateOpen(!isCreateOpen)} icon="add" />
                                    }
                                    <Confirm 
                                        open={confirmReviewCreate} 
                                        onCancel={() => setIsConfirmOpen({ ...isConfirmOpen, confirmReviewCreate: false })}
                                        onConfirm={() => handleFormActionsClick(null, null, "create")}
                                    />
                                </div>
                                {isCreateOpen && (
                                    <React.Fragment>
                                        <Card className="createFormContainer">
                                            <Card.Header className="createFormTitleContainer" style={{ background: createFormData.title.length > 0 ? "#ffbf0080" : "#f97c7c9a" }}>
                                                <Label color="green" horizontal>{content.TITLE_LABEL}</Label>
                                                <input 
                                                    id="title"
                                                    onChange={(e) => handleOnChange(e)}
                                                    className="createFormTitleInput"
                                                    value={createFormData.title}
                                                />
                                            </Card.Header>
                                            <Card.Content className="createFormRatingContainer">
                                                <Label style={{ background: "#ea0a8e", color: "#fff" }} horizontal>{content.RATING_LABEL}</Label>
                                                <input 
                                                    id="rating"
                                                    onChange={(e) => handleOnChange(e)}
                                                    className="createFormRatingInput"
                                                    value={createFormData.rating}
                                                    style={{ color: isRatingValid ? "#ffbf00" : "red" }}
                                                />
                                            </Card.Content>
                                            <Card.Description className="createFormReviewContainer">
                                                <textarea 
                                                    id="review"
                                                    onChange={(e) => handleOnChange(e)}
                                                    className="createFormReviewInput"
                                                    value={createFormData.review}
                                                    style={{ background: createFormData.review.length > 0 ? "transparent" : "#f97c7c9a" }} 
                                                />
                                            </Card.Description>
                                        </Card>
                                        <Divider />
                                    </React.Fragment>
                                )}
                                {reviewsArray.map((data, i) => 
                                    {
                                        const {
                                            title,
                                            rating,
                                            review,
                                            can_delete
                                        } = data;
                                        
                                        return <Card className="reviewContainer" style={{ boxShadow: i === isActive ? "0px 1px 6px #000000" : "" }} key={i}>
                                            <Card.Header className="reviewTitleContainer">
                                                <textarea
                                                    type="text"
                                                    ref={titlesRefsArray[i]}
                                                    className="reviewTitleTextArea"
                                                    disabled={isActive || isActive === 0 ? i === isActive ? false : true : true}
                                                    rows={1}
                                                >
                                                    {title}
                                                </textarea>
                                                <Button.Group className="reviewButtonContainer">
                                                    <div 
                                                        onClick={() => handleFormActionsClick(i, data, "edit", !isNotEditable)} 
                                                        className="reviewEditToggleButtonContainer"                                                         
                                                        style={{ opacity: i === isActive ? 1 : .7, transition: "opacity 1.5s" }} 
                                                    >
                                                        <Label style={{ padding: 0, background: "transparent", color: "#00000099" }}>{content.EDIT_LABEL}</Label>
                                                        <div className="reviewEditToggleButton">
                                                            <div className={i === isActive ? "reviewEditToggleCircleRight" : "reviewEditToggleCircleLeft"}></div>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        onClick={() => setIsConfirmOpen({ ...isConfirmOpen, confirmReviewDelete: true })}
                                                        icon="trash"
                                                        disabled={!can_delete}
                                                    />
                                                    <Confirm 
                                                        open={confirmReviewDelete} 
                                                        onCancel={() => setIsConfirmOpen({ ...isConfirmOpen, confirmReviewDelete: false })}
                                                        onConfirm={() => handleFormActionsClick(i, data, "delete")}
                                                    />
                                                </Button.Group>
                                            </Card.Header>
                                            <Card.Content className="reviewRatingContainer">
                                                <Label style={{ background: "#ea0a8e", color: "#fff" }} horizontal>{content.RATING_LABEL}</Label>
                                                <textarea 
                                                    type="text"
                                                    ref={ratingsRefsArray[i]}
                                                    className="reviewRatingTextArea"
                                                    disabled={isActive || isActive === 0 ? i === isActive ? false : true : true}
                                                    rows={1}
                                                >
                                                    {rating}
                                                </textarea>
                                            </Card.Content>
                                            <Card.Description className="reviewDescriptionContainer">
                                                <textarea 
                                                    type="text"
                                                    ref={reviewsRefsArray[i]}
                                                    className="reviewDescriptionTextArea"
                                                    disabled={isActive || isActive === 0 ? i === isActive ? false : true : true}
                                                >
                                                    {review}
                                                </textarea>
                                            </Card.Description>
                                        </Card>;
                                    }
                                )}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Card.Content>
            </Card>
        </div>
    )
}

export default Modal;