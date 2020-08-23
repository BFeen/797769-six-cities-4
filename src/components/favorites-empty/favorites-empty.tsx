import * as React from "react";


const FavoritesEmpty: React.FunctionComponent = () => {
  return (
    <section className="favorites favorites--empty">
      <h1 className="visually-hidden">Favorites (empty)</h1>
      <div className="favorites__status-wrapper">
        <b className="favorites__status">Nothing yet saved.</b>
        <p className="favorites__status-description">Save properties to narrow down search or plan yor future trips.</p>
      </div>
    </section>
  );
};

export default FavoritesEmpty;
