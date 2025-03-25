import "./search.scss";

export default function Search() {
  return (
    <form className="menu__search-form">
      <label className="menu__form-field">
        <input
          type="search"
          className="menu__input"
          name="search"
          placeholder=" "
        ></input>
        <button className="menu__btn"></button>
      </label>
    </form>
  );
}
