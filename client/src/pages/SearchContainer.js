import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import { InvTblHdr} from "../components/InvTbl";
import API from "../utils/API";
import CatSearchForm from "../components/CatSearchForm";
import {CartList, CartItem, QtyInput, CheckoutBtn} from "../components/Cart";
class SearchContainer extends Component {
  constructor(){
    super();
    this.isCatBtnClicked = false;
    this.products = [];
    this.orders = [];
  }
  state = {
    products: [],
    order: [],
    product: {},
    category: ""
  };

  /*****************************/
  // clearTableDiv= (elementId) =>{
  //   document.getElementById(elementId).innerHTML = '';
  // }

  handleCatSearch = event =>{
    this.isCatBtnClicked = true;
    var ddlCatElem = document.getElementById("ddlCatList");
    var category = ddlCatElem.options[ddlCatElem.selectedIndex].text;
    // console.log("Category to Search = "+category);
    this.setState({category: category});
    if (category){
      event.preventDefault();
      const baseURL = "/products";
      const parameter = '/'+category;
      //Search for all books in Google Books API
      this.loadByCategory(baseURL, parameter, this.callback);
    }//if
  };

  //Initialize the state variables with search results
  loadByCategory = (baseURL, parameter, cb) => {
    API.getCategory(baseURL, parameter)
      .then(res => {
        // console.log("API CALL HAS STARTED!");
        //callback to store state variables
        cb(res);//01122019:SaveAndDisplay the Data:
      })
      .catch(err => console.log(err));
  };

  callback = (res) => {
    // console.log();
    // console.log("API CALL HAS ENDED!");
    // console.log();
    // console.log("Res = "+JSON.stringify(res));
    if(res){
      //this.clearTableDiv('table-contents');
      this.products = res.data;
      this.setState({ products: res.data.items});
    }
  }

  createOrderArr = (event, orders) => {
    event.preventDefault();
    let productIdClicked = event.target.getAttribute('data-productid')
    let productNameClicked = document.getElementById('name-'+productIdClicked).innerText;
    let cartRecord =
    {
      id: productIdClicked,
      name: productNameClicked
    };
    {this.orders.push(cartRecord)};
    console.log("CLICK ID = "+ productIdClicked+" CLICKED NAME = "+productNameClicked);
    console.log(JSON.stringify(cartRecord));
    console.log()
  }
  /*****************************/

  // callback = () => {
  //   console.log();
  //   console.log("API CALL HAS ENDED!");
  //   console.log();
  //   console.log("Call back Res = "+JSON.stringify(this.state.products));
  //   //this.setState({ products: res.data.items});
  // }

  viewProps = (cb) => {
    // console.log("Data = " + JSON.stringify(this.props.location.state));
    this.setState({products: this.props.location.state});
    cb();
  }

  componentDidMount() {
    // this.loadBooks();
    this.viewProps(this.callback);
  }

  render() {
    return (
      <React.Fragment>
        <Container fluid>
          <h1>I AM THE SEARCH PAGE</h1>
          <br/>
        <h5>Search by Category</h5>
        <CatSearchForm catSearchEvent={this.handleCatSearch}/>
          <Row>
            <Col size="md-7">
              {!this.isCatBtnClicked && this.props.location.state.products.length ? (
                <InvTblHdr products = {this.props.location.state.products} createOrderArr = {this.createOrderArr}></InvTblHdr>
              ) : (
                !this.isCatBtnClicked && <h3>No Results to Display</h3>
              )}
              {/* {this.products && "Products= " +this.products.length} */}
                {this.isCatBtnClicked && this.products && this.products.length ? (
                <InvTblHdr products = {this.products} createOrderArr = {this.createOrderArr}></InvTblHdr>
              ) : (
                this.isCatBtnClicked && <h3>No Results to Display</h3>
              )}
            </Col>
            <Col size="md-4">
             <CartList>
              <h5>Invalid user id or password</h5>
             </CartList>
             <CheckoutBtn></CheckoutBtn>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default SearchContainer;
