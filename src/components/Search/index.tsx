import React from "react";
import "./index.css";

const Search = ({
  placeHolderText = "Search Your City",
  inputType = "search",
  customName,
  currentActive = 0,
  customClass = "",
  value = "",
  isOpen = true,
  search,
  keyup,
  inputed,
  addAndClose,
}: {
  placeHolderText: string;
  inputType: string;
  customName: string;
  currentActive: number;
  customClass?: string;
  value: string;
  isOpen: boolean;
  search: any;
  keyup: ({ type, name }: { type: string; name: string }) => void;
  inputed: ({
    newValue,
    nameOfInput,
  }: {
    newValue: string;
    nameOfInput: string;
  }) => void;
  addAndClose: (name: string) => void;
}) => {
  const handleKeyUp = (event: any) => {
    var char = event.which || event.keyCode;
    if (char === 38) {
      keyup({ type: "UP", name: customName });
    } else if (char === 40) {
      keyup({ type: "DOWN", name: customName });
    } else if (char === 13) {
      event.preventDefault();
      keyup({ type: "ENTER", name: customName });
    }
  };

  const handleSearchInput = (event: any) => {
    event.preventDefault();
    inputed({
      newValue: event.target.value,
      nameOfInput: customName,
    });
  };

  return (
    <section>
      <div className="search-bar">
        <input
          value={value}
          type={inputType}
          onChange={handleSearchInput}
          name={customName}
          className={`input-component ${customClass}`}
          placeholder={placeHolderText}
          onKeyDown={handleKeyUp}
          autoComplete="off"
        />
      </div>
      {isOpen && inputType === "search" && (
        <div className="suggestion">
          {search?.map((item: any, index: any) => {
            return (
              <div
                // ref={currentActive === index ? "active" : ""}
                className={currentActive === index ? "active" : "list-item"}
                key={index}
                onClick={() => addAndClose(item?.name)}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Search;
