import React, {useState} from 'react';
import useForm from 'react-hook-form'

import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function (...pros) {
    var prosData1 = pros[0];
    var prosData = prosData1[0];
    console.log("...",prosData.name);
    const useStyles = makeStyles(theme => ({
        root: {
            height: '100vh',
        },
        button: {
            backgroundColor: "#7897f4",
        },
        image: {
            backgroundImage: 'url(https://images.unsplash.com/photo-1462396240927-52058a6a84ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80)',
            backgroundRepeat: 'no-repeat',
            backgroundColor:
                theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        },
        paper: {
            margin: theme.spacing(2, 2),
            // display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(3, 2),
            //backgroundColor: theme.palette.secondary.main,
            width: '100%',
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
            backgroundColor: "#7897f4",
            width: '100%',
        },
        hidden: {
            visibility: 'hidden',
        },
        red: {
            color: 'red',
        },
    }));





    const { handleSubmit, reset} = useForm();


    const classes = useStyles();



    const onSubmit = data => {
        axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        axios.post(process.env.REACT_APP_BACKEND_URL +'/issueQuery', data).then(data => {
            console.log(data.data);
            setIssuesData(data.data);
            setIssuesDataFlag(true);
        });
    };


    function clickdelete(row) {
        console.log(" delete  " + row);

        axios.post(process.env.REACT_APP_BACKEND_URL +'/delete', row.valueOf(), {headers: {"Content-Type": "text/plain"}}).then(data => {

            getMyIssues();
            setIssuesDataFlag(true);
        });

    }

    function clickApproved(row) {
        console.log(" Approved  " + row);
        axios.post(process.env.REACT_APP_BACKEND_URL + '/approved', row.valueOf(), {headers: {"Content-Type": "text/plain"}}).then(data => {

            getMyIssues();
            setIssuesDataFlag(true);
        });

    }

    function clickDiapproved(row) {
        console.log(" clickDiapproved  " + row);

        axios.post(process.env.REACT_APP_BACKEND_URL + '/clickDiapproved', row.valueOf(), {headers: {"Content-Type": "text/plain"}}).then(data => {

            getMyIssues();
            setIssuesDataFlag(true);
        });

    }

    const [issues, setIssuesData] = useState(null);
    const [getIssuesDataFlag, setIssuesDataFlag] = useState(false);



    const getMyIssues = () => {

        let temp1 = prosData.name;
        console.log("Temp " + temp1);
        axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.post['Content-Type'] = 'application/x-wwnw-form-urlencoded';
        var data =
            axios.post(process.env.REACT_APP_BACKEND_URL + '/getApplication', temp1.valueOf(), {headers: {"Content-Type": "text/plain"}}).then(data => {

                console.log('---------------------------------------------------------------------------------------------------------');
                console.log(data.data);
                setIssuesData(data.data);
                setIssuesDataFlag(true);
            });
    };


    return (


        <form onSubmit={handleSubmit(onSubmit)}>

            <div className={classes.paper}>

                {prosData.name !== "admin" &&

                <Button variant="outlined" color="primary" href="#outlined-buttons" onClick={() => getMyIssues()}
                        color="primary">

                    ?????? ???? ?????????????? ?????? ????????????
                </Button>
                }

                {prosData.name === "admin" &&

                <Button variant="outlined" color="primary" href="#outlined-buttons" onClick={() => getMyIssues()}
                        color="primary">

                    ?????? ???? ??????????????  ????????????
                </Button>
                }


            </div>

            {getIssuesDataFlag === true &&
            <div>

                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>??????????</b></TableCell>
                            <TableCell><b>??????????????</b></TableCell>
                            <TableCell><b>??????????????????</b></TableCell>
                            <TableCell><b>??????????????????</b></TableCell>


                            {/*{prosData.name === "admin" &&*/}
                            {/*<TableCell/> </TableCell>*/}
                            {/*<TableCell/>' </TableCell>*/}
                            {/*<TableCell/> </TableCell>*/}
                            {/*}*/}
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {issues.map(row => (
                            <TableRow key={row.city}>

                                <TableCell>
                                            {row.name}
                                </TableCell>

                                <TableCell>
                                            {row.surname}
                                </TableCell>

                                <TableCell>
                                            {row.select}</TableCell>
                                <TableCell>
                                            {row.status}</TableCell>


                                {/*<TableCell>*/}

                                {/*            <button>*/}
                                {/*                <Link to={'/update/' + row.issueId + '/' + pros[0].name}>Update</Link>*/}
                                {/*            </button>*/}
                                {/*</TableCell>*/}

                                <TableCell>

                                    <Button  color="primary" className={classes.submit} type="button" id={row.id} onClick={(e) => {
                                        console.log("id" + row.id);

                                        if (window.confirm('?????????? ???????????????? ??????  ???????????? ???? ???????????????????? ?????? ????????????;')) clickdelete(row.id)
                                    }}>
                                        ????????????????
                                    </Button>
                                </TableCell>


                                {/*{prosData.name === "admin" &&*/}

                                {/*<TableCell>*/}

                                {/*    <Button className={classes.submit}  type="button" id={row.id} onClick={(e) => {*/}
                                {/*        console.log("id" + e.target.id);*/}
                                {/*        if (window.confirm('?????????? ???????????????? ??????  ???????????? ???? ???????????????? ???????? ?? ????????????;')) clickApproved(e.target.id)*/}
                                {/*    }}>*/}
                                {/*        ??????????????*/}
                                {/*    </Button>*/}
                                {/*</TableCell>*/}
                                {/*}*/}

                                {/*{prosData.name === "admin" &&*/}

                                {/*<TableCell>*/}

                                {/*    <Button  className={classes.submit} type="button" id={row.id} onClick={(e) => {*/}
                                {/*        console.log("id" + e.target.id);*/}
                                {/*        if (window.confirm('?????????? ???????????????? ??????  ???????????? ???? ???????????????????? ???????? ?? ????????????;')) clickDiapproved(e.target.id)*/}
                                {/*    }}>*/}
                                {/*        ????????????????*/}
                                {/*    </Button>*/}
                                {/*</TableCell>*/}
                                {/*}*/}

                                {prosData.name === "admin" &&

                                <TableCell>

                                    <Button className={classes.submit} primary={true} >
                                                    <Link to={'/viewDetails/' + row.id }>??????????????????????</Link>
                                                </Button>

                                </TableCell>
                                }


                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </div>
            }
        </form>

    );
}