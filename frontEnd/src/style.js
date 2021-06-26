import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    button: {
        backgroundColor: "#7897f4",
    },
    image: {
        backgroundImage: 'url(https://cintra.co.uk/wp-content/uploads/2019/02/Pensions.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
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
}));

export default useStyles;