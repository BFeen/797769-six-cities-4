import * as React from "react";
import PlaceCard from "../place-card/place-card";
import {IOffer} from "../../common/types";
import {ClassNames, ScreenType} from "../../common/const";


interface Props {
  offers: IOffer[];
  screenType: string;
  onCardMouseEnter: (offer: IOffer) => void;
  onCardMouseLeave: () => void;
  onItemClick: (offer: IOffer) => void;
  onBookmarkClick: (offerId: number, isFAvorite: boolean) => void;
}

const PlaceCardList: React.FunctionComponent<Props> = (props: Props) => {
  const {
    offers,
    screenType,
    onCardMouseEnter,
    onCardMouseLeave,
    onItemClick,
    onBookmarkClick,
  } = props;

  const listClassName = ClassNames.PlacesListClassNames[screenType];
  const cardClassName = ClassNames.CardClassNames[screenType];
  const isFavoriteScreen = screenType === ScreenType.FAVORITES;


  return (
    <div className={`places__list ${listClassName}`}>
      {offers.map((offer, index) => {
        return (
          <PlaceCard
            key={`${offer.id}${index}`}
            offer={offer}
            className={cardClassName}
            isFavoriteScreen={isFavoriteScreen}
            onItemClick={onItemClick}
            onCardMouseEnter={onCardMouseEnter}
            onCardMouseLeave={onCardMouseLeave}
            onBookmarkClick={onBookmarkClick}
          />
        );
      })}
    </div>
  );
};

export default PlaceCardList;
