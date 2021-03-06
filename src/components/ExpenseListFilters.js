import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, setSortbyDate, setSortbyAmount, setStartDate, setEndDate } from '../actions/filters';

export class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null
    };

    onDatesChange = ({ startDate, endDate}) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    }

    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }));
    }

    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
    }

    onSortChange = (e) => {
        e.target.value === 'date' ? this.props.setSortbyDate() : this.props.setSortbyAmount();
    }

    render() {
        return (
            <div className="content-container">
                <div className="filters">
                    <div className="filter-item">
                        <input className="input" type='text' value={this.props.filters.text} onChange={this.onTextChange} placeholder="Search for expense" />
                    </div>
                    <div className="filter-item">
                        <select className="input select" value={this.props.filters.sortBy} onChange= {this.onSortChange}>
                            <option value='date'>Date</option>
                            <option value='amount'>Amount</option>
                        </select>
                    </div>
                    <div className="filter-item">
                        <DateRangePicker
                            startDate={this.props.filters.startDate}
                            endDate={this.props.filters.endDate}
                            onDatesChange={this.onDatesChange}
                            focusedInput={this.state.calendarFocused}
                            onFocusChange={this.onFocusChange}
                            numberOfMonths={1}
                            isOutsideRange={() => false}
                            showClearDates={true}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTextFilter: (text) => dispatch(setTextFilter(text)),
        setSortbyDate: () => dispatch(setSortbyDate()),
        setSortbyAmount: () => dispatch(setSortbyAmount()),
        setStartDate: (startDate) => dispatch(setStartDate(startDate)),
        setEndDate: (endDate) => dispatch(setEndDate(endDate))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);