import React, { useEffect, useState } from 'react';
import List from '../List';
import './AddList.scss';
import Badge from '../Badge';
import closeSvg from '../../assets/img/close.svg';
import axios from 'axios';

const AddList = ({ colors, onAdd }) => {
	const [visiblePopup, setVisisiblePopup] = useState(false);
	const [selectedColor, selectColor] = useState(3);
	const [isLoading, setIsloading] = useState(false);
	const [inputValue, setInputValue] = useState('');

	useEffect(() => {
		if (Array.isArray(colors)) {
			selectColor(colors[0].id);
		}
	}, [colors]);

	const onCLose = () => {
		setVisisiblePopup(false);
		setInputValue('');
		selectColor(colors[0].id);
	};

	const addList = () => {
		if (!inputValue) {
			alert('Введите название списка');
			return;
		}
		setIsloading(true);
		axios
			.post('http://localhost:3001/lists', {
				name: inputValue,
				colorId: selectedColor,
			})
			.then(({ data }) => {
				const color = colors.filter(c => c.id === selectedColor)[0].name;
				const listObj = { ...data, color: { name: color } };
				onAdd(listObj);
				onCLose();
			})
			.catch(() => {
				alert('Ошибка при добавлении списка');
			})
			.finally(() => {
				setIsloading(false);
			});
	};

	return (
		<div className='add-list'>
			<List
				onClick={() => setVisisiblePopup(true)}
				items={[
					{
						className: 'list__add-button',
						icon: (
							<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<path d='M8 1V15' stroke='#B4B4B4' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
								<path d='M1 8H15' stroke='#B4B4B4' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
							</svg>
						),
						name: 'Добавить список',
					},
				]}
			/>
			{visiblePopup && (
				<div className='add-list__popup'>
					<img onClick={onCLose} src={closeSvg} className='add-list__popup-close-btn' alt='Close button' />

					<input value={inputValue} onChange={e => setInputValue(e.target.value)} type='text' placeholder='Название списка' className='field' />

					<div className='add-list__popup-colors'>
						{colors.map(color => (
							<Badge onCLick={() => selectColor(color.id)} key={color.id} color={color.name} className={selectedColor === color.id && 'active'} />
						))}
					</div>
					<button onClick={addList} className='button'>
						{isLoading ? 'Добавление...' : 'Добавить'}
					</button>
				</div>
			)}
		</div>
	);
};

export default AddList;
