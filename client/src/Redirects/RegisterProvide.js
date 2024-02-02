import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
/**
 * Register Provider that helps to redirect to profile page if the user is
 * already register
 * @param {Object} {user} get from state
 * @returns {JSX}
 */
const RegisterProvider = ({ user }) => {
    if (user) {
        return <Navigate to="/profile" />;
    } else {
        return <Outlet />;
    }
};
const mapStateToProps = (state) => {
    return { user: state.userReducer };
};
export default connect(mapStateToProps)(RegisterProvider);
