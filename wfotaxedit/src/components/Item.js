
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
        this.setParentWfoId(data.parent_wfo_id);
        this.hasChanged();

        // load the basionym
        this.basionymWfoId = data.basionym_wfo_id;
        this.basionymData = data.basionym;


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

  setParentWfoId = (newParentWfoId) => {

    // efficiency check as this might cause another http call
    if (this.parentWfoId === newParentWfoId) return;

    this.parentWfoId = newParentWfoId;

    // parent should be in the ancestors list.
    this.data.ancestors.map((ancestor) => {
      if (ancestor.wfo_id === newParentWfoId) {
        this.parentData = ancestor;
        this.hasChanged();
        return ancestor;
      }
      return null;
    });

    // could try and do a call to load it here
    // if we haven't got it but I can't think
    // of a situation where we wouldn't.

    this.hasChanged();

  }

  getParentWfoId = () => {
    return this.parentWfoId ? this.parentWfoId : "";
  }

  setParentData = (newParentData) => {
    this.parentData = newParentData;
    this.parentWfoId = newParentData.wfo_id;
    this.hasChanged();
  }

  getParentData = () => {
    return this.parentData ? this.parentData : "";
  }

  getBasionymData = () => {
    return this.basionymData ? this.basionymData : "";
  }

  setBasionymData = (basionymData) => {
    this.basionymData = basionymData;
    this.basionymWfoId = basionymData.wfo_id;
    this.hasChanged();
  }

  getStatus = () => {
    return this.status ? this.status : "";
  }

  setStatus = (newStatus) => {
    this.status = newStatus;
    this.hasChanged();
  }

  getComment() {
    return this.comment ? this.comment : "";
  }

  setComment = (newComment) => {
    this.comment = newComment;
    this.hasChanged();
  }

}
export default Item;