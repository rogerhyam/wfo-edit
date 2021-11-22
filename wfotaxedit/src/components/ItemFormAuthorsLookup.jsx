
import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";

class ItemFormAuthorsLookup extends Component {

    constructor(props) {
        super(props);
        this.state = { authorsText: null, authorsData: null };
    }

    renderAuthorsTeam = () => {

        const authorsText = this.props.authorsText;

        // 2 seconds after it has rendered and settled down we look to see if it is out of date

        setTimeout(() => {

            if (this.state.authorsText !== this.props.authorsText) {
                console.log(this.state.authorsText);
                console.log(this.props.authorsText);
                this.setState({ authorsText: authorsText });
                fetch('fetch_authors.php?authors_text=' + encodeURIComponent(authorsText))
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        this.setState({
                            authorsData: data
                        })
                    });
            }


        }, 500);



        if (!this.state.authorsData || this.state.authorsData.length === 0) {
            return <ListGroup.Item>No author abbreviations detected.</ListGroup.Item>;
        } else {
            return (
                <>
                    <ListGroup.Item key="names"><strong>Names Detected:</strong> <span dangerouslySetInnerHTML={{ __html: this.state.authorsData.htmlAuthors }} ></span></ListGroup.Item>
                    {this.renderAuthorList()}
                </>
            )
            //return (<ListGroup.Item >{this.state.authorsData.htmlAuthors}</ListGroup.Item>)

        }

    }

    renderAuthorList = () => {

        if (!this.state.authorsData.authors) return "";


        const list = [];

        for (const authorName in this.state.authorsData.authors) {
            const author = this.state.authorsData.authors[authorName];
            if (!author || !author.label) continue;
            list.push(
                <ListGroup.Item key={authorName}>
                    <strong>{authorName} :</strong>
                    {" "}
                    <a href={author.person} target="wikidata" >
                        {author.label}
                    </a>
                    {" "}
                    {this.renderAuthorDates(author)}
                    {" "}
                    {this.renderAuthorImage(author)}
                </ListGroup.Item>
            )
        }

        return list;

    }

    renderAuthorDates = (author) => {

        if (!author.birth && !author.death) return "";

        let dates = "";

        if (author.birth) dates += author.birth.substr(0, 4);
        dates += "-";
        if (author.death) dates += author.death.substr(0, 4);

        return dates;

    }

    renderAuthorImage = (author) => {
        if (!author.image) return "";

        return <a href={author.image}><img
            src={author.image}
            alt={author.label}
            style={{ height: "80px", float: "right" }} /></a>
    }


    render() {

        if (!this.props.authorsText) return "";

        return (
            <ListGroup>
                {this.renderAuthorsTeam()}
            </ListGroup>
        );
    }

}
export default ItemFormAuthorsLookup