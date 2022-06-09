import React, { useCallback, useEffect, useState } from "react";
import "./index.css";

const CityDetailsCard = ({
  cityDetails,
  closeAll,
}: {
  cityDetails: Array<[]>;
  closeAll: () => void;
}) => {
  const [stateMain, setStateMain] = useState<any>();

  const main = useCallback(() => {
    return setStateMain({ ...cityDetails });
  }, [cityDetails]);

  useEffect(() => {
    main();
  }, [main]);
  console.log("@stateMain", stateMain);

  return (
    <div className="catalog-card">
      <div className="card-wrapper">
        <div className="card__inner_catalog_top">
          <section className="inner_left_section">
            <div className="tag">
              <span onClick={closeAll} className="closeItem" title="close">
                x
              </span>
            </div>

            <div className="group">
              <h3 className="sub_title_header">CITY NAME :</h3>
              <h4 className="title_card titlename">{stateMain?.[0]?.name}</h4>
            </div>
            <div className="group">
              <h3 className="sub_title_header">AIR QUALITY:</h3>
              <h4 className="title_card titleaqi">{stateMain?.[0]?.aqi}</h4>
            </div>
            <div className="group cigg-group">
              <div className="group1">
                <h3 className="sub_title_header">NO OF CIGGERATES :</h3>
                <h4 className="title_card titlecigg">{stateMain?.[0]?.cigg}</h4>
              </div>
              <div className="group2"></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CityDetailsCard;
