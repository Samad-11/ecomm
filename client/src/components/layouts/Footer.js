import React from "react";
import { Link } from "react-router-dom";
import { TfiHome } from "react-icons/tfi";
import { BiLogoGmail } from "react-icons/bi";
import { BsTelephone } from "react-icons/bs";
import { FaFacebookF, FaXTwitter, FaWhatsapp } from "react-icons/fa6";
import { SiInstagram } from "react-icons/si";

const Footer = () => {
  return (
    <div>
      {/* Footer */}
      <footer
        className="text-center text-lg-start text-white"
        style={{ backgroundColor: "#45526e" }}
      >
        {/* Grid container */}
        <div className="container p-4 pb-0">
          {/* Section: Links */}
          <section className>
            {/*Grid row*/}
            <div className="row">
              {/* Grid column */}
              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold navbar-brand">
                  Ronics
                </h6>
                <p>
                  Here you can use rows and columns to organize your footer
                  content. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit.
                </p>
              </div>
              {/* Grid column */}
              <hr className="w-100 clearfix d-md-none" />
              {/* Grid column */}
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Products
                </h6>
                <p>
                  <Link className="text-white">MDBootstrap</Link>
                </p>
                <p>
                  <Link className="text-white">MDWordPress</Link>
                </p>
                <p>
                  <Link className="text-white">BrandFlow</Link>
                </p>
                <p>
                  <Link className="text-white">Bootstrap Angular</Link>
                </p>
              </div>
              {/* Grid column */}
              <hr className="w-100 clearfix d-md-none" />
              {/* Grid column */}
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Useful links
                </h6>
                <p>
                  <Link className="text-white" to={"/profile"}>
                    Your Account
                  </Link>
                </p>
                <p>
                  <Link className="text-white" to={"/about"}>
                    About
                  </Link>
                </p>
                <p>
                  <Link className="text-white" to={"/term"}>
                    Terms and Conditions
                  </Link>
                </p>
                <p>
                  <Link className="text-white" to={"/delivery"}>
                    Delivery Methods
                  </Link>
                </p>
              </div>
              {/* Grid column */}
              <hr className="w-100 clearfix d-md-none" />
              {/* Grid column */}
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Contact
                </h6>
                <p>
                  <TfiHome />
                  New Delhi, India
                </p>
                <p>
                  <BiLogoGmail /> info@gmail.com
                </p>
                <p>
                  <BsTelephone /> + 01 9988998899
                </p>
                <p>
                  <BsTelephone /> + 01 8899889988
                </p>
              </div>
              {/* Grid column */}
            </div>
            {/*Grid row*/}
          </section>
          {/* Section: Links */}
          <hr className="my-3" />
          {/* Section: Copyright */}
          <section className="p-3 pt-0">
            <div className="row d-flex align-items-center">
              {/* Grid column */}
              <div className="col-md-7 col-lg-8 text-center text-md-start">
                {/* Copyright */}
                <div className="p-3">
                  © 2020 Copyright:
                  <Link className="text-white" href="https://mdbootstrap.com/">
                    MDBootstrap.com
                  </Link>
                </div>
                {/* Copyright */}
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
                {/* Facebook */}
                <a
                  className="btn btn-outline-light btn-floating m-1"
                  role="button"
                  href="https://www.facebook.com"
                >
                  <FaFacebookF />
                </a>
                {/* Twitter */}
                <a
                  className="btn btn-outline-light btn-floating m-1"
                  role="button"
                  href="facebook.com"
                >
                  <FaXTwitter />
                </a>
                {/* Whatsapp */}
                <a
                  className="btn btn-outline-light btn-floating m-1"
                  role="button"
                  href="whatsapp.com"
                >
                  <FaWhatsapp />
                </a>
                {/* Instagram */}
                <a
                  className="btn btn-outline-light btn-floating m-1"
                  role="button"
                  href="facebook.com"
                >
                  <SiInstagram />
                </a>
              </div>
              {/* Grid column */}
            </div>
          </section>
          {/* Section: Copyright */}
        </div>
        {/* Grid container */}
      </footer>
    </div>
  );
};

export default Footer;
