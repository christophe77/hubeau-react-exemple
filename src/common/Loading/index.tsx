import makeStyles from "@mui/styles/makeStyles";
import CircularProgress from "@mui/material/CircularProgress";
const useStyles = makeStyles(() => ({
  loadingContainer: {
    width: "100%",
    textAlign: "center",
  },
}));
const Loading = () => {
  const classes = useStyles();
  return (
    <div className={classes.loadingContainer}>
      <CircularProgress color="info" />
    </div>
  );
};

export default Loading;
