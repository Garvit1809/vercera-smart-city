import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Section = styled.div`
border: 1px solid red;
display: flex;
align-items: center;
justify-content: space-between;
`

const Menu = styled.ul`
border: 1px solid red;
list-style: none;
display: flex;
align-items: center;
justify-content: space-between;
`

const MenuItem = styled.li`
border: 1px solid red;
margin: 0 1rem;
`

const Navbar = () => {
    return (
        <Section>
        <Link to="/" >
            <h2>CityTogether</h2>
        </Link>
            <Menu>
                <MenuItem>
                    <Link to="/issues" >
                        Issues
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link to="/pending" >
                        Pending
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link to="/completed" >
                        Completed
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link to="/notifications" >
                        Notifications
                    </Link>
                </MenuItem>
            </Menu>
        </Section>
    )
}

export default Navbar