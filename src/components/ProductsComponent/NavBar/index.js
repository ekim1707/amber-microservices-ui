import React from 'react'
import "./styles.scss";
import { Grid, Menu } from "semantic-ui-react";

const NavBar = ({ navBarArray, isSelected, setIsSelected }) => {
    return (
        <Grid columns={1}>
            <Menu className="navBarComponentMenu">
                {navBarArray.map((make, i) => 
                    <Menu.Item 
                        onClick={() => setIsSelected(make)}
                        className="navBarComponentMenuItem"
                        name={make}
                        active={isSelected === make}
                        key={i}
                    >
                        {make}
                    </Menu.Item>
                )}
            </Menu>
        </Grid>
    )
}

export default NavBar;