import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/pro-solid-svg-icons';
import MainSearchbar from '../../UI/Search/MainSearchbar';
import { ClickAwayListener } from '@mui/material';

interface Props {
	onSearch: (s: string) => void;
	onShowSearch: (show: boolean) => void;
	isSearching: boolean;
}

const SearchbarContainer: React.FC<Props> = ({ onSearch, onShowSearch, isSearching }) => {
	return (
		<div className='nav-search-container'>
			<div className='nav-search__small-screen'>
				{isSearching ? (
					<ClickAwayListener onClickAway={onShowSearch.bind(null, false)}>
						<div className='main-search-wrapper'>
							<MainSearchbar onSearch={onSearch} />
						</div>
					</ClickAwayListener>
				) : (
					<FontAwesomeIcon
						icon={faSearch}
						className='search-icon'
						onClick={onShowSearch.bind(null, !isSearching)}
					/>
				)}
			</div>
			<div className='nav-search__large-screen'>
				<MainSearchbar onSearch={onSearch} />
			</div>
		</div>
	);
};

export default SearchbarContainer;
