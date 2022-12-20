import React from "react";
import Link from "next/link";

type Props = {};

function About({}: Props) {
  return (
    <>
      <Link href="/">Revenir accueil</Link>
      <div>About</div>
    </>
  );
}

export default About;
