
/*

    Item is where we enforce some validity rules
    load data and stuff

*/

class Item {

  constructor(itemId, itemHasChanged) {
    this.counter = 0;

    if (!itemId) itemId = "wfo-0001229501"; //"wfo-0001229499"; //wfo-0000400034"; //wfo-0000400271";// "wfo-4000033027";

    fetch('fetch_item.php?wfo_id=' + itemId)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.data = data;
        this.id = data.id;

        this.wfoId = data.wfo_id;
        this.ancestors = data.ancestors;
        this.children = data.children;
        this.synonyms = data.synonyms;

        // initialize the mutable fields
        this.rank = data.rank;
        this.name = data.name;
        this.genus = data.genus;
        this.specificEpithet = data.species;
        this.authorsText = data.author_text;
        this.protologueText = data.protologue_text;
        this.status = data.status;

        this.hasChanged();
      }

      );

    // all important wfo-id
    this.id = itemId;

    // this function is on the top component
    // and will trigger a UI refresh
    this.hasChanged = itemHasChanged;


  }

  getRank = () => {
    return this.rank ? this.rank : "";
  }

  setRank = (newRank) => {
    this.rank = newRank;
    this.hasChanged();
  }

  getName = () => {
    return this.name ? this.name : "";
  }

  setName = (newName) => {
    this.name = newName;
    this.hasChanged();
  }


  getGenus = () => {
    return this.genus ? this.genus : "";
  }

  setGenus = (newGenus) => {
    this.genus = newGenus;
    this.hasChanged();
  }

  getSpecificEpithet = () => {
    return this.specificEpithet ? this.specificEpithet : "";
  }

  setSpecificEpithet = (newEpi) => {
    this.specificEpithet = newEpi;
    this.hasChanged();
  }

  getAuthorsText = () => {
    return this.authorsText ? this.authorsText : "";
  }

  setAuthorsText = (newAuthorsText) => {
    this.authorsText = newAuthorsText;
    this.hasChanged();
  }

  getProtologueText = () => {
    return this.protologueText ? this.protologueText : "";
  }

  setProtologueText = (newProtologue) => {
    this.protologueText = newProtologue;
    this.hasChanged();
  }

  getStatus = () => {

    if (!this.data) return "";

    if (this.status === "checked") {
      if (this.data.accepted_wfo_id) {
        return "synonym";
      } else {
        return "accepted";
      }
    } else {
      return this.status;
    }

  }

  setStatus = (newStatus) => {

    if (newStatus === "synonym" || newStatus === "accepted") {
      this.status = "checked";
    } else {
      this.status = newStatus;
    }
    this.hasChanged();

  }

}
export default Item;