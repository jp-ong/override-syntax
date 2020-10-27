import React, { Component } from "react";
import Container from "../Container";
import Spinner from "../Spinner";
import StoreSearch from "./StoreSearch";
import StoreCategories from "./StoreCategories";
import StoreTags from "./StoreTags";
import StoreSort from "./StoreSort";
import StoreList from "./list/StoreList";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { authUser } from "../../redux/actions/userActions";
import { fetchStatics } from "../../redux/actions/staticsActions";
import { fetchItems } from "../../redux/actions/itemActions";

export class Store extends Component {
  static propTypes = {
    statics: PropTypes.object.isRequired,
    authUser: PropTypes.func.isRequired,
    fetchItems: PropTypes.func.isRequired,
    fetchStatics: PropTypes.func.isRequired,
  };

  state = {
    keyword: "",
    active_category: "",
    active_tags: [],
    active_sort: "",
    filters_open: true,
  };

  componentDidMount() {
    this.props.authUser();
    this.props.fetchStatics();
    this.props.fetchItems();
    this.setState({ active_category: this.props.match.params.category });
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.setState({ active_category: this.props.match.params.category });
    }
  }

  tickSearch = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  tickTags = (newTag) => {
    const { active_tags } = this.state;
    if (active_tags.includes(newTag)) {
      this.setState({
        active_tags: active_tags.filter((tag) => tag !== newTag),
      });
    } else {
      this.setState({ active_tags: [newTag, ...active_tags] });
    }
  };

  toggleSort = (sortBy) => {
    this.setState({ active_sort: sortBy });
  };

  toggleFilters = () => {
    this.setState({ filters_open: !this.state.filters_open });
  };

  render() {
    const {
      keyword,
      active_category,
      active_tags,
      active_sort,
      filters_open,
    } = this.state;
    const { categories, tags } = this.props.statics;
    const { items, items_loading } = this.props.item;
    return (
      <Container>
        <div className="store">
          <div className="store-control">
            <StoreSearch tickSearch={this.tickSearch} keyword={keyword} />
            <StoreSort toggleSort={this.toggleSort} />
          </div>
          <div className="store-filter">
            <div className="store-filter-button" onClick={this.toggleFilters}>
              <span>Filters</span>
              <i className="fas fa-filter" />
            </div>
            {filters_open ? (
              <>
                <StoreCategories
                  categories={categories}
                  active_category={active_category}
                />
                <StoreTags
                  tags={tags[active_category]}
                  active_tags={active_tags}
                  tickTags={this.tickTags}
                />
              </>
            ) : (
              <></>
            )}
          </div>
          {items_loading ? (
            <div className="store-spinner">
              <Spinner />
            </div>
          ) : (
            <StoreList
              items={items}
              active_category={active_category}
              active_tags={active_tags}
              active_sort={active_sort}
              keyword={keyword}
            />
          )}
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  statics: state.statics,
  item: state.item,
});

const mapDispatchToProps = {
  fetchStatics,
  fetchItems,
  authUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Store);
