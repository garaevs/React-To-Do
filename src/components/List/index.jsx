import React from 'react';
import axios from 'axios';

import classNames from 'classnames';
import './List.scss';
import Badge from '../Badge';
import removeSvg from '../../assets/img/remove.svg';

const List = ({ items, isRemovable, onClick, onRemove, onCLickItem, activeItem }) => {
	const removeList = item => {
		if (window.confirm('Вы действительно хотите удалить список?')) {
			axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
				onRemove(item.id);
			});
		}
	};

	return (
		<ul className='list' onClick={onClick}>
			{items.map((item, index) => (
				<li
					key={index}
					className={classNames(item.className, { active: item.active ? item.active : activeItem && activeItem.id === item.id })}
					onClick={onCLickItem ? () => onCLickItem(item) : null}
				>
					<i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
					<span>
						{item.name} {item.tasks && ` (${item.tasks.length})`}
					</span>
					{isRemovable && <img className='list__remove-icon' src={removeSvg} alt='Remove icon' onClick={() => removeList(item)} />}
				</li>
			))}
		</ul>
	);
};

export default List;
