import React, { useContext, useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBBtn,
  MDBIcon,
  MDBNavbarNav,
  MDBInputGroup,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FaSignOutAlt } from "react-icons/fa";
import { shopItem } from "./Mainshop";
import { babyproducts } from "./Products";

const Navbar = () => {
  const [openNavNoTogglerSecond, setOpenNavNoTogglerSecond] = useState(false);
  const nav = useNavigate();
  // const {type} = useParams()
  const { login, setLogin, use, setUse, searched, setSearched } =
    useContext(shopItem);
  const inputSearch = (e) => {
    e.preventDefault();
    // let inputletters = 
    let inputWord = babyproducts.filter((item) =>
      item.type.toLowerCase().includes(e.target.value.toLowerCase())
    );
    if (inputWord.length>0) {
      setSearched(inputWord);
      nav("/shope");
    } else {
      setSearched([]);
    }
  };
  console.log(searched);

  // const inputSearch = (e) => {
  //   e.preventDefault();
  //   let inputWord = babyproducts.filter((item) =>
  //     item.productname.toLowerCase().includes(e.target.value.toLowerCase())
  //   );
  //   if (inputWord.length > 0) {
  //     setSearched(inputWord);
  //     nav("/shope");
  //   } else {
  //     setSearched([]);
  //   }
  // };





  const logout = () => {
    setUse(null);
    nav("/");
  };

  return (
    <>
      <div>
        <MDBNavbar expand="lg" light bgColor="light " fixed="top">
          <MDBContainer fluid>
            <MDBNavbarBrand>𝓑𝓪𝓑𝔂 𝓬𝓪𝓻𝓮</MDBNavbarBrand>
            <MDBNavbarToggler
              type="button"
              data-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => setOpenNavNoTogglerSecond(!openNavNoTogglerSecond)}
            >
              <MDBIcon icon="bars" fas />
            </MDBNavbarToggler>
            <MDBCollapse navbar open={openNavNoTogglerSecond}>
              <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
                <MDBNavbarItem>
                  <MDBNavbarLink
                    active
                    aria-current="page"
                    onClick={() => nav("/")}
                  >
                    Home
                  </MDBNavbarLink>
                </MDBNavbarItem>

                <MDBNavbarItem>
                  <MDBDropdown>
                    <MDBDropdownToggle
                      tag="a"
                      className="nav-link"
                      role="button"
                      onClick={() => nav("/shope")}
                    >
                      SHOPE
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem link onClick={() => nav("/shope")}>
                        ALL CATEGORY
                      </MDBDropdownItem>
                      <MDBDropdownItem link onClick={() => nav("/dress")}>
                        CLOTHS
                      </MDBDropdownItem>
                      <MDBDropdownItem link onClick={() => nav("/toys")}>
                        TOYS
                      </MDBDropdownItem>
                      <MDBDropdownItem
                        link
                        onClick={() => nav("/baby stroller")}
                      >
                        BABY STROLLER
                      </MDBDropdownItem>
                      <MDBDropdownItem link onClick={() => nav("/shoes")}>
                        BABY SHOES{" "}
                      </MDBDropdownItem>
                      <MDBDropdownItem link onClick={() => nav("/baby cycle")}>
                        BABY CYCLE
                      </MDBDropdownItem>
                      <MDBDropdownItem link onClick={() => nav("/baby care")}>
                        BABY CARE
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavbarItem>
              </MDBNavbarNav>
              <MDBInputGroup tag="form" className="d-flex w-auto mb-3">
                <input
                  onChange={inputSearch}
                  className="form-control"
                  placeholder="Type query"
                  aria-label="Search"
                  type="Search"
                />

                <FontAwesomeIcon
                  icon={faShoppingCart}
                  onClick={() => nav("/addtocart")}
                  style={{ marginLeft: "10px", padding: "10px" }}
                />
              </MDBInputGroup>
            </MDBCollapse>
          </MDBContainer>
          {!use ? (
                  <MDBBtn outline onClick={() => nav("/login")}>
                    LOGIN
                  </MDBBtn>
                ) : (
                  <>
                    <FaSignOutAlt onClick={logout} />
                    {use.username}
                  </>
                )}
        </MDBNavbar>
      </div>
    </>
  );
};

export default Navbar;








// import React, { useState } from "react";
// import { MDBNavbar, MDBContainer, MDBInputGroup } from "mdb-react-ui-kit";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

// import { babyproducts } from "./Products";

// const Navbar = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);

//   const handleSearch = (e) => {
//     const inputValue = e.target.value.toLowerCase();
//     setSearchTerm(inputValue);
//     const filteredProducts = babyproducts.filter(
//       (item) => item.productname.toLowerCase().includes(inputValue)
//     );
//     setSearchResults(filteredProducts);
//   };

//   return (
//     <MDBNavbar expand="lg" light bgColor="light" fixed="top">
//       <MDBContainer fluid>
//         <MDBInputGroup tag="form" className="d-flex w-auto mb-3">
//           <input
//             value={searchTerm}
//             onChange={handleSearch}
//             className="form-control"
//             placeholder="Type query"
//             aria-label="Search"
//             type="search"
//           />
//           <FontAwesomeIcon
//             icon={faShoppingCart}
//             onClick={() => console.log("Navigate to cart")}
//             style={{ marginLeft: "10px", padding: "10px" }}
//           />
//         </MDBInputGroup>
//         <div>
//           {searchResults.map((product) => (
//             <div key={product.id}>
//               <p>{product.productname}</p>
//               {/* Add more product information here if needed */}
//             </div>
//           ))}
//         </div>
//       </MDBContainer>
//     </MDBNavbar>
//   );
// };

// export default Navbar;
