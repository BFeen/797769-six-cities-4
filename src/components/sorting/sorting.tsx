import * as React from "react";
import {SortType} from "../../common/const";


interface Props {
  isOpened: boolean;
  currentSortType: string;
  onSelectSortType: (type: string) => void;
  onMenuClick: () => void;
}

type SortType = {
  [key: string]: string;
}

class Sorting extends React.PureComponent<Props, {}> {
  render() {
    const {
      isOpened,
      currentSortType,
      onSelectSortType,
      onMenuClick,
    } = this.props;
    const sortTypesList: SortType = Object.assign({}, SortType);
    const defaultSortType = Object.values(SortType).find((item) => item === currentSortType);
    const openedMenuClass = isOpened ? `places__options--opened` : ``;

    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span
          className="places__sorting-type"
          // tabIndex="0"
          onClick={onMenuClick}
        >
          {defaultSortType}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select" />
          </svg>
        </span>
        <ul className={`places__options places__options--custom ${openedMenuClass}`}>

          {Object.values(sortTypesList).map((type, index) => {
            const activeOptionClass = type === currentSortType ? `places__option--active` : ``;
            return (
              <li
                key={type + index}
                // tabIndex="0"
                className={`places__option ${activeOptionClass}`}
                onClick={() => {
                  onSelectSortType(type);
                }}
              >
                {type}
              </li>
            );
          })}
        </ul>
      </form>
    );
  }
}

export default Sorting;
