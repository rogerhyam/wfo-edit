
/*

    Item is where we enforce some validity rules
    load data and stuff

*/

class Item {

  constructor(itemId, itemHasChanged) {
    this.counter = 0;

    if (!itemId) itemId = "wfo-0000400271";// "wfo-4000033027";

    fetch('fetch_item.php?wfo_id=' + itemId)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.data = data;
        this.id = data.id;
        this.name = data.name;
        this.wfoId = data.wfo_id;
        this.ancestors = data.ancestors;
        this.children = data.children;
        this.synonyms = data.synonyms;
        this.hasChanged();
      }

      );

    // all important wfo-id
    this.id = itemId;

    // this function is on the top component
    // and will trigger a UI refresh
    this.hasChanged = itemHasChanged;


  }

  fancyCounter() {
    return "%" + this.counter + "%";
  }
}
export default Item;