import React ,{useRef} from "react";
import "../Styles/Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {


  
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};
  

      
	return (
		<header >
			<h3>Smart Keyring</h3>
			<nav ref={navRef}>
				<a href="#home" onClick={showNavbar} className="item">Home</a>
				<a href="#firstaid" onClick={showNavbar} className="item">First aid</a>
				<a href="/profile" onClick={showNavbar} className="item">Profile</a>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button className="nav-btn" onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Navbar;