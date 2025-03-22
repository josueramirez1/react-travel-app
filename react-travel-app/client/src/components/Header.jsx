import logo from '../images/traventure-logo.png';
import avatar from '../images/profile-picture.png';
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div className="header-container">
                <div className="header-item-container">
                    <Link to={"/"}>
                        <img className="logo"
                             src={logo}
                             alt="Traventure Logo"/>
                    </Link>
                </div>
                <div className="header-item-container">
                    <p>Log Out</p>
                    <p>Language</p>
                    <img alt="user avatar" src={avatar} className={"avatar"}/>
                </div>
            </div>
        </header>
    )
}

export default Header;