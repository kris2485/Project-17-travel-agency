import { connect } from 'react-redux';
import TripListOptions from './TripListOptions';
import { getAllTags } from '../../../redux/tagsRedux';
import { getAllFilters, changeSearchPhrase, createActionAddTag, createActionRemoveTag, changeDurationFrom, changeDurationTo } from '../../../redux/filtersRedux';

const mapStateToProps = (state) => ({
  tags: getAllTags(state),
  filters: getAllFilters(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeSearchPhrase: (phrase) => dispatch(changeSearchPhrase(phrase)),
  // TODO - add more dispatchers for other filters
  createActionAddTag: (tag) => dispatch(createActionAddTag(tag)),
  createActionRemoveTag: (tag) => dispatch(createActionRemoveTag(tag)),
  changeDurationFrom: (from) => dispatch(changeDurationFrom(from)),
  changeDurationTo: (to) => dispatch(changeDurationTo(to)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TripListOptions);
