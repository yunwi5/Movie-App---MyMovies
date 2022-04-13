import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClickAwayListener } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/pro-solid-svg-icons';

import MainSearchbar from '../../UI/Search/MainSearchbar';
import { removeInvalidSearchCharacters } from '../../../utilities/string-util';

interface Props {
	onShowSearch: (show: boolean) => void;
	isSearching: boolean;
}

const SearchbarContainer: React.FC<Props> = ({ onShowSearch, isSearching }) => {
	const navigate = useNavigate();

	const searchHandler = (searchWord: string) => {
		const validSearchWord = removeInvalidSearchCharacters(searchWord);
		navigate(`/store-movies?search=${validSearchWord}`, { replace: false });
	};

	return (
		<div className='nav-search-container'>
			<div className='nav-search__small-screen'>
				{isSearching ? (
					<ClickAwayListener onClickAway={onShowSearch.bind(null, false)}>
						<div className='main-search-wrapper'>
							<MainSearchbar onSearch={searchHandler} />
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
				<MainSearchbar onSearch={searchHandler} />
			</div>
		</div>
	);
};

export default SearchbarContainer;
