import React, {useState} from 'react';
import useForm from 'react-hook-form';
import axios from 'axios';
import {makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import UserProfile from "./UserProfile";
import {pensionCategories,tameia,pension1Doc} from "./constants/reactSelectOptions"

export default function PostCreate(...pros) {
    const [open, setOpen] = React.useState(false);
    console.log("name");
    var prosData1 = pros[0];
    var prosData = prosData1[0];
    console.log(prosData.name)

    const resetForm = () => {
        reset();
    };

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
            margin: theme.spacing(3, 3),
            // display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            font: 20,
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
        hidden:{
            visibility: 'hidden',
        },
        red: {
            color: 'red',
        },


    }));

    const classes = useStyles();

    const [paroxi, setParoxi] = useState(null);

    const [todos, setTodos] = useState(null);
    const [users, setUsers] = useState('');
    const [getDataFlag, setFlagGetData] = useState(false);
    const [getUserDataFlag, setUserDataFlag] = useState(false);
    //const [open, setOpen] = React.useState(false);

    const [status, setStatus] = useState(null);
    const [getStatusDataFlag, setStatusDataFlag] = useState(false);

    const axios1 = require('axios');

    const handleClose = () => {
        setOpen(false);
    };

    const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
    const {register, handleSubmit, errors, reset} = useForm();
    const onSubmit = data => {
        console.log(
            data
            //http://httpbin.org/get
        );
        axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        axios.post(process.env.REACT_APP_BACKEND_URL +'/applicationCreate', data).then(data => {
            setOpen(true);
        });
    }

    console.log(errors);





    return (

        <form className={classes.paper} onSubmit={handleSubmit(onSubmit)}>

            <h5>?????????????????????? ???????????????? ???????????????? ?????????????? ?????????????????????????????? </h5>

            <Button type="submit" variant="outlined">????????????????????</Button>
            <Button type="button" variant="outlined" onClick={() => resetForm()} color="primary">
                ????????????????????
            </Button>


            <card>


            <div className={classes.red}>
                {errors.description && errors.description.message}
            </div>

            <input className={classes.avatar} type="text" placeholder="??????????" name="name" ref={register({
                required: '*'
            })} />
            </card>
            <div className={classes.red}>
                {errors.description && errors.description.message}
            </div>
            <input className={classes.avatar} type="text" placeholder="??????????????" name="surname" ref={register({
                required: '*'
            })} />
            <div className={classes.red}>
                {errors.description && errors.description.message}
            </div>
            <input className={classes.avatar} type="text" placeholder="????????" name="city"  ref={register({
                required: '*'
            })} />
            <div className={classes.red}>
                {errors.description && errors.description.message}
            </div>
            <input className={classes.avatar} type="text" placeholder="??????????"  name="area" ref={register({
                required: '*'
            })} />
            <div className={classes.red}>
                {errors.description && errors.description.message}
            </div>
            <input className={classes.avatar} type="text" placeholder="???????? " name="street" ref={register({
                required: '*'
            })} />
            <div className={classes.red}>
                {errors.description && errors.description.message}
            </div>
            <input className={classes.avatar} type="text" placeholder="??????????????" name="number"  ref={register({
                required: '*'
            })} />
            <div className={classes.red}>
                {errors.description && errors.description.message}
            </div>
            <input className={classes.avatar} type="text" placeholder="??????. ??????????????" name="post" ref={register({
                required: '*'
            })} />
            <div className={classes.red}>
                {errors.description && errors.description.message}
            </div>
            <input className={classes.avatar} type="text" placeholder="?????????????? ????????????????"  name="numberPhone" ref={register({
                required: '*'
            })} />
            <div className={classes.red}>
                {errors.description && errors.description.message}
            </div>
            <input className={classes.avatar} type="text" placeholder="Fax"  name="fax" ref={register({
                required: '*'
            })} />
            <div className={classes.red}>
                {errors.description && errors.description.message}
            </div>


            <input className={classes.avatar}   type="text" placeholder="email" defaultValue={ UserProfile.getName()}   name="email" ref={register({
                required: '*'
            })} />


            <input className={classes.avatar}   type="text" placeholder="iban"    name="iban" ref={register({
                required: '*'
            })} />

            <input className={classes.avatar}  hidden={true}  type="text" placeholder="status" defaultValue={ "????????????????????????????"}   name="status" ref={register({
                required: '*'
            })} />




            <div className={classes.red}>
                {errors.description && errors.description.message}
            </div>
            {/*{errors.descr && errors.descr.message}*/}
            <input className={classes.avatar} type="text" placeholder="??????????????????" name="descr"  ref={register({
                required: '*',
                // pattern: {
                //     value: /^[A-Z0-9._%+-]$/i,
                //     message: "invalid title"
                // }
            })}/>

            {getUserDataFlag === true &&
            <div>
                <b>Assignee </b> <div className={classes.red}>  {errors.assignee && errors.assignee.message} </div>
                <select className={classes.avatar} name="assignee" ref={register({
                    required: '*'
                })}>

                    {/*<option disabled selected value> -- select an option --</option>*/}
                    <option label=" "></option>
                    {users.map(user => (
                        < option value={user.userid}>{user.username}</option>
                    ))}
                </select>

            </div>

            }


            {getStatusDataFlag === true &&
            <div>

                <b>status</b> <div className={classes.red}> {errors.statusId && errors.statusId.message} </div>
                <select className={classes.avatar} name="statusId" ref={register({
                    required: '*'
                })}>
                    {/*<option disabled selected value> -- select an option --</option>*/}
                    <option label=" "></option>
                    {status.map(statusCur => (
                        < option value={statusCur.statusid}>{statusCur.statusDescription}</option>
                    ))}
                </select>
            </div>
            }

            <div className={classes.red}> {errors.type && errors.type.message} </div>
            <select className={classes.avatar}  onChange={event => setParoxi(event.target.value)}
                    name="select"  ref={register({
                required: '*'
            })}  >

                {pensionCategories.map(category => (

                    < option className="aaa"
                             value={category.value}>{category.label}</option>
                ))}



            </select>



            {paroxi === "?????????????? ???????? ??????????????" &&
                <div>

                    <div align={"right"}>

                        <label > ??????????????????                </label>

                    <input align="right" name="name"  type="file" ref={register({
                        required: '*'
                    })}/>
                    </div>

                    <div align={"right"}>

                        <label> ?????????????????????????? ????????????????     </label>

                    <input  name="name"  type="file" ref={register({
                        required: '*'
                    })}/>
                    </div>

                </div>
            }

            {paroxi === "?????????????? ???????? ??????????????????" &&
                <div>

                    <div align={"right"}>

                        <label > ??????????????????                </label>

                    <input name="name"  type="file" ref={register({
                        required: '*'
                    })}/>
                    </div>

                    <div align={"right"}>

                        <label> ?????????????????????????? ????????????????    </label>

                    <input name="name"  type="file" ref={register({
                        required: '*'
                    })}/>
                    </div>

                </div>
            }

            {paroxi === "?????????????? ??????????????" &&
                <div>

                    <div align={"right"}>

                        <label > ??????????????????                </label>

                    <input name="name"  type="file" ref={register({
                        required: '*'
                    })}/>
                    </div>

                    <div align={"right"}>

                        <label> ???????????????? ????????????           </label>

                    <input name="name"  type="file" ref={register({
                        required: '*'
                    })}/>
                    </div>

                    <div align={"right"}>

                        <label> ?????????????????????????? ????????????????    </label>

                    <input name="name"  type="file" ref={register({
                        required: '*'
                    })}/>
                    </div>

                </div>
            }

            <div className={classes.red}> {errors.type && errors.type.message} </div>
            <select className={classes.avatar}
                    name="selectTameio"  ref={register({
                required: '*'
            })}  >

                {tameia.map(category => (

                    < option className="aaa"
                             value={category.value}>{category.label}</option>
                ))}



            </select>


                    {/*<input className={classes.submit} type="submit" />*/}

                    <div>

                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"????????????"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    ?? ???????????? ????????????????????????!
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button type="button" onClick={handleClose} color="primary">
                                    Close
                                </Button>

                            </DialogActions>
                        </Dialog>

                    </div>

        </form>
);
}