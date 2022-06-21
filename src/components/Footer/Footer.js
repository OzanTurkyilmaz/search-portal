import React from "react";
import Map from "./Map";
import "./Footer.scss";
import footerimage from "../../assets/footer-image.jpg";

export default function Footer() {
  return (
    <div className="footer">
      <img alt="footer img" className="footer__img" src={footerimage}></img>
      <div className="footer__container">
        <div className="footer__adress">
          <h3>İletişim</h3>
          <p>
            İletişim Adres: Çifte Havuzlar Mah. Eski Londra Asfaltı Cad. Kuluçka
            Merkezi D2 Blok No: 151/1F İç Kapı No: 2B03 Esenler/İstanbul
          </p>
        </div>
        <div className="footer__mail">
        Email: bilgi@tesodev.com
        </div>
      </div>
      <Map></Map>
    </div>
  );
}
