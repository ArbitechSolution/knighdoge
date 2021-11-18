
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { useHistory } from "react-router-dom";
function Navbarr() {

    let history = useHistory();

    function home() {
        history.push("/");
    }
    function locking() {
        history.push("/locking");
    }
    function withoutlocking() {
        history.push("/without");
    }
    function help() {
        // history.push("/");
        try {
            document.getElementById('contacts').scrollIntoView();
            // window.open("https://arbitech-solutions.business.site/", '_blank');
            // window.open("https://arbitech-solutions.business.site/")
        } catch (error) {
            console.log("Error while connecting metamask", error);
            // alert("Error while connecting metamask");
        }
    }
    return (
        <SideNav
            onSelect={(selected) => {
                // Add your code here
            }}
            style={{
                position: "fixed",
                backgroundColor: "#222",
            }} >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="home">
                <NavItem eventKey="home" onClick={home}>
                    <NavIcon>
                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText >
                        {/* <li>
                            <Link to="/"> */}
                        Home
                        {/* </Link>
                        </li> */}
                    </NavText>
                </NavItem>
                {/* <NavItem eventKey="Locking" onClick={withoutlocking}>
                    <NavIcon>
                        <i className="fas fa-lock-alt" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Locking
                    </NavText>
                </NavItem> */}
                <NavItem eventKey="withoutLocking" onClick={locking}>
                    <NavIcon>
                        <i className="fas fa-lock-open-alt" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        {/* <li>
                            <Link to="/without"> */}
                        Without Locking
                        {/* </Link>
                        </li> */}
                    </NavText>
                </NavItem>
                <NavItem eventKey="help" onClick={help}>
                    <NavIcon>
                        {/* <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} /> */}
                        <i class="far fa-question-circle" style={{ fontSize: '1.9em' }} />
                    </NavIcon>
                    <NavText >
                        {/* <li>
                            <Link to="/"> */}
                        Help
                        {/* </Link>
                        </li> */}
                    </NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>

    );
}
export default Navbarr;




