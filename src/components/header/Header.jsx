import "./Header.css";
import Navigation from "../navbar/Navigation.jsx";

function Header() {
    return (
        <>
            <Navigation/>
            <div className="outer-container header">
                <header className="inner-container">
                    <div>
                        <h1 className="header-title">Todo App</h1>
                    </div>
                </header>
            </div>
        </>
    );
}

export default Header;
