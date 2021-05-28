import {Divider, Grid, IconButton, makeStyles, Toolbar,} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import FolderIcon from "@material-ui/icons/Folder";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import PeopleIcon from "@material-ui/icons/People";
import WebIcon from '@material-ui/icons/Web';
import AssessmentIcon from '@material-ui/icons/Assessment';
import Users from "./Users";
import {
    employeesDomainUrl,
    requestHeaderWithoutBodyAfterAuthentication,
    suppliersDomainUrl,
} from "../../components/requestHeaders";
import {useSelector} from "react-redux";
import Purchases from "./Purchases";
import Requests from "./Requests";
import SolicitationManagement from "./SolicitationManagement";

const useStylesIndex = makeStyles((theme) => ({
    navigationArea: {
        minHeight: "100vh",
        // position: "absolute",
        // left: "0px",
        width: "12vw",
        backgroundColor: "white",
    },
    dashboardArea: {
        minHeight: "100vh",
        minWidth: "100%",
        color: "white",
        marginTop: "5vh",
    },
    toolBar: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "9vh",
    },
    menuIconStyle: {
        marginBottom: theme.spacing(4),
    },
    otherIconStyle: {
        marginBottom: theme.spacing(1),
    },
    backgroundStyle: {
        // backgroundColor: "green",
    },
}));

function Index() {
    const classes = useStylesIndex();
    const token = useSelector((state) => state.token);
    const [employees, setEmployees] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [departmentHeads, setDepartmentHeads] = useState([]);
    const [selectedTab, setSelectedTab] = useState(0);

    const handleClick = (value) => {
        setSelectedTab(value);
    };

    const fetchEmployees = async (url) => {
        try {
            const response = await fetch(
                url,
                requestHeaderWithoutBodyAfterAuthentication(token)
            );
            const result = await response.json();
            setEmployees(result);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchSuppliers = async (url) => {
        try {
            const response = await fetch(
                url,
                requestHeaderWithoutBodyAfterAuthentication(token)
            );
            const result = await response.json();
            setSuppliers(result);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchEmployees(employeesDomainUrl);
        fetchSuppliers(suppliersDomainUrl);
        // fetchDepartmentHeads(departmentHeadsUrl);
    }, []);

    return (
        <Grid container>
            <Grid item xs={2} sm={1} className={`${classes.navigationArea}`}>
                <Toolbar className={classes.toolBar}>
                    <IconButton className={classes.menuIconStyle} title="menu">
                        <MenuOpenIcon fontSize="large"/>
                    </IconButton>
                    <Divider/>

                    <IconButton
                        className={classes.otherIconStyle}
                        onClick={() => handleClick(0)}
                        title="Purchases"
                    >
                        <ShoppingBasketIcon/>
                    </IconButton>
                    <IconButton
                        className={classes.otherIconStyle}
                        onClick={() => handleClick(1)}
                        title="Requests"
                        dividers
                    >
                        <FolderIcon/>
                    </IconButton>
                    <IconButton
                        className={classes.otherIconStyle}
                        onClick={() => handleClick(2)}
                        title="Order Management"
                    >
                        <WebIcon/>
                    </IconButton>

                    <IconButton
                        className={classes.otherIconStyle}
                        onClick={() => handleClick(3)}
                        title="Reports"
                    >
                        <AssessmentIcon/>
                    </IconButton>
                    <IconButton
                        className={classes.otherIconStyle}
                        onClick={() => handleClick(4)}
                        title="Users"
                    >
                        <PeopleIcon/>
                    </IconButton>

                </Toolbar>
            </Grid>
            <Grid item xs={10} sm={11} className={classes.backgroundStyle}>
                {selectedTab === 0 && <Purchases/>}
                {selectedTab === 1 && <Requests/>}
                {selectedTab === 2 && <SolicitationManagement/>}
                {selectedTab === 4 && (
                    <Users
                        employees={employees}
                        setEmployees={setEmployees}
                        suppliers={suppliers}
                        setSuppliers={setSuppliers}
                        departmentHeads={departmentHeads}
                        setDepartmentHeads={setDepartmentHeads}
                        customClass={classes}
                    />
                )}
            </Grid>
        </Grid>
    );
}

export default Index;
