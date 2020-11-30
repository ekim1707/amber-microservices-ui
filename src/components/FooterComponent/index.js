import React from 'react';
import "./styles.scss";
import content from "./content";
import { Segment } from "semantic-ui-react";

const FooterComponent = () => <Segment className="footerComponent">{content.DESCRIPTION}</Segment>;

export default FooterComponent;