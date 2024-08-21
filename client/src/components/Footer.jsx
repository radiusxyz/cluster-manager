import React from "react";
import { Link } from "./FooterStyles";
import { LinksContainer } from "../pages/RootLayoutStyles";

const Footer = () => {
  return (
    <LinksContainer>
      <Link>Docs</Link>
      <Link>Blog</Link>
      <Link>Report bug</Link>
      <Link>X</Link>
      <Link>Instagram</Link>
      <Link>YouTube</Link>
      <Link>LinkedIn</Link>
    </LinksContainer>
  );
};

export default Footer;
