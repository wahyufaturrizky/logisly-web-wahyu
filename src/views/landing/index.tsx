import React from "react";
import "./index.css";

const Views = ({ data, children }: any) => {
  return (
    <div className="landing-container-main">
      <div className="top-container-main">
        <div className="left-column">
          <picture className="lazyloaded">
            <source media={data?.image} />
            <source media={data?.image} />
            <img src={data?.image} alt={data?.p1} className="lazyloaded" />
          </picture>
        </div>
        <div className="right-column">
          <div className="right1">
            <a
              rel="noreferrer"
              href="http://www.bbc.co.uk/news/world/asia/india"
              target="_blank"
            >
              <h2 className="tile">'{data?.title}'</h2>
            </a>
            <p className="gs-c-promo-summary gel-long-primer gs-u-mt nw-c-promo-summary">
              {data?.p1}
            </p>
          </div>
          <div className="right2">
            {data?.author} | {data?.createdOn} | {data?.country}
          </div>
        </div>
      </div>
      <div className="content-paragraph">
        <p className="paragraph p2">{data?.p2}</p>
        <p className="paragraph p3">{data?.p3}</p>
        <p className="paragraph p4">{data?.p4}</p>
        <p className="paragraph p5">{data?.p5}</p>
        <h4 className="note">{data?.compareTabs}</h4>
      </div>
      {children}
    </div>
  );
};

export default Views;
