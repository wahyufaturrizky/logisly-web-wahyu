import React, { useCallback, useEffect, useRef, useState } from "react";
import "./styles/app.css";
import Logo from "./assets/icons/bbc.logo.svg";
import Button from "./components/Button";
import AmericaFlag from "./assets/flag/united-states-of-america.png";
import HindiFlag from "./assets/flag/india.png";
import Views from "./views/landing";
import Search from "./components/Search";
import Help from "./components/Help";
import CityDetailsCard from "./components/CityDetailsCard";
import Footer from "./components/Footer";
import { convertToArray, getParagraphs } from "./helpers";
import EnglishJsonData from "./data/english.json";
import HindiJsonData from "./data/hindi.json";
import customJson from "./data/customlang.json";

const App = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [detailsOn, setDetailsOn] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  let currentActive = useRef<any>();
  const [language, setLanguage] = useState<string>("ENGLISH");
  const [inputText, setInputText] = useState<any>("");
  const [cityDetails, setCityDetails] = useState<any>([
    { name: "", aqi: "", cigg: "" },
  ]);
  const [hive, setHive] = useState<any>();

  const reset = () => {
    setCityDetails([{ name: "", aqi: "", cigg: "" }]);
    setDetailsOn(false);
    setIsOpen(false);
    currentActive.current = 0;
    setInputText("");
  };

  const loaderTimer = (lang: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLanguage(lang);
      reset();
    }, 2000);
  };

  const changeLanguage = (event: any) => {
    console.log("@event", event);

    switch (event?.Name) {
      case "english":
        loaderTimer("ENGLISH");
        break;
      case "hindi":
        loaderTimer("HINDI");
        break;
      default:
        break;
    }
  };

  const resetCurrentActive = () => {
    currentActive.current = 0;
  };

  const isEnglish = useCallback(() => {
    if (language === "ENGLISH") {
      return true;
    } else {
      return false;
    }
  }, [language]);

  const list = useCallback(() => {
    const listFunction = isEnglish()
      ? convertToArray(EnglishJsonData)
      : !isEnglish()
      ? convertToArray(HindiJsonData)
      : convertToArray(EnglishJsonData);

    return listFunction;
  }, [isEnglish]);

  const search = useCallback(() => {
    let tempList = list();

    const maped =
      inputText?.length > 0
        ? tempList.filter((e: any) => {
            return e?.name?.toLowerCase().includes(inputText?.toLowerCase());
          })
        : [];

    return maped;
  }, [inputText, list]);

  const getCityDetails = (text: any) => {
    let tempList = list();
    let tempCityDetails = null;
    tempCityDetails = tempList.filter((city: any) => {
      return city?.name?.toLowerCase().includes(text?.toLowerCase());
    });

    setCityDetails(tempCityDetails);
    setDetailsOn(true);
  };

  const addAndClose = (event: any) => {
    setInputText(event);
    setIsOpen(false);
    resetCurrentActive();
    getCityDetails(event);
  };

  const moveCursor = (event: any) => {
    let tempSearch = search();
    let tempAndClose = tempSearch && tempSearch[currentActive.current];
    switch (event.type) {
      case "UP":
        if (currentActive.current === 0) {
          currentActive.current = tempSearch?.length - 1;
        } else {
          currentActive.current = currentActive.current--;
        }
        break;
      case "DOWN":
        if (currentActive.current === tempSearch?.length - 1) {
          resetCurrentActive();
        } else {
          currentActive.current = currentActive.current++;
        }
        break;
      case "ENTER":
        addAndClose(tempAndClose);
        break;

      default:
        break;
    }
  };

  const handleInput = (event: any) => {
    setIsOpen(true);
    setInputText(event.newValue);
    resetCurrentActive();
  };

  const data = useCallback(() => {
    const dataFunction = isEnglish()
      ? EnglishJsonData
      : !isEnglish()
      ? HindiJsonData
      : EnglishJsonData;

    return dataFunction;
  }, [isEnglish]);

  const handleHive = useCallback(() => {
    let tempData = data();

    const paragraphs = getParagraphs(tempData);
    setHive({
      ...paragraphs,
      compareTabs: tempData["compare-tabs_1_method"],
      image: tempData["hero_1_image"],
      placeholder: tempData["compare-tabs_1_title"],
      title: tempData["hero_1_title"],
      author: tempData["article-info_1_byline"],
      createdOn: tempData["article-info_1_date"],
      country: tempData["article-info_1_category"],
      articleUrl: tempData["article-info_1_category_url"],
    });
  }, [data]);

  const closeAll = () => {
    setDetailsOn(false);
    setCityDetails([{ name: "", aqi: "", cigg: "" }]);
  };

  const addClose = (e: any) => {
    addAndClose(e);
  };

  const warning = useCallback(() => {
    return isEnglish()
      ? customJson.placeholder.english
      : customJson.placeholder.hindi;
  }, [isEnglish]);

  useEffect(() => {
    list();
    handleHive();
    data();
    search();
    warning();
  }, [list, data, handleHive, search, warning]);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div id="app">
      <div className="all">
        <section className="section-left">
          <div className="image-area">
            <img className="placeholder-logo" src={Logo} alt="logo" />
          </div>
        </section>
        <section className="language">
          <Button
            changeLang={changeLanguage}
            customName="english"
            customTitle="English"
            customClass="btn-lang"
          >
            <span className="flag-contain">
              <img
                alt={"AmericaFlag"}
                src={AmericaFlag}
                width={16}
                height={11}
              />
            </span>
            <span>EN</span>
          </Button>
          <Button
            changeLang={changeLanguage}
            customName="hindi"
            customTitle="India"
            customClass="btn-lang"
          >
            <span className="flag-contain">
              <img alt="hindiflag" src={HindiFlag} width={16} height={11} />
            </span>
            <span>IND</span>
          </Button>
        </section>

        {loading && (
          <div className="loading">
            <div className="loader-spin"></div>
          </div>
        )}

        {!loading && (
          <Views data={hive}>
            <section className="section-right">
              <div className="search-box-container">
                <Search
                  keyup={moveCursor}
                  value={inputText}
                  customName="search"
                  placeHolderText={hive?.placeholder}
                  inputType="search"
                  inputed={handleInput}
                  search={search()}
                  isOpen={isOpen}
                  currentActive={currentActive.current}
                  addAndClose={addClose}
                />
              </div>
              <div className="cigg">
                {!detailsOn && (
                  <div className="warning">
                    <div>{warning()}</div>
                    <div className="help-cont">
                      <Help titleText="JUST TYPE YOUR CITY INTO THE SEARCH BOX" />
                    </div>
                  </div>
                )}

                {detailsOn && (
                  <div className="city-dit">
                    <CityDetailsCard
                      cityDetails={cityDetails}
                      closeAll={closeAll}
                    />
                  </div>
                )}
              </div>
              <div className="fotter-text">
                <div className="paragraph p6">
                  <span className="item-contain-param">{hive?.p6}</span>
                  <span className="help-cont">
                    <Help titleText="How you came about.. i.e.Methodology for calculation" />
                  </span>
                </div>
                <p className="paragraph p7">{hive?.p7}</p>
                <p className="paragraph p8">{hive?.p8}</p>
                <p className="paragraph p9">{hive?.p9}</p>
                <p className="paragraph p10">{hive?.p10}</p>
              </div>
            </section>
          </Views>
        )}

        <Footer
          fotterTitle={
            isEnglish()
              ? customJson.fotterTitle.english
              : customJson.fotterTitle.hindi
          }
          fotter1={
            isEnglish()
              ? customJson.fotterTextOne.english
              : customJson.fotterTextOne.hindi
          }
          fotter2={
            isEnglish()
              ? customJson.fotterTextTwo.english
              : customJson.fotterTextTwo.hindi
          }
          fotter3={
            isEnglish()
              ? customJson.fotterTextThree.english
              : customJson.fotterTextThree.hindi
          }
        />
      </div>
    </div>
  );
};

export default App;
