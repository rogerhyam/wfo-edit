
/*

    Item is where we enforce some validity rules
    load data and stuff

*/

class Item {

  ranks = {
    'order': 'Order',
    'family': 'Family',
    'section': 'Section',
    'phylum': 'Phylum',
    'genus': 'Genus',
    'subgenus': 'Subgenus',
    'species': 'Species',
    'subspecies': 'Subspecies',
    'variety': 'Variety',
    'form': 'Form'
  }

  constructor(itemId, itemHasChanged) {

    if (!itemId) itemId = "wfo-0000523196"; //wfo-0000523703"; //wfo-0001229501"; //"wfo-0001229499"; //wfo-0000400034"; //wfo-0000400271";// "wfo-4000033027";

    this.loading = true;
    this.saving = false;

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
        this.comment = data.comments;
        this.setParentWfoId(data.parent_wfo_id);

        // load the basionym
        this.basionymWfoId = data.basionym_wfo_id;
        this.basionymData = data.basionym;
        this.ipniNameId = data.ipni_name_id;

        this.canEdit = data.can_edit;


        this.loading = false;

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

  getBasionymWfoId = () => {
    return this.basionymWfoId ? this.basionymWfoId : "";
  }

  getStatus = () => {
    return this.status ? this.status : "";
  }

  setStatus = (newStatus) => {
    this.status = newStatus;
    this.hasChanged();
  }

  getComment = () => {
    return this.comment ? this.comment : "";
  }

  setComment = (newComment) => {
    this.comment = newComment;
    this.hasChanged();
  }

  getIpniNameId = () => {
    return this.ipniNameId ? this.ipniNameId : "";
  }

  isEditable = () => {
    return this.canEdit;
  }

  save = () => {

    this.saving = true;
    this.hasChanged();

    // Assumed validation is done at the component level

    // there is nothing for it but to work through the fields and 
    // build a valid savable object

    const sub = {};

    //  `id` - just past through or null for new item
    sub.id = this.data ? this.data.id : null;

    // `wfo_id` - just past through - what happens for new ones? Who mints these
    sub.wfo_id = this.data ? this.data.wfo_id : null;

    // `rank` enum('order', 'family', 'section', 'phylum', 'subgenus', 'genus', 'species', 'subspecies', 'variety', 'form') DEFAULT NULL,
    sub.rank = this.getRank();

    // `name` varchar(45) NOT NULL,
    sub.name = this.getName();

    // `genus` varchar(45) DEFAULT NULL,
    sub.genus = this.getGenus();

    // `species` varchar(45) DEFAULT NULL,
    sub.species = this.getSpecificEpithet();

    // `author_text` varchar(200) DEFAULT NULL,
    sub.author_text = this.getAuthorsText();

    // `protologue_text` varchar(200) DEFAULT NULL,
    sub.protologue_text = this.getProtologueText();

    // `basionym_wfo_id` varchar(45) DEFAULT NULL,
    sub.basionym_wfo_id = this.getBasionymWfoId();

    // `parent_wfo_id` varchar(16) DEFAULT NULL,
    sub.parent_wfo_id = this.getParentWfoId();

    // `status` enum('checked', 'unchecked', 'synonym', 'accepted', 'ambiguous') DEFAULT NULL,
    sub.status = this.getStatus();

    // `comments` varchar(45) DEFAULT NULL,
    sub.comments = this.getComment();

    // `ipni_name_id` varchar(45) DEFAULT NULL,
    // FIXME - not there yet - is this derived on import of name

    // convert "" to nulls
    // React likes "" but db likes nulls
    for (const property in sub) {
      if (sub[property] === "") sub[property] = null;
    }

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(sub),
      headers: {
        Accept: "application/json"
      }
    };

    fetch("save_item.php", requestOptions)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.saving = false;
        this.hasChanged();
      });

  }

}
export default Item;