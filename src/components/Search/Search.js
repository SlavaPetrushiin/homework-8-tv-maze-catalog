// Реализуйте страницу поиска.

// Используйте метод connect и mapStateToProps, mapDispatchToProps,
// чтобы получить ссылку на поле search вашего стейта
// и экшн searchRequest.

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {searchRequest} from '../../actions/search';
import {getResult, getError, getIsFetching} from '../../reducers/search';
import classes from './Search.module.css';
import ShowPreview from '../ShowPreview';


class Search extends Component{
	state ={
		value: ""
	}

	handleClick = (event) => {
		const {searchRequest} = this.props;
		const {value} = this.state;
		event.preventDefault();
		searchRequest(value);
	}

	onChangeHandler = (event) => {
		this.setState({
			value: event.target.value
		})
	}

	render(){
		return(
			<div>
				<from className={classes.previewList} onClick={this.handleClick}>
					<input
						type="text"
						onChange={this.onChangeHandler}
						placeholder="Название сериала"
						name="search"
						className={classes.input}
					/>
					<div className={classes.buttonWrapper}>
						<button
							type="submit"
							className={classes.button}
						>
							Send
						</button>
					</div>
				</from>
        <div className={classes.searchPanel + ' t-search'}>
					{(!this.props.result)
						? null
						: (
							this.props.result.map(show => (
								<ShowPreview key={show.id} {...show} />
							))						
						)
					}
        </div>				
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	result: getResult(state),
	isFetching: getIsFetching(state),
	error: getError(state),
}); 

const mapDispatchToProps = {
	searchRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);



