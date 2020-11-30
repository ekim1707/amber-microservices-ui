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

const AccessoriesComponent = ({
    accessoriesArray,
    activeIndexArray,
    handleClick
}) => {
    return (
        <Container className="accessoriesComponent">
            <Button.Group className="navButtonContainer" vertical labeled icon>
                {content.NAV_BUTTON_ARRAY.map(({ PATH, ICON, NAME }, i) => 
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
            <Header className="accessoriesComponentTitle" size="huge" textAlign="center">{content.TITLE}</Header>
            <Grid columns={1}>
                <Grid.Column>
                    <Card.Group centered>
                        {accessoriesArray.length === 0 ?
                        <Card className="accessoryCardContainer">
                            <Card.Header className="accessoryCardMakeLabel">{content.NOTHING_YET}</Card.Header>
                        </Card>
                        :
                        accessoriesArray.map(({ 
                            id, 
                            make, 
                            model, 
                            weight,
                            length,
                            width,
                            height,
                            rating,
                            fullPrice,
                            imageURL 
                        }, i) => 
                            <Card className="accessoryCardContainer" key={i}>
                                <Card.Header className="accessoryCardModelLabel">{model}</Card.Header>
                                <Image size="small" src={imageURL} wrapped style={{ margin: "auto"}} />
                                <Card.Header className="accessoryCardMakeLabel">{make}</Card.Header>
                                {[
                                    [content.CARD_CONTENT_LABEL_ARRAY[0], weight, content.CARD_CONTENT_LABEL_ARRAY[1]],
                                    [content.CARD_CONTENT_LABEL_ARRAY[2], length, content.CARD_CONTENT_LABEL_ARRAY[3]], 
                                    [content.CARD_CONTENT_LABEL_ARRAY[4], width, content.CARD_CONTENT_LABEL_ARRAY[5]], 
                                    [content.CARD_CONTENT_LABEL_ARRAY[6], height, content.CARD_CONTENT_LABEL_ARRAY[7]], 
                                    [content.CARD_CONTENT_LABEL_ARRAY[8], fullPrice, content.CARD_CONTENT_LABEL_ARRAY[9]]
                                ].map((valueArray, i) => i === 4 ?
                                    <Card.Content key={i}>{valueArray[0]}{valueArray[2]}<span>{valueArray[1]}</span></Card.Content> :
                                    <Card.Content key={i}>{valueArray[0]}<span>{valueArray[1]}&nbsp;{valueArray[2]}</span></Card.Content>
                                )}
                                <Card.Description className="accessoryCardDescriptionContainer">
                                    <Button 
                                        onClick={() => handleClick(i * 10, id)} 
                                        className="accessoryRatingButton"
                                        icon="thumbs down" 
                                        toggle 
                                        active={activeIndexArray.includes(i * 10)} 
                                    />
                                    <div className="accessoryRatingContainer">{rating}</div>
                                    <Button 
                                        onClick={() => handleClick(i === 0 ? i + 1 : i * 10 + 1, id)} 
                                        className="accessoryRatingButton"
                                        icon="thumbs up" 
                                        toggle 
                                        active={activeIndexArray.includes(i === 0 ? i + 1 : i * 10 + 1)}
                                    />
                                </Card.Description>
                                <div className="notAvailableBackground">{content.NOT_AVAILABLE_BACKGROUND_LABEL}</div>
                            </Card>
                        )}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Container>
    )
}

export default AccessoriesComponent;